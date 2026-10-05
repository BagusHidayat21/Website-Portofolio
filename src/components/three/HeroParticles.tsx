'use client';

import { useEffect, useRef, type RefObject } from 'react';

// Raw WebGL (no three.js): one point cloud with a custom shader is all the hero needs.
const vertexShader = /* glsl */ `
    precision highp float;

    attribute vec3 position;
    attribute vec3 aWave;
    attribute float aRand;
    attribute float aAccent;

    uniform mat4 uProjection;
    uniform mat4 uModelView;
    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uMouse;
    uniform float uPixelRatio;
    uniform float uSize;

    varying float vAccent;
    varying float vAlpha;

    void main() {
        // Breathing noise sphere.
        vec3 s = position;
        float n = sin(s.x * 1.7 + uTime * 0.6 + aRand * 6.2831) * 0.12
                + sin(s.y * 2.3 - uTime * 0.45) * 0.1
                + cos(s.z * 1.9 + uTime * 0.3) * 0.08;
        s += normalize(s) * n;

        // Rolling terrain the sphere collapses into as you scroll.
        vec3 w = aWave;
        w.y += sin(w.x * 0.9 + uTime * 0.8) * 0.35 + cos(w.z * 1.3 + uTime * 0.6) * 0.25;

        float t = smoothstep(0.0, 1.0, clamp(uProgress * 1.5 - aRand * 0.35, 0.0, 1.0));
        vec3 p = mix(s, w, t);

        vec4 mv = uModelView * vec4(p, 1.0);

        // Pointer repel in view space.
        vec2 m = uMouse * vec2(4.2, 2.4);
        vec2 d = mv.xy - m;
        float dist = length(d);
        mv.xy += normalize(d + 0.0001) * smoothstep(1.5, 0.0, dist) * 0.5;

        gl_Position = uProjection * mv;
        float accentBoost = aAccent > 0.5 ? 1.7 : 1.0;
        gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) * accentBoost / -mv.z;

        vAccent = aAccent;
        vAlpha = 0.45 + aRand * 0.55;
    }
`;

const fragmentShader = /* glsl */ `
    precision mediump float;

    uniform vec3 uColor;
    uniform vec3 uAccent;
    uniform float uOpacity;

    varying float vAccent;
    varying float vAlpha;

    void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        // Solid core with a short falloff keeps points crisp instead of misty.
        float a = smoothstep(0.5, 0.18, d);
        vec3 col = mix(uColor, uAccent, vAccent);
        gl_FragColor = vec4(col, a * vAlpha * uOpacity);
    }
`;

