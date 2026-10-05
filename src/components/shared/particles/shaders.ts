// One point cloud morphing from a breathing sphere into rolling terrain as the hero scrolls away.
export const vertexShader = /* glsl */ `
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
        vec3 s = position;
        float n = sin(s.x * 1.7 + uTime * 0.6 + aRand * 6.2831) * 0.12
                + sin(s.y * 2.3 - uTime * 0.45) * 0.1
                + cos(s.z * 1.9 + uTime * 0.3) * 0.08;
        s += normalize(s) * n;

        vec3 w = aWave;
        w.y += sin(w.x * 0.9 + uTime * 0.8) * 0.35 + cos(w.z * 1.3 + uTime * 0.6) * 0.25;

        float t = smoothstep(0.0, 1.0, clamp(uProgress * 1.5 - aRand * 0.35, 0.0, 1.0));
        vec3 p = mix(s, w, t);

        vec4 mv = uModelView * vec4(p, 1.0);

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

export const fragmentShader = /* glsl */ `
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
