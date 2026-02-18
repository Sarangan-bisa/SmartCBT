
import React from 'react';
import { User } from '../../types';

const PengawasDashboard: React.FC<{ user: User }> = ({ user }) => {
  const monitoringData = [
    { name: 'Budi Santoso', nisn: '2024001', room: 'Lab A', status: 'Mengerjakan', progress: 45, timeRemaining: '25:10' },
    { name: 'Siti Rahma', nisn: '2024002', room: 'Lab A', status: 'Mengerjakan', progress: 80, timeRemaining: '12:05' },
    { name: 'Andi Wijaya', nisn: '2024003', room: 'Lab A', status: 'Terputus', progress: 10, timeRemaining: '55:00' },
    { name: 'Lia Kusuma', nisn: '2024004', room: 'Lab A', status: 'Selesai', progress: 100, timeRemaining: '00:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Monitoring Real-time</h2>
          <p className="text-slate-500">Ruang: Lab Komputer A</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold flex items-center animate-pulse">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Live Streaming
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase">Total Siswa</p>
          <p className="text-2xl font-bold text-slate-800">40</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-blue-600">
          <p className="text-slate-400 text-xs font-bold uppercase">Aktif</p>
          <p className="text-2xl font-bold">32</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-red-600">
          <p className="text-slate-400 text-xs font-bold uppercase">Offline</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-green-600">
          <p className="text-slate-400 text-xs font-bold uppercase">Selesai</p>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Nama Siswa</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Progres</th>
              <th className="px-6 py-4">Waktu</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monitoringData.map((siswa, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{siswa.name}</p>
                  <p className="text-xs text-slate-400">{siswa.nisn}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    siswa.status === 'Mengerjakan' ? 'bg-blue-100 text-blue-600' :
                    siswa.status === 'Terputus' ? 'bg-red-100 text-red-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {siswa.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${siswa.status === 'Terputus' ? 'bg-red-400' : 'bg-blue-500'}`} style={{ width: `${siswa.progress}%` }}></div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600">{siswa.timeRemaining}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Reset Login</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PengawasDashboard;
