export interface Geometry {
    sphere: Float32Array;
    wave: Float32Array;
    rand: Float32Array;
    accent: Float32Array;
}

/** Fibonacci sphere (start shape) and a flat grid (terrain), plus per-point randomness. */
export function buildGeometry(count: number): Geometry {
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
        sphere.set([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)], i * 3);
        wave.set([((i % side) / side - 0.5) * 14, -1.6, (Math.floor(i / side) / side - 0.5) * 9 - 1.5], i * 3);
        rand[i] = Math.random();
        accent[i] = Math.random() < 0.06 ? 1 : 0;
    }
    return { sphere, wave, rand, accent };
}

/** Hex to linear RGB, so colors match the sRGB look of the original renderer. */
export function hexToLinear(hex: string): [number, number, number] {
    const value = Number.parseInt(hex.slice(1), 16);
    const linear = (c: number) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return [linear((value >> 16) & 255), linear((value >> 8) & 255), linear(value & 255)];
}

export function perspective(out: Float32Array, fovDeg: number, aspect: number, near: number, far: number) {
    const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
}

/** Camera at z = 6 looking down -z; the model rotates around Y and scales uniformly. */
export function modelView(out: Float32Array, angle: number, scale: number) {
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
