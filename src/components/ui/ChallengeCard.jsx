import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, AlertCircle, BookOpen, XCircle } from 'lucide-react';

export const ChallengeCard = ({ title, description, hint, completed, error, concept }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                position: 'absolute',
                top: '100px',
                left: '24px',
                width: '320px',
                background: 'var(--bg-panel-translucent)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                zIndex: 10,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: completed ? 'var(--accent-green)' : 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                }}>
                    {completed ? <CheckCircle size={14} /> : <HelpCircle size={14} />}
                </div>
                <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: completed ? 'var(--accent-green)' : 'var(--accent-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {completed ? 'Mission Accomplished' : 'Current Objective'}
                </span>
            </div>

            {concept && !completed && (
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--accent-blue)' }}>
                        <BookOpen size={14} />
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Concept</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {concept}
                    </p>
                </div>
            )}

            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h2>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.6,
                marginBottom: '16px'
            }}>
                {description}
            </p>

            {!completed && hint && (
                <div style={{
                    background: 'rgba(255, 159, 10, 0.1)',
                    borderLeft: '2px solid var(--accent-orange)',
                    padding: '12px',
                    borderRadius: '0 4px 4px 0',
                    fontSize: '13px',
                    color: 'var(--accent-orange)',
                    display: 'flex',
                    gap: '8px'
                }}>
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{hint}</span>
                </div>
            )}

            {error && !completed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        marginTop: '12px',
                        background: 'rgba(255, 69, 58, 0.1)',
                        borderLeft: '2px solid var(--accent-red)',
                        padding: '12px',
                        borderRadius: '0 4px 4px 0',
                        fontSize: '13px',
                        color: 'var(--accent-red)',
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{error}</span>
                </motion.div>
            )}

            {completed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '14px',
                        color: 'var(--text-primary)'
                    }}
                >
                    <strong>Why it works:</strong> <br />
                    <span style={{ color: 'var(--text-secondary)' }}>
                        The <code>.reshape(2, 3)</code> method takes the 6 elements and wraps them into 2 rows of 3 columns. The total elements (2 * 3 = 6) must match the original size.
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
};
