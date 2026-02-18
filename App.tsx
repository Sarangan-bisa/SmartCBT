
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole } from './types';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ExamView from './views/ExamView';
import { getSession, clearSession } from './services/storage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getSession();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setActiveExamId(null);
  };

  const startExam = (examId: string) => {
    setActiveExamId(examId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If student is in an active exam session
  if (user.role === UserRole.SISWA && activeExamId) {
    return <ExamView user={user} examId={activeExamId} onExit={() => setActiveExamId(null)} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} onStartExam={startExam} />;
};

export default App;
