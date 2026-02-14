import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, PerspectiveCamera } from '@react-three/drei';
import { LegoBlock } from './LegoBlock';
import { motion } from 'framer-motion';
import { ChallengeCard } from '../ui/ChallengeCard';

// --- Utils ---
const getPositionForIndex = (index, shape) => {
    // shape is e.g. [2, 3] (2 rows, 3 cols)
    const dims = [...shape];
    const ndim = dims.length;

    // Calculate strides
    const cols = dims[ndim - 1];
    const rows = ndim > 1 ? dims[ndim - 2] : 1;
    const layer = Math.floor(index / (cols * rows));

    const col = index % cols;
    const row = Math.floor((index / cols)) % rows;

    // Centering offsets
    const xOffset = (cols - 1) / 2;
    const zOffset = (rows - 1) / 2;

    return [
        (col - xOffset) * 1.1,      // Spacing 1.1
        layer * 1.0,                // Stack height
        (row - zOffset) * 1.1       // Spacing 1.1
    ];
};

// --- Components ---

const Header = ({ onBack }) => (
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
            <h1 style={{ fontSize: '24px', fontWeight: 600 }}>NumPy Lego Factory</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Reverse Engineering Mode</p>
        </div>
        <div style={{
            background: 'rgba(41, 151, 255, 0.1)',
            color: 'var(--accent-blue)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: 500
        }}>
            Level 1: Reshape
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
);

const TargetPreview = ({ shape, colors }) => {
    // Static data for preview
    const data = [0, 1, 2, 3, 4, 5];

    return (
        <div style={{
            position: 'absolute',
            top: '100px',
            right: '24px',
            width: '240px',
            height: '180px',
            background: 'var(--bg-panel)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            zIndex: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '16px',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                zIndex: 1
            }}>
                TARGET BLUEPRINT
            </div>
            <Canvas camera={{ position: [0, 4, 6], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} />
                <group position={[0, -0.5, 0]}>
                    {data.map((val, i) => {
                        const pos = getPositionForIndex(i, shape);
                        return (
                            <LegoBlock
                                key={i}
                                position={pos}
                                color={colors[i]}
                            />
                        );
                    })}
                </group>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} enablePan={false} />
            </Canvas>
        </div>
    );
};

export const LegoFactory = ({ onBack }) => {
    // --- State ---
    // 6 blocks initially in a 1D line
    const [blocks, setBlocks] = useState(() =>
        Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            color: ["#ff453a", "#ff9f0a", "#ffd60a", "#30d158", "#64d2ff", "#bf5af2"][i],
            position: [(i - 2.5) * 1.1, 0, 0] // Centered line
        }))
    );

    const [targetShape] = useState([2, 3]); // 2 rows, 3 cols
    const [completed, setCompleted] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState(null);

    const colors = ["#ff453a", "#ff9f0a", "#ffd60a", "#30d158", "#64d2ff", "#bf5af2"];

    const handleOption = (option) => {
        if (option === 'reshape_2_3') {
            setCompleted(true);
            setErrorFeedback(null);
            // Animate to 2x3 grid
            setBlocks(prev => prev.map((b, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                return {
                    ...b,
                    position: [(col - 1) * 1.1, (0.5 - row) * 1.1, 0]
                };
            }));
        } else if (option === 'reshape_3_2') {
            setErrorFeedback("Incorrect dimensions. (3, 2) would be 3 rows of 2 columns. We need 2 rows of 3 columns.");
        } else {
            setErrorFeedback("Flattening makes it 1D again. We need a 2D grid.");
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-app)', position: 'relative' }}>
            <Header onBack={onBack} />
            <TargetPreview shape={targetShape} colors={colors} />
            <ChallengeCard
                title="Mission: Reshape the Data"
                description="We have a raw 1D array of 6 elements. The client needs a 2x3 grid structure to fit their blueprint."
                hint="Check the dimensions: (Rows, Columns)"
                concept="Reshape changes the dimensions of your data without changing the data itself. Like rearranging 6 Lego blocks from a line into a rectangle."
                error={errorFeedback}
                completed={completed}
            />

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 5, 8]} fov={50} />
                <OrbitControls enableZoom={false} />

                <Environment preset="warehouse" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <Stage intensity={0.5} environment="city" adjustCamera={false}>
                    {blocks.map(block => (
                        <LegoBlock
                            key={block.id}
                            position={block.position}
                            color={block.color}
                        />
                    ))}
                </Stage>
            </Canvas>

            {/* Puzzle Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '48px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: '16px'
            }}>
                {!completed && (
                    <>
                        <button
                            onClick={() => handleOption('reshape_3_2')}
                            style={{
                                background: 'var(--bg-panel)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Reshape (3, 2)
                        </button>
                        <button
                            onClick={() => handleOption('reshape_2_3')}
                            style={{
                                background: 'var(--bg-panel)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Reshape (2, 3)
                        </button>
                        <button
                            onClick={() => handleOption('flatten')}
                            style={{
                                background: 'var(--bg-panel)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Flatten
                        </button>
                    </>
                )}

                {completed && (
                    <div style={{
                        background: 'var(--accent-green)',
                        color: '#fff',
                        padding: '16px 32px',
                        borderRadius: '100px',
                        fontSize: '18px',
                        fontWeight: 700,
                        boxShadow: '0 8px 24px rgba(48, 209, 88, 0.4)'
                    }}>
                        System Optimized
                    </div>
                )}
            </div>
        </div>
    );
};
