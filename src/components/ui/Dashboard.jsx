import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Microscope, Database } from 'lucide-react';

const ModuleCard = ({ title, description, icon: Icon, color, locked, onClick, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={!locked ? { scale: 1.02, y: -5 } : {}}
            onClick={!locked ? onClick : undefined}
            style={{
                background: 'var(--bg-panel)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                cursor: locked ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                opacity: locked ? 0.5 : 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '100%',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
                pointerEvents: 'none'
            }} />

            <div style={{
                background: `${color}20`,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={24} />
            </div>

            <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: locked ? 'var(--text-secondary)' : color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {locked ? 'Coming Soon' : 'Available Now'}
                </span>
                {!locked && (
                    <div style={{
                        background: color,
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 500
                    }}>
                        Start
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const Dashboard = ({ onNavigate }) => {
    const modules = [
        {
            id: 'numpy-intro',
            title: 'Lesson 0: The Foundation',
            description: 'Why do we need NumPy? Visualize the difference between Python Lists and NumPy Arrays.',
            icon: Box,
            color: '#ff9f0a', // Orange
            locked: false,
            target: 'numpy-intro'
        },
        {
            id: 'numpy',
            title: 'Lesson 1: Reshape',
            description: 'Master array manipulation by building physical Lego structures. Learn reshape, broadcast, and more.',
            icon: Box,
            color: '#ff453a', // Red
            locked: false,
            target: 'numpy-level-1'
        },
        {
            id: 'pandas',
            title: 'Lesson 2: Pandas Assembly',
            description: 'Construct dataframes on a high-tech assembly line. Merge, join, and filter data blocks.',
            icon: Database,
            color: '#30d158', // Green
            locked: false,
            target: 'pandas-intro'
        },
        {
            id: 'matplotlib',
            title: 'Matplotlib Studio',
            description: 'Compose visualizations in a 3D layered studio. Understand the Artist hierarchy.',
            icon: Layers,
            color: '#0a84ff', // Blue
            locked: true
        },
        {
            id: 'inspect',
            title: 'Inspect Microscope',
            description: 'Zoom into Python objects to reveal their hidden metadata and inner workings.',
            icon: Microscope,
            color: '#bf5af2', // Purple
            locked: true
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            padding: '48px',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px'
        }}>
            <header>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}
                >
                    Python Physical Lab
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px' }}
                >
                    Interactive visual metaphors for mastering Python's most powerful data packages.
                </motion.p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {modules.map((mod, i) => (
                    <ModuleCard
                        key={mod.id}
                        {...mod}
                        delay={i * 0.1 + 0.3}
                        onClick={() => onNavigate(mod.target)}
                    />
                ))}
            </div>
        </div>
    );
};
