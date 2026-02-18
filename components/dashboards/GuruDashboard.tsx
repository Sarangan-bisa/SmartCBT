
import React from 'react';
import { User } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Ujian MTK', participants: 45, average: 78 },
  { name: 'Kuis IPA', participants: 38, average: 85 },
  { name: 'UAS B.Indo', participants: 42, average: 92 },
  { name: 'Ujian Agama', participants: 40, average: 88 },
];

const GuruDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Ringkasan Guru</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Buat Ujian Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Bank Soal</div>
          <div className="text-3xl font-bold text-slate-800">425</div>
          <div className="text-xs text-green-500 mt-2 font-medium">+12 minggu ini</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Ujian Aktif</div>
          <div className="text-3xl font-bold text-slate-800">3</div>
          <div className="text-xs text-blue-500 mt-2 font-medium">Monitoring real-time</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Siswa Terdaftar</div>
          <div className="text-3xl font-bold text-slate-800">120</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">Lengkap</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Rata-rata Kelas</div>
          <div className="text-3xl font-bold text-slate-800">85.5</div>
          <div className="text-xs text-green-500 mt-2 font-medium">Meningkat 2%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-6">Analisis Performa Ujian</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="average" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <h4 className="font-bold text-slate-800 mb-6">Aktivitas Terbaru</h4>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Nilai Ujian MTK Dikalkulasi</p>
                  <p className="text-xs text-slate-400">Baru saja • Kelas 10-A</p>
                </div>
                <button className="text-blue-600 text-xs font-bold hover:underline">Detail</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruDashboard;
