'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uMouse;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute vec3 aWave;
    attribute float aRand;
    attribute float aAccent;

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

        vec4 mv = modelViewMatrix * vec4(p, 1.0);

        // Pointer repel in view space.
        vec2 m = uMouse * vec2(4.2, 2.4);
        vec2 d = mv.xy - m;
        float dist = length(d);
        mv.xy += normalize(d + 0.0001) * smoothstep(1.5, 0.0, dist) * 0.5;

        gl_Position = projectionMatrix * mv;
        float accentBoost = aAccent > 0.5 ? 1.7 : 1.0;
        gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) * accentBoost / -mv.z;

        vAccent = aAccent;
        vAlpha = 0.25 + aRand * 0.75;
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uAccent;

    varying float vAccent;
    varying float vAlpha;

    void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        vec3 col = mix(uColor, uAccent, vAccent);
        gl_FragColor = vec4(col, a * vAlpha);
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

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
    geometry.setAttribute('aWave', new THREE.BufferAttribute(wave, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
    geometry.setAttribute('aAccent', new THREE.BufferAttribute(accent, 1));
    return geometry;
}

function ParticleField({
    count,
    color,
    progressRef,
    animate,
}: {
    count: number;
    color: string;
    progressRef: RefObject<number>;
    animate: boolean;
}) {
    const points = useRef<THREE.Points>(null);
    const material = useRef<THREE.ShaderMaterial>(null);
    const geometry = useMemo(() => buildGeometry(count), [count]);
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uPixelRatio: { value: 1 },
            uSize: { value: 26 },
            uColor: { value: new THREE.Color(color) },
            uAccent: { value: new THREE.Color('#c8ff3d') },
        }),
        // Color updates are applied in useFrame; uniforms object must stay stable.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useFrame((state, delta) => {
        const mat = material.current;
        if (!mat) return;
        const u = mat.uniforms;
        u.uPixelRatio.value = state.gl.getPixelRatio();
        (u.uColor.value as THREE.Color).set(color);
        if (animate) {
            u.uTime.value += delta;
            (u.uMouse.value as THREE.Vector2).lerp(state.pointer, 0.06);
            if (points.current) points.current.rotation.y += delta * 0.06;
        }
        const target = progressRef.current ?? 0;
        u.uProgress.value += (target - u.uProgress.value) * 0.08;
    });

    return (
        <points ref={points} geometry={geometry}>
            <shaderMaterial
                ref={material}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
            />
        </points>
    );
}

export interface HeroParticlesProps {
    progressRef: RefObject<number>;
    eventSource: RefObject<HTMLElement | null>;
    color: string;
    active: boolean;
    reduceMotion: boolean;
}

export default function HeroParticles({ progressRef, eventSource, color, active, reduceMotion }: HeroParticlesProps) {
    const count = useMemo(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 2600 : 6500), []);

    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            frameloop={reduceMotion ? 'demand' : active ? 'always' : 'never'}
            eventSource={eventSource as RefObject<HTMLElement>}
            eventPrefix="client"
            aria-hidden="true"
        >
            <ParticleField count={count} color={color} progressRef={progressRef} animate={!reduceMotion} />
        </Canvas>
    );
}
