import { PHONE } from '@/lib/motion';
import { buildGeometry, hexToLinear, modelView, perspective } from './math';
import { fragmentShader, vertexShader } from './shaders';

export interface FieldState {
    color: string;
    accent: string;
    glow: boolean;
    active: boolean;
    reduceMotion: boolean;
}

interface FieldInputs {
    density: number;
    /** Scroll progress of the hero pin, 0 to 1. */
    progress: () => number;
    /** Entrance and scroll zoom; the field eases `intro` up to 1 itself. */
    zoom: { intro: number; scroll: number };
}

const UNIFORMS = ['uProjection', 'uModelView', 'uTime', 'uProgress', 'uMouse', 'uPixelRatio', 'uSize', 'uColor', 'uAccent', 'uOpacity'] as const;
type Uniform = (typeof UNIFORMS)[number];

/** Runs `fn` when the main thread is idle (timeout fallback for Safari); returns a cancel function. */
function whenIdle(fn: () => void, timeout = 2000) {
    if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(fn, { timeout });
        return () => cancelIdleCallback(id);
    }
    const id = setTimeout(fn, 600);
    return () => clearTimeout(id);
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    gl.deleteShader(shader);
    return null;
}

/** Raw WebGL point field: built on idle, renders only while active and visible, ~30fps at DPR 1 on phones. */
export function createParticleField(canvas: HTMLCanvasElement, initial: FieldState, inputs: FieldInputs) {
    const host = canvas.parentElement;
    if (!host) return null;

    const isPhone = window.matchMedia(PHONE).matches;
    const minFrameMs = isPhone ? 30 : 0;
    const proj = new Float32Array(16);
    const view = new Float32Array(16);
    const mouse = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    let state = initial;
    let color = hexToLinear(state.color);
    let accent = hexToLinear(state.accent);
    let gl: WebGLRenderingContext | null = null;
    let loc = {} as Record<Uniform, WebGLUniformLocation | null>;
    let count = 0;
    let frame = 0;
    let last = 0;
    let time = 0;
    let angle = 0;
    let progress = 0;
    let disposed = false;
    let fit = 1;

    const draw = (dt: number) => {
        if (!gl) return;
        const k = 1 - Math.exp(-dt * 6);
        if (!state.reduceMotion) {
            time += dt;
            angle += dt * 0.06;
            mouse.x += (pointer.x - mouse.x) * k * 0.6;
            mouse.y += (pointer.y - mouse.y) * k * 0.6;
        }
        progress = dt ? progress + (inputs.progress() - progress) * k : inputs.progress();

        const { zoom } = inputs;
        if (zoom.intro < 1) zoom.intro = state.reduceMotion ? 1 : Math.min(1, zoom.intro + (1 - zoom.intro) * (1 - Math.exp(-dt * 1.8)) + 0.0005);
        modelView(view, angle, zoom.intro * zoom.scroll * fit);

        // Additive glow reads well on dark; on a light page it would wash points out to white.
        if (state.glow) gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        else gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        gl.uniformMatrix4fv(loc.uModelView, false, view);
        gl.uniform1f(loc.uTime, time);
        gl.uniform1f(loc.uProgress, progress);
        gl.uniform2f(loc.uMouse, mouse.x, mouse.y);
        gl.uniform1f(loc.uOpacity, (state.glow ? 0.8 : 1) * (fit < 1 ? 0.5 : 1));
        gl.uniform3fv(loc.uColor, color);
        gl.uniform3fv(loc.uAccent, accent);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, count);
    };

    const resize = () => {
        if (!gl) return;
        const dpr = isPhone ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
        const { clientWidth: w, clientHeight: h } = host;
        const width = Math.max(1, Math.round(w * dpr));
        const height = Math.max(1, Math.round(h * dpr));
        // Assigning the drawing-buffer size clears it, so only do it on a real change.
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        fit = Math.min(1, Math.max(0.5, w / Math.max(h, 1) / 0.95));
        perspective(proj, 45, w / Math.max(h, 1), 0.1, 100);
        gl.uniformMatrix4fv(loc.uProjection, false, proj);
        gl.uniform1f(loc.uPixelRatio, dpr);
        gl.uniform1f(loc.uSize, fit < 1 ? 22 : 30);
        draw(0);
    };

    const setup = () => {
        const ctx = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
        if (!ctx) return false;
        const vs = compile(ctx, ctx.VERTEX_SHADER, vertexShader);
        const fs = compile(ctx, ctx.FRAGMENT_SHADER, fragmentShader);
        const program = ctx.createProgram();
        if (!vs || !fs || !program) return false;
        ctx.attachShader(program, vs);
        ctx.attachShader(program, fs);
        ctx.linkProgram(program);
        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) return false;
        ctx.useProgram(program);

        count = Math.round((window.innerWidth < 768 ? 2600 : 6500) * inputs.density);
        const geometry = buildGeometry(count);
        const attributes = [
            ['position', geometry.sphere, 3],
            ['aWave', geometry.wave, 3],
            ['aRand', geometry.rand, 1],
            ['aAccent', geometry.accent, 1],
        ] as const;
        for (const [name, data, size] of attributes) {
            const index = ctx.getAttribLocation(program, name);
            if (index < 0) continue;
            ctx.bindBuffer(ctx.ARRAY_BUFFER, ctx.createBuffer());
            ctx.bufferData(ctx.ARRAY_BUFFER, data, ctx.STATIC_DRAW);
            ctx.enableVertexAttribArray(index);
            ctx.vertexAttribPointer(index, size, ctx.FLOAT, false, 0, 0);
        }
        loc = Object.fromEntries(UNIFORMS.map((name) => [name, ctx.getUniformLocation(program, name)])) as typeof loc;
        ctx.uniform1f(loc.uSize, 30);
        ctx.disable(ctx.DEPTH_TEST);
        ctx.enable(ctx.BLEND);
        ctx.clearColor(0, 0, 0, 0);
        gl = ctx;
        resize();
        return true;
    };

    const loop = (now: number) => {
        frame = 0;
        if (last && now - last < minFrameMs) return schedule();
        const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 0;
        last = now;
        draw(dt);
        schedule();
    };

    function schedule() {
        if (disposed || !gl || frame) return;
        if (state.active && !state.reduceMotion && !document.hidden) frame = requestAnimationFrame(loop);
        else last = 0;
    }

    const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(frame);
        frame = 0;
        gl = null;
    };
    const onRestored = () => {
        if (setup()) schedule();
    };

    const observer = new ResizeObserver(resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    const start = () => {
        if (disposed || !setup()) return;
        observer.observe(host);
        canvas.style.opacity = '1';
        schedule();
    };
    const cancelStart = whenIdle(start);

    return {
        update(next: FieldState) {
            if (next.color !== state.color) color = hexToLinear(next.color);
            if (next.accent !== state.accent) accent = hexToLinear(next.accent);
            state = next;
            draw(0);
            schedule();
        },
        dispose() {
            disposed = true;
            cancelStart();
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('pointermove', onPointer);
            document.removeEventListener('visibilitychange', schedule);
            canvas.removeEventListener('webglcontextlost', onLost);
            canvas.removeEventListener('webglcontextrestored', onRestored);
            gl?.getExtension('WEBGL_lose_context')?.loseContext();
        },
    };
}

export type ParticleField = NonNullable<ReturnType<typeof createParticleField>>;
