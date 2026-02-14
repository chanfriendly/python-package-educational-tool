
import React, { useState } from 'react';
import { LegoFactory } from './components/lego/LegoFactory';
import { NumpyIntro } from './components/lego/NumpyIntro';

import { PandasIntro } from './components/pandas/PandasIntro';
import { PandasAssemblyLine } from './components/pandas/PandasAssemblyLine';
import { Dashboard } from './components/ui/Dashboard';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'numpy-level-1'

  const navigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard onNavigate={navigate} />
          </motion.div>
        )}

        {currentView === 'numpy-intro' && (
          <motion.div
            key="numpy-intro"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <NumpyIntro onComplete={() => navigate('dashboard')} />
          </motion.div>
        )}

        {currentView === 'numpy-level-1' && (
          <motion.div
            key="numpy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <LegoFactory onBack={() => navigate('dashboard')} />
          </motion.div>
        )}

        {currentView === 'pandas-intro' && (
          <motion.div
            key="pandas-intro"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <PandasIntro onComplete={() => navigate('pandas-level-1')} />
          </motion.div>
        )}

        {currentView === 'pandas-level-1' && (
          <motion.div
            key="pandas-level-1"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <PandasAssemblyLine onBack={() => navigate('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
