import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, Table } from 'lucide-react';

export const PandasIntro = ({ onComplete }) => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '600px',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, var(--accent-orange), #ff9f0a)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px',
                        boxShadow: '0 20px 40px rgba(255, 159, 10, 0.3)'
                    }}
                >
                    <Table size={40} color="white" />
                </motion.div>

                <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                    The Data Factory
                </h1>

                <p style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '48px' }}>
                    Welcome to the Pandas Data Factory. Here, we don't just deal with raw blocks like in NumPy.
                    We manage <strong>structured products</strong>—items with labels, categories, and attributes.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px', textAlign: 'left' }}>
                    <div style={{ background: 'var(--bg-panel)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>
                            <Package size={24} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>The DataFrame</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Think of it as an <strong>Assembly Line</strong>. Each item on the belt is a row, and every item has specific attributes (columns).
                        </p>
                    </div>
                    <div style={{ background: 'var(--bg-panel)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ color: 'var(--accent-green)', marginBottom: '12px' }}>
                            <Table size={24} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Structured Data</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Unlike NumPy arrays which are just numbers, Pandas DataFrames hold labeled data like spreadsheets or SQL tables.
                        </p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    style={{
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        padding: '16px 48px',
                        borderRadius: '100px',
                        fontSize: '18px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 4px 20px rgba(255,255,255,0.2)'
                    }}
                >
                    Enter Factory <ArrowRight size={20} />
                </motion.button>
            </motion.div>
        </div>
    );
};
