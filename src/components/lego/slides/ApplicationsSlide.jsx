import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LegoBlock } from '../LegoBlock';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const ApplicationsSlide = ({ active, tab, actionState }) => {
    // --- Image Processing State (RGB Split) ---
    // 10x10 grid, 3 layers (R, G, B)
    const imageGrid = useMemo(() => {
        const pixels = [];
        for (let i = 0; i < 100; i++) {
            const col = i % 10;
            const row = Math.floor(i / 10);
            // Simple pattern: Circle in the middle
            const dist = Math.sqrt(Math.pow(col - 4.5, 2) + Math.pow(row - 4.5, 2));
            const isCircle = dist < 3;

            pixels.push({
                x: (col - 4.5) * 0.8,
                y: -(row - 4.5) * 0.8,
                r: isCircle ? 1 : 0.2, // Red channel intensity
                g: isCircle ? 0.5 : 0.2, // Green channel intensity
                b: isCircle ? 0.2 : 0.8  // Blue channel intensity
            });
        }
        return pixels;
    }, []);

    // --- Physics State (Wave Sim) ---
    // 15x15 grid
    const physicsGrid = useMemo(() => {
        const blocks = [];
        for (let i = 0; i < 225; i++) {
            const col = i % 15;
            const row = Math.floor(i / 15);
            blocks.push({
                x: (col - 7) * 0.6,
                z: (row - 7) * 0.6,
                baseY: 0
            });
        }
        return blocks;
    }, []);
    const physicsRef = useRef([]);

    // --- Data Analysis State (Filter) ---
    // 10x10 grid with random heights
    const dataGrid = useMemo(() => {
        const blocks = [];
        for (let i = 0; i < 100; i++) {
            const col = i % 10;
            const row = Math.floor(i / 10);
            const value = Math.random();
            blocks.push({
                x: (col - 4.5) * 0.8,
                z: (row - 4.5) * 0.8,
                value: value,
                height: value * 4
            });
        }
        return blocks;
    }, []);

    // --- Animation Loop ---
    useFrame((state) => {
        if (!active) return;

        // Physics Wave Animation
        if (tab === 'physics' && actionState) {
            const time = state.clock.getElapsedTime();
            physicsRef.current.forEach((mesh, i) => {
                if (!mesh) return;
                const block = physicsGrid[i];
                const dist = Math.sqrt(block.x * block.x + block.z * block.z);
                // Wave equation
                const y = Math.sin(dist * 1.5 - time * 3) * 1.5;
                mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, 0.1);
            });
        } else if (tab === 'physics' && !actionState) {
            // Reset physics
            physicsRef.current.forEach((mesh, i) => {
                if (!mesh) return;
                mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, 0, 0.1);
            });
        }
    });

    // --- Render Helpers ---
    const renderImage = () => {
        // actionState = true means "Split Channels"
        const gap = actionState ? 3 : 0.2; // Z-distance between layers

        return imageGrid.map((p, i) => (
            <group key={i} position={[p.x, p.y, 0]}>
                {/* Red Layer */}
                <LegoBlock
                    position={[0, 0, actionState ? gap : 0.2]}
                    color={`rgb(${p.r * 255}, 0, 0)`}
                    scale={[1, 1, 0.3]}
                />
                {/* Green Layer */}
                <LegoBlock
                    position={[0, 0, 0]}
                    color={`rgb(0, ${p.g * 255}, 0)`}
                    scale={[1, 1, 0.3]}
                />
                {/* Blue Layer */}
                <LegoBlock
                    position={[0, 0, actionState ? -gap : -0.2]}
                    color={`rgb(0, 0, ${p.b * 255})`}
                    scale={[1, 1, 0.3]}
                />
            </group>
        ));
    };

    const renderPhysics = () => {
        return physicsGrid.map((b, i) => (
            <mesh
                key={i}
                ref={el => physicsRef.current[i] = el}
                position={[b.x, 0, b.z]}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#0a84ff" />
            </mesh>
        ));
    };

    const renderData = () => {
        // actionState = true means "Filter Low Values"
        return dataGrid.map((b, i) => {
            const isFiltered = actionState && b.value < 0.5;
            return (
                <group key={i} position={[b.x, 0, b.z]}>
                    <mesh
                        position={[0, b.height / 2, 0]}
                        scale={[1, isFiltered ? 0.1 : 1, 1]} // Shrink if filtered
                    >
                        <boxGeometry args={[0.6, b.height, 0.6]} />
                        <meshStandardMaterial
                            color={b.value < 0.5 ? "#ff453a" : "#30d158"}
                            transparent
                            opacity={isFiltered ? 0.2 : 1}
                        />
                    </mesh>
                </group>
            );
        });
    };

    return (
        <group visible={active}>
            <group rotation={[tab === 'image' ? 0 : 0.5, tab === 'image' ? 0 : 0.5, 0]}>
                {tab === 'image' && renderImage()}
                {tab === 'physics' && renderPhysics()}
                {tab === 'data' && renderData()}
            </group>
        </group>
    );
};
