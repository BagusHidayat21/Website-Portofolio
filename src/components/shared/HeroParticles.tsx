'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { createParticleField, type FieldState, type ParticleField } from './particles/field';

interface HeroParticlesProps extends FieldState {
    progressRef: RefObject<number>;
    zoomRef: RefObject<{ intro: number; scroll: number }>;
    density?: number;
}

export default function HeroParticles({ progressRef, zoomRef, density = 1, color, accent, glow, active, reduceMotion }: HeroParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fieldRef = useRef<ParticleField | null>(null);
    const stateRef = useRef<FieldState>({ color, accent, glow, active, reduceMotion });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const field = createParticleField(canvas, stateRef.current, {
            density,
            progress: () => progressRef.current,
            zoom: zoomRef.current,
        });
        fieldRef.current = field;
        return () => {
            field?.dispose();
            fieldRef.current = null;
        };
    }, [density, progressRef, zoomRef]);

    useEffect(() => {
        stateRef.current = { color, accent, glow, active, reduceMotion };
        fieldRef.current?.update(stateRef.current);
    }, [color, accent, glow, active, reduceMotion]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full opacity-0 transition-opacity duration-1800 ease-out motion-reduce:transition-none"
        />
    );
}
