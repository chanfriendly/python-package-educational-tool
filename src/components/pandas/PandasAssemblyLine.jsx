import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Text, RoundedBox, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChallengeCard } from '../ui/ChallengeCard';
import * as THREE from 'three';

// --- 3D Components ---

const ConveyorBelt = () => {
    const textureRef = useRef();

    // Animate texture offset to simulate movement
    useFrame((state, delta) => {
        if (textureRef.current) {
            textureRef.current.offset.y -= delta * 0.5;
        }
    });

    return (
        <group>
            {/* Belt Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[4, 10]} />
                <meshStandardMaterial color="#333" roughness={0.8} />
            </mesh>
            {/* Rails */}
            <mesh position={[-2.1, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 10]} />
                <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[2.1, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 10]} />
                <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
};

const DataPackage = ({ position, data, label, color = "#ff9f0a" }) => {
    const group = useRef();

    useFrame((state, delta) => {
        // Move package forward along Z axis
        if (group.current) {
            group.current.position.z += delta * 2;

            // Loop back for demo purposes if it goes too far
            if (group.current.position.z > 6) {
                group.current.position.z = -6;
            }
        }
    });

    return (
        <group ref={group} position={position}>
            <RoundedBox args={[1.5, 1, 1.5]} radius={0.05} smoothness={4} castShadow>
                <meshStandardMaterial color={color} roughness={0.2} />
            </RoundedBox>

            {/* Label on top */}
            <group position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <Text
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0.3, 0]}
                >
                    {label}
                </Text>

                {/* Attributes (Columns) */}
                <Text
                    fontSize={0.1}
                    color="rgba(255,255,255,0.8)"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0, 0]}
                >
                    ID: {data.ID}
                </Text>
                <Text
                    fontSize={0.1}
                    color="rgba(255,255,255,0.8)"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, -0.2, 0]}
                >
                    Status: {data.Status}
                </Text>
            </group>
        </group>
    );
};

export const PandasAssemblyLine = ({ onBack }) => {
    const [isRunning, setIsRunning] = useState(false);

    // Sample DataFrame Data
    const data = [
        { Product: "Widget A", Status: "Ready", ID: 101, color: "#ff453a", offset: 0 },
        { Product: "Widget B", Status: "Testing", ID: 102, color: "#ff9f0a", offset: -3 },
        { Product: "Widget C", Status: "Failed", ID: 103, color: "#30d158", offset: -6 },
    ];

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-app)', position: 'relative' }}>
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '24px',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Pandas Assembly Line</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>DataFrame Visualization</p>
                </div>
                <button
                    onClick={onBack}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Dashboard
                </button>
            </div>

            <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                <ConveyorBelt />

                {isRunning && data.map((row, i) => (
                    <DataPackage
                        key={i}
                        position={[0, 0.5, row.offset]}
                        label={row.Product}
                        data={row}
                        color={row.color}
                    />
                ))}

                <OrbitControls enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>

            {/* Controls */}
            <div style={{
                position: 'absolute',
                bottom: '48px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: '16px'
            }}>
                {!isRunning ? (
                    <button
                        onClick={() => setIsRunning(true)}
                        style={{
                            background: 'var(--accent-green)',
                            border: 'none',
                            color: '#fff',
                            padding: '16px 48px',
                            borderRadius: '100px',
                            fontSize: '18px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(48, 209, 88, 0.4)'
                        }}
                    >
                        Start Production
                    </button>
                ) : (
                    <div style={{
                        background: 'var(--bg-panel)',
                        backdropFilter: 'blur(10px)',
                        padding: '16px 32px',
                        borderRadius: '100px',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        Processing DataFrame...
                    </div>
                )}
            </div>

            {/* Code Overlay */}
            <div style={{
                position: 'absolute',
                top: '100px',
                right: '24px',
                width: '300px',
                background: 'var(--bg-panel)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'monospace',
                fontSize: '13px'
            }}>
                <div style={{ color: '#ff79c6', marginBottom: '8px' }}>import pandas as pd</div>
                <div style={{ color: '#bd93f9' }}>data = {'{'}</div>
                <div style={{ paddingLeft: '20px', color: '#f1fa8c' }}>"Product": <span style={{ color: 'white' }}>["Widget A", "Widget B", "Widget C"]</span>,</div>
                <div style={{ paddingLeft: '20px', color: '#f1fa8c' }}>"Status": <span style={{ color: 'white' }}>["Ready", "Testing", "Failed"]</span>,</div>
                <div style={{ paddingLeft: '20px', color: '#f1fa8c' }}>"ID": <span style={{ color: 'white' }}>[101, 102, 103]</span></div>
                <div style={{ color: '#bd93f9' }}>{'}'}</div>
                <br />
                <div style={{ color: '#8be9fd' }}>df = pd.DataFrame(data)</div>
            </div>
        </div>
    );
};
