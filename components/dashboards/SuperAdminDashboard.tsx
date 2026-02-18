
import React from 'react';
import { User } from '../../types';

const SuperAdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const schools = [
    { name: 'SMK Negeri 1 Jakarta', code: 'SMK01', users: 1200, status: 'Active', plan: 'Premium' },
    { name: 'SMA Negeri 2 Bandung', code: 'SMA02', users: 850, status: 'Active', plan: 'Basic' },
    { name: 'SMP Bintang Harapan', code: 'SMP03', users: 400, status: 'Inactive', plan: 'Free' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Master Panel (Multi-Tenant)</h2>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Registrasi Sekolah Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <p className="opacity-80 text-sm font-bold uppercase tracking-wider mb-2">Total Sekolah</p>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Pengguna Seluruhnya</p>
          <p className="text-4xl font-bold text-slate-800">2,450</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Uptime Sistem</p>
          <p className="text-4xl font-bold text-green-500">99.9%</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Daftar Sekolah Terdaftar</h3>
          <div className="relative">
             <input type="text" placeholder="Cari sekolah..." className="pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-none text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" />
             <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Nama Sekolah</th>
              <th className="px-6 py-4">Kode</th>
              <th className="px-6 py-4">Paket</th>
              <th className="px-6 py-4">Total User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schools.map((school, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">{school.name}</td>
                <td className="px-6 py-4 font-mono text-sm">{school.code}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${school.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{school.plan}</span>
                </td>
                <td className="px-6 py-4">{school.users}</td>
                <td className="px-6 py-4">
                  <span className={`w-3 h-3 rounded-full inline-block ${school.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-indigo-600 font-bold text-xs hover:underline">Kelola Data</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
