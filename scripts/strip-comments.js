#!/usr/bin/env node
/**
 * Removes all comments (//, /* *\/, JSDoc, {/* JSX *\/}) from source files.
 *
 * Unlike an AST-print approach, this only splices out the exact text
 * ranges of real comments (found via the TypeScript parser, so strings /
 * templates / regex literals / JSX text are never mistaken for a comment)
 * and leaves all other original formatting untouched. A whitespace cleanup
 * pass then trims what the removal left behind.
 */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "..");

const TARGET_DIRS = ["src"];
const TARGET_ROOT_FILES = [
  "next.config.ts",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "tailwind.config.ts",
  "tailwind.config.js",
];

const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".git", "public", "scripts"]);

const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const CSS_EXTS = new Set([".css"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function collectTargetFiles() {
  const files = [];
  for (const dir of TARGET_DIRS) {
    const abs = path.join(ROOT, dir);
    if (fs.existsSync(abs)) walk(abs, files);
  }
  for (const f of TARGET_ROOT_FILES) {
    const abs = path.join(ROOT, f);
    if (fs.existsSync(abs)) files.push(abs);
  }
  return files;
}

function scriptKindFor(ext) {
  switch (ext) {
    case ".tsx":
      return ts.ScriptKind.TSX;
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".ts":
      return ts.ScriptKind.TS;
    default:
      return ts.ScriptKind.JS;
  }
}

// Collects exact [pos, end) text ranges to delete: real comments (via
// getLeadingCommentRanges on every leaf token's trivia gap) plus whole
// {/* comment-only */} JSX expression containers.
function collectRemovalRanges(sourceFile) {
  const fullText = sourceFile.getFullText();
  const ranges = [];
  const seen = new Set();

  function addRange(pos, end) {
    const key = pos + ":" + end;
    if (!seen.has(key)) {
      seen.add(key);
      ranges.push({ pos, end });
    }
  }

  function recordLeadingComments(pos) {
    const comments = ts.getLeadingCommentRanges(fullText, pos);
    if (comments) {
      for (const c of comments) addRange(c.pos, c.end);
    }
  }

  function walk(node) {
    if (node.kind === ts.SyntaxKind.JsxExpression && node.expression === undefined) {
      addRange(node.getStart(sourceFile), node.getEnd());
      return;
    }
    const children = node.getChildren(sourceFile);
    if (children.length === 0) {
      // JsxText's own content starts exactly at .pos (no trivia gap), so
      // scanning "leading trivia" there would risk treating literal text
      // like "// not a comment" as a real comment. Real JSX comments are
      // never part of JsxText (they live in an empty JsxExpression sibling
      // instead), so it's safe - and necessary - to skip JsxText here.
      if (node.kind !== ts.SyntaxKind.JsxText) {
        recordLeadingComments(node.pos);
      }
    } else {
      for (const child of children) walk(child);
    }
  }

  walk(sourceFile);

  // If a comment (or a comment-only {/* */} JSX expression) is the only
  // thing on its line, remove the whole line - including its newline -
  // instead of leaving a blank line behind.
  const extended = ranges.map(({ pos, end }) => {
    let lineStart = pos;
    while (lineStart > 0 && fullText[lineStart - 1] !== "\n") lineStart--;
    if (!/^[ \t]*$/.test(fullText.slice(lineStart, pos))) return { pos, end };

    let lineEnd = end;
    while (lineEnd < fullText.length && fullText[lineEnd] !== "\n") lineEnd++;
    if (!/^[ \t]*$/.test(fullText.slice(end, lineEnd))) return { pos, end };

    if (lineEnd < fullText.length && fullText[lineEnd] === "\n") lineEnd++;
    return { pos: lineStart, end: lineEnd };
  });

  extended.sort((a, b) => a.pos - b.pos);
  return extended;
}

function applyRemovals(text, ranges) {
  let result = "";
  let last = 0;
  for (const r of ranges) {
    if (r.pos < last) continue;
    result += text.slice(last, r.pos);
    last = r.end;
  }
  result += text.slice(last);
  return result;
}

function stripCodeComments(sourceText, ext, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    scriptKindFor(ext)
  );
  const ranges = collectRemovalRanges(sourceFile);
  return applyRemovals(sourceText, ranges);
}

// State-machine based: only strips /* */ comments outside of strings.
function stripCssComments(sourceText) {
  let out = "";
  let i = 0;
  const len = sourceText.length;
  let quote = null;

  while (i < len) {
    const c = sourceText[i];
    const c2 = sourceText[i + 1];

    if (quote) {
      out += c;
      if (c === "\\" && i + 1 < len) {
        out += c2;
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i++;
      continue;
    }

    if (c === '"' || c === "'") {
      quote = c;
      out += c;
      i++;
      continue;
    }

    if (c === "/" && c2 === "*") {
      const end = sourceText.indexOf("*/", i + 2);
      i = end === -1 ? len : end + 2;
      continue;
    }

    out += c;
    i++;
  }

  return out;
}

// Trims trailing whitespace per line (leftover after inline comments were
// cut out) and normalizes the file to end with exactly one newline.
function cleanupWhitespace(text) {
  const lines = text.split("\n").map((line) => line.replace(/[ \t]+$/g, ""));
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines.join("\n") + "\n";
}

function main() {
  const files = collectTargetFiles();
  let changed = 0;

  for (const file of files) {
    const ext = path.extname(file);
    const original = fs.readFileSync(file, "utf8");
    let stripped;

    if (CODE_EXTS.has(ext)) {
      stripped = stripCodeComments(original, ext, file);
    } else if (CSS_EXTS.has(ext)) {
      stripped = stripCssComments(original);
    } else {
      continue;
    }

    const cleaned = cleanupWhitespace(stripped);

    if (cleaned !== original) {
      fs.writeFileSync(file, cleaned, "utf8");
      changed++;
      console.log("updated:", path.relative(ROOT, file));
    }
  }

  console.log(`\nDone. ${changed}/${files.length} scanned file(s) changed.`);
}

main();