function buildGeometry(count: number) {
    const sphere = new Float32Array(count * 3);
    const wave = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const accent = new Float32Array(count);
    const side = Math.ceil(Math.sqrt(count));
    const golden = Math.PI * (1 + Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = golden * i;
        const r = 2.15 + (Math.random() - 0.5) * 0.3;
        sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        sphere[i * 3 + 1] = r * Math.cos(phi);
        sphere[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

        const gx = (i % side) / side - 0.5;
        const gz = Math.floor(i / side) / side - 0.5;
        wave[i * 3] = gx * 14;
        wave[i * 3 + 1] = -1.6;
        wave[i * 3 + 2] = gz * 9 - 1.5;

        rand[i] = Math.random();
        accent[i] = Math.random() < 0.06 ? 1 : 0;
    }
    return { sphere, wave, rand, accent };
}

// Hex to linear RGB, matching how the previous renderer treated uniform colors.
function hexToLinear(hex: string): [number, number, number] {
    const v = parseInt(hex.replace('#', ''), 16);
    const toLinear = (c: number) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return [toLinear((v >> 16) & 255), toLinear((v >> 8) & 255), toLinear(v & 255)];
}

function perspective(out: Float32Array, fovDeg: number, aspect: number, near: number, far: number) {
    const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
}

// Camera at z = 6 looking down -z; the model rotates around Y and scales uniformly.
function modelView(out: Float32Array, angle: number, scale: number) {
    const c = Math.cos(angle) * scale;
    const s = Math.sin(angle) * scale;
    out.fill(0);
    out[0] = c;
    out[2] = -s;
    out[5] = scale;
    out[8] = s;
    out[10] = c;
    out[14] = -6;
    out[15] = 1;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const UNIFORMS = ['uProjection', 'uModelView', 'uTime', 'uProgress', 'uMouse', 'uPixelRatio', 'uSize', 'uColor', 'uAccent', 'uOpacity'];

export interface HeroParticlesProps {
    progressRef: RefObject<number>;
    zoomRef: RefObject<{ intro: number; scroll: number }>;
    color: string;
    accent: string;
    glow: boolean;
    active: boolean;
    reduceMotion: boolean;
    density?: number;
}

export default function HeroParticles({
    progressRef,
    zoomRef,
    color,
    accent,
    glow,
    active,
    reduceMotion,
    density = 1,
}: HeroParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Latest props for the render loop, so prop changes never tear down the GL context.
    const live = useRef({ color, accent, glow, active, reduceMotion });
    const wake = useRef<() => void>(() => {});

    useEffect(() => {
        live.current = { color, accent, glow, active, reduceMotion };
        wake.current();
    }, [color, accent, glow, active, reduceMotion]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;

        let gl: WebGLRenderingContext | null = null;
        let frame = 0;
        let last = 0;
        let time = 0;
        let angle = 0;
        let progress = 0;
        let count = 0;
        let disposed = false;
        const mouse = { x: 0, y: 0 };
        const pointer = { x: 0, y: 0 };
        const proj = new Float32Array(16);
        const view = new Float32Array(16);
        let loc: Record<string, WebGLUniformLocation | null> = {};
        const isPhone = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
        const minFrameMs = isPhone ? 30 : 0;

        const draw = (dt: number) => {
            if (!gl) return;
            const p = live.current;
            const k = 1 - Math.exp(-dt * 6);
            if (!p.reduceMotion) {
                time += dt;
                angle += dt * 0.06;
                mouse.x += (pointer.x - mouse.x) * k * 0.6;
                mouse.y += (pointer.y - mouse.y) * k * 0.6;
            }
            const target = progressRef.current ?? 0;
            progress = dt ? progress + (target - progress) * k : target;
            // Intro zoom eases 0.85 -> 1 from the first drawn frame (owned here, so no extra timeline at hydration).
            const z = zoomRef.current;
            if (z && z.intro < 1) z.intro = p.reduceMotion ? 1 : Math.min(1, z.intro + (1 - z.intro) * (dt ? 1 - Math.exp(-dt * 1.8) : 0) + 0.0005);
            const zoom = (z?.intro ?? 1) * (z?.scroll ?? 1);
            modelView(view, angle, zoom);

            // Additive glow reads well on dark; on a light page it would wash points out to white.
            if (p.glow) gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            else gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            gl.uniformMatrix4fv(loc.uModelView, false, view);
            gl.uniform1f(loc.uTime, time);
            gl.uniform1f(loc.uProgress, progress);
            gl.uniform2f(loc.uMouse, mouse.x, mouse.y);
            gl.uniform1f(loc.uSize, 30);
            gl.uniform1f(loc.uOpacity, p.glow ? 0.8 : 1);
            gl.uniform3fv(loc.uColor, hexToLinear(p.color));
            gl.uniform3fv(loc.uAccent, hexToLinear(p.accent));
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, count);
        };

        const resize = () => {
            if (!gl) return;
            const dpr = isPhone ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
            const w = host.clientWidth;
            const h = host.clientHeight;
            const width = Math.max(1, Math.round(w * dpr));
            const height = Math.max(1, Math.round(h * dpr));
            // Only touch the drawing buffer when its size really changes; assigning clears it.
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
            gl.viewport(0, 0, width, height);
            perspective(proj, 45, w / Math.max(h, 1), 0.1, 100);
            gl.uniformMatrix4fv(loc.uProjection, false, proj);
            gl.uniform1f(loc.uPixelRatio, dpr);
            draw(0);
        };

        const setup = () => {
            gl = canvas.getContext('webgl', {
                alpha: true,
                antialias: false,
                premultipliedAlpha: true,
                powerPreference: 'high-performance',
            });
            if (!gl) return false;
            const ctx = gl;
            const vs = compile(ctx, ctx.VERTEX_SHADER, vertexShader);
            const fs = compile(ctx, ctx.FRAGMENT_SHADER, fragmentShader);
            const program = ctx.createProgram();
            if (!vs || !fs || !program) return false;
            ctx.attachShader(program, vs);
            ctx.attachShader(program, fs);
            ctx.linkProgram(program);
            if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) return false;
            ctx.useProgram(program);

            count = Math.round((window.innerWidth < 768 ? 2600 : 6500) * density);
            const data = buildGeometry(count);
            const attrs: [string, Float32Array, number][] = [
                ['position', data.sphere, 3],
                ['aWave', data.wave, 3],
                ['aRand', data.rand, 1],
                ['aAccent', data.accent, 1],
            ];
            for (const [name, array, size] of attrs) {
                const index = ctx.getAttribLocation(program, name);
                if (index < 0) continue;
                ctx.bindBuffer(ctx.ARRAY_BUFFER, ctx.createBuffer());
                ctx.bufferData(ctx.ARRAY_BUFFER, array, ctx.STATIC_DRAW);
                ctx.enableVertexAttribArray(index);
                ctx.vertexAttribPointer(index, size, ctx.FLOAT, false, 0, 0);
            }
            loc = Object.fromEntries(UNIFORMS.map((name) => [name, ctx.getUniformLocation(program, name)]));
            ctx.disable(ctx.DEPTH_TEST);
            ctx.enable(ctx.BLEND);
            ctx.clearColor(0, 0, 0, 0);
            resize();
            return true;
        };

        // Run only while the hero is in play, the tab is visible and motion is allowed.
        const schedule = () => {
            const p = live.current;
            if (disposed || !gl || frame) return;
            if (p.active && !p.reduceMotion && !document.hidden) frame = requestAnimationFrame(loop);
            else last = 0;
        };

        const loop = (now: number) => {
            frame = 0;
            // Phones render at about 30fps: half the GPU and compositor work for a barely visible difference.
            if (last && now - last < minFrameMs) {
                schedule();
                return;
            }
            const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 0;
            last = now;
            draw(dt);
            schedule();
        };

        wake.current = () => {
            if (!gl) return;
            draw(0);
            schedule();
        };

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

        // Build the scene when the main thread is idle, so it never competes with first paint and hydration.
        const start = () => {
            if (disposed || !setup()) return;
            observer.observe(host);
            // Fade the field in once it has something to show.
            canvas.style.opacity = '1';
            schedule();
        };
        const useIdle = typeof window.requestIdleCallback === 'function';
        const idle = useIdle ? window.requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 600);

        return () => {
            disposed = true;
            if (useIdle) window.cancelIdleCallback(idle);
            else window.clearTimeout(idle);
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('pointermove', onPointer);
            document.removeEventListener('visibilitychange', schedule);
            canvas.removeEventListener('webglcontextlost', onLost);
            canvas.removeEventListener('webglcontextrestored', onRestored);
            gl?.getExtension('WEBGL_lose_context')?.loseContext();
            wake.current = () => {};
        };
        // The GL scene is built once per mount; live props flow through `live`.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full opacity-0 transition-opacity duration-[1800ms] ease-out motion-reduce:transition-none"
        />
    );
}
