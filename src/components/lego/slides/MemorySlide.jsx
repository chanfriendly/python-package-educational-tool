import React, { useState, useMemo } from 'react';
import { Float } from '@react-three/drei';
import { LegoBlock } from '../LegoBlock';

export const MemorySlide = ({ active, onOptimize, optimized }) => {
    // Generate 50 random positions for the "List" state
    const scatteredPositions = useMemo(() => {
        return Array.from({ length: 50 }).map(() => [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        ]);
    }, []);

    // Generate grid positions for the "Array" state
    const gridPositions = useMemo(() => {
        const pos = [];
        for (let i = 0; i < 50; i++) {
            const col = i % 10;
            const row = Math.floor(i / 10);
            pos.push([
                (col - 4.5) * 1.1,
                (row - 2) * 1.1,
                0
            ]);
        }
        return pos;
    }, []);

    const colors = ["#ff453a", "#ff9f0a", "#ffd60a", "#30d158", "#64d2ff", "#bf5af2"];

    return (
        <group visible={active}>
            {scatteredPositions.map((pos, i) => (
                <Float
                    speed={optimized ? 0 : 2}
                    rotationIntensity={optimized ? 0 : 1}
                    floatIntensity={optimized ? 0 : 2}
                    key={i}
                >
                    <LegoBlock
                        position={optimized ? gridPositions[i] : pos}
                        color={colors[i % colors.length]}
                    />
                </Float>
            ))}
        </group>
    );
};
