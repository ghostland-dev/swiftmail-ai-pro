
import React, { useState } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { EmailDashboard } from '@/components/EmailDashboard';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          <EmailDashboard />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          <LoginPage onLogin={handleLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
