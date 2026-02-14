import React, { useState, useEffect, useRef } from 'react';
import { LegoBlock } from '../LegoBlock';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const VectorizationSlide = ({ active, mode }) => {
    // Grid of 5x5 blocks
    const blocks = useRef([]);
    const [colors, setColors] = useState(Array(25).fill("#0a84ff")); // Default Blue

    // Animation state
    const progress = useRef(0);
    const isRunning = useRef(false);

    useEffect(() => {
        if (active) {
            // Reset when slide becomes active
            setColors(Array(25).fill("#0a84ff"));
            progress.current = 0;
            isRunning.current = false;
        }
    }, [active]);

    useEffect(() => {
        if (!active) return;

        if (mode === 'loop') {
            // Reset
            setColors(Array(25).fill("#0a84ff"));
            progress.current = 0;
            isRunning.current = true;
        } else if (mode === 'vector') {
            // Reset
            setColors(Array(25).fill("#0a84ff"));
            progress.current = 0;
            isRunning.current = true;
        }
    }, [mode, active]);

    useFrame((state, delta) => {
        if (!active || !isRunning.current) return;

        if (mode === 'loop') {
            // Slow sequential update
            progress.current += delta * 5; // 5 blocks per second
            const currentIndex = Math.floor(progress.current);

            if (currentIndex < 25) {
                setColors(prev => {
                    const next = [...prev];
                    // Turn processed blocks Red
                    for (let i = 0; i <= currentIndex; i++) next[i] = "#ff453a";
                    return next;
                });
            } else {
                isRunning.current = false;
            }
        } else if (mode === 'vector') {
            // Instant update (simulated with very fast wave)
            progress.current += delta * 50; // 50 blocks per second (very fast)
            const currentIndex = Math.floor(progress.current);

            if (currentIndex < 25) {
                setColors(prev => {
                    const next = [...prev];
                    // Turn all blocks Red almost instantly
                    for (let i = 0; i < 25; i++) next[i] = "#ff453a";
                    return next;
                });
                isRunning.current = false;
            }
        }
    });

    return (
        <group visible={active} position={[0, 0, 0]}>
            {Array.from({ length: 25 }).map((_, i) => {
                const col = i % 5;
                const row = Math.floor(i / 5);
                const pos = [(col - 2) * 1.2, (row - 2) * 1.2, 0];

                return (
                    <LegoBlock
                        key={i}
                        position={pos}
                        color={colors[i]}
                    />
                );
            })}
        </group>
    );
};
