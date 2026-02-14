
import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Box, Repeat, FastForward, Image as ImageIcon, Activity, TrendingUp, Layers, Waves, Filter } from 'lucide-react';
import { MemorySlide } from './slides/MemorySlide';
import { VectorizationSlide } from './slides/VectorizationSlide';
import { ApplicationsSlide } from './slides/ApplicationsSlide';

const IntroOverlay = ({ slide, onNext, onComplete, memoryState, setMemoryState, vectorState, setVectorState, appTab, setAppTab, appAction, setAppAction }) => {
    const content = {
        0: {
            title: "Memory Layout",
            desc_initial: "Standard Python lists are flexible but scattered. Each item is a separate object, like blocks thrown in a bag. This is slow for big data.",
            desc_optimized: "NumPy arrays are packed tightly in memory (contiguous). This makes them incredibly fast and efficient for math.",
        },
        1: {
            title: "Vectorization",
            desc_initial: "In Python, a 'for loop' processes items one by one. It's like a worker picking up each block individually.",
            desc_optimized: "NumPy uses 'Vectorization' to process the entire array at once in compiled C code. It's like a wave transforming everything instantly.",
        },
        2: {
            title: "Real-World Impact",
            desc_initial: "NumPy is the foundation of modern science. See how it handles Images (3D Arrays), Physics (Simulations), and Data (Filtering).",
            desc_optimized: "NumPy is the foundation of modern science. See how it handles Images (3D Arrays), Physics (Simulations), and Data (Filtering).",
        }
    };

    const curr = content[slide];
    const isOptimized = slide === 0 ? memoryState : (slide === 1 ? vectorState === 'vector' : true);

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '48px',
            transform: 'translateY(-50%)',
            width: '450px',
            zIndex: 10,
            pointerEvents: 'none'
        }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
                        Why <span style={{ color: 'var(--accent-blue)' }}>NumPy?</span>
                    </h1>

                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px', color: 'var(--accent-orange)' }}>
                        {curr.title}
                    </h2>

                    <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', minHeight: '80px' }}>
                        {isOptimized ? curr.desc_optimized : curr.desc_initial}
                    </p>

                    <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                        {slide === 0 && (
                            !memoryState ? (
                                <button
                                    onClick={() => setMemoryState(true)}
                                    style={btnStyle('var(--accent-blue)')}
                                >
                                    <Zap size={20} fill="currentColor" />
                                    Optimize Memory
                                </button>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <Metric icon={Zap} color="var(--accent-green)" text="50x Faster" />
                                        <Metric icon={Box} color="var(--accent-blue)" text="4x Less Memory" />
                                    </div>
                                    <button onClick={onNext} style={btnStyle('var(--text-primary)', true)}>
                                        Next Concept <ArrowRight size={20} />
                                    </button>
                                </div>
                            )
                        )}

                        {slide === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => setVectorState('loop')}
                                        style={{ ...btnStyle('var(--accent-orange)'), opacity: vectorState === 'loop' ? 1 : 0.5 }}
                                    >
                                        <Repeat size={20} /> Run Loop
                                    </button>
                                    <button
                                        onClick={() => setVectorState('vector')}
                                        style={{ ...btnStyle('var(--accent-green)'), opacity: vectorState === 'vector' ? 1 : 0.5 }}
                                    >
                                        <FastForward size={20} /> Vectorize
                                    </button>
                                </div>

                                {vectorState === 'vector' && (
                                    <button onClick={onNext} style={btnStyle('var(--text-primary)', true)}>
                                        Real-World Uses <ArrowRight size={20} />
                                    </button>
                                )}
                            </div>
                        )}

                        {slide === 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '100px' }}>
                                    <TabButton active={appTab === 'image'} onClick={() => { setAppTab('image'); setAppAction(false); }} icon={ImageIcon} label="Image" />
                                    <TabButton active={appTab === 'physics'} onClick={() => { setAppTab('physics'); setAppAction(false); }} icon={Activity} label="Physics" />
                                    <TabButton active={appTab === 'data'} onClick={() => { setAppTab('data'); setAppAction(false); }} icon={TrendingUp} label="Data" />
                                </div>

                                <div style={{ minHeight: '60px' }}>
                                    {appTab === 'image' && (
                                        <button onClick={() => setAppAction(!appAction)} style={btnStyle(appAction ? 'var(--accent-blue)' : 'var(--text-secondary)', true)}>
                                            <Layers size={20} /> {appAction ? "Merge Channels" : "Split RGB Channels"}
                                        </button>
                                    )}
                                    {appTab === 'physics' && (
                                        <button onClick={() => setAppAction(!appAction)} style={btnStyle(appAction ? 'var(--accent-blue)' : 'var(--text-secondary)', true)}>
                                            <Waves size={20} /> {appAction ? "Stop Simulation" : "Simulate Wave"}
                                        </button>
                                    )}
                                    {appTab === 'data' && (
                                        <button onClick={() => setAppAction(!appAction)} style={btnStyle(appAction ? 'var(--accent-blue)' : 'var(--text-secondary)', true)}>
                                            <Filter size={20} /> {appAction ? "Reset Filter" : "Filter Low Values"}
                                        </button>
                                    )}
                                </div>

                                <button onClick={onComplete} style={btnStyle('var(--accent-green)')}>
                                    Start Learning <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Metric = ({ icon: Icon, color, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color }}>
        <Icon size={20} />
        <span style={{ fontWeight: 600 }}>{text}</span>
    </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        style={{
            background: active ? 'var(--bg-panel)' : 'transparent',
            color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            flex: 1,
            justifyContent: 'center'
        }}
    >
        <Icon size={16} />
        {label}
    </button>
);

const btnStyle = (bg, outline = false) => ({
    background: outline ? 'transparent' : bg,
    border: outline ? `1px solid ${bg} ` : 'none',
    color: outline ? bg : '#fff',
    padding: '12px 24px',
    borderRadius: '100px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s'
});

export const NumpyIntro = ({ onComplete }) => {
    const [slide, setSlide] = useState(0);
    const [memoryOptimized, setMemoryOptimized] = useState(false);
    const [vectorMode, setVectorMode] = useState(null); // 'loop' | 'vector'
    const [appTab, setAppTab] = useState('image'); // 'image' | 'physics' | 'data'
    const [appAction, setAppAction] = useState(false); // Toggle state for current tab

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'var(--bg-app)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 20 }}>
                <button
                    onClick={onComplete}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'var(--text-primary)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    ←
                </button>
            </div>

            <IntroOverlay
                slide={slide}
                onNext={() => setSlide(s => s + 1)}
                onComplete={onComplete}
                memoryState={memoryOptimized}
                setMemoryState={setMemoryOptimized}
                vectorState={vectorMode}
                setVectorState={setVectorMode}
                appTab={appTab}
                setAppTab={setAppTab}
                appAction={appAction}
                setAppAction={setAppAction}
            />

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                <OrbitControls enableZoom={false} autoRotate={slide === 0 && !memoryOptimized} autoRotateSpeed={0.5} />

                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <MemorySlide active={slide === 0} optimized={memoryOptimized} />
                <VectorizationSlide active={slide === 1} mode={vectorMode} />
                <ApplicationsSlide active={slide === 2} tab={appTab} actionState={appAction} />
            </Canvas>
        </div>
    );
};

