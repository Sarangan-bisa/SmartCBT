
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SiswaDashboard from '../components/dashboards/SiswaDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import GuruDashboard from '../components/dashboards/GuruDashboard';
import PengawasDashboard from '../components/dashboards/PengawasDashboard';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onStartExam: (examId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onStartExam }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    // Handling generic "Not Implemented" placeholder for many menus
    if (activeMenu !== 'dashboard') {
      return (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Modul "{activeMenu.toUpperCase()}"</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Halaman ini sedang dalam pengembangan untuk versi 2.2. Silakan kembali lagi nanti untuk fitur lengkap {activeMenu.replace('_', ' ')}.
          </p>
          <button 
            onClick={() => setActiveMenu('dashboard')}
            className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
          >
            Kembali ke Dashboard
          </button>
        </div>
      );
    }

    switch (user.role) {
      case UserRole.SISWA:
        return <SiswaDashboard user={user} onStartExam={onStartExam} />;
      case UserRole.GURU:
        return <GuruDashboard user={user} />;
      case UserRole.ADMIN:
        return <AdminDashboard user={user} />;
      case UserRole.PENGAWAS:
        return <PengawasDashboard user={user} />;
      case UserRole.SUPER_ADMIN:
        return <SuperAdminDashboard user={user} />;
      default:
        return <div className="p-8 bg-red-50 text-red-600 rounded-xl">Role {user.role} belum memiliki dashboard khusus.</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={onLogout} 
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Header user={user} onLogout={onLogout} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
