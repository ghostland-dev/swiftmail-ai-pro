
import React, { useState } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { EmailDashboard } from '@/components/EmailDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <EmailDashboard />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
