
import React from 'react';
import { User } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Siswa Aktif', value: 850, color: '#3b82f6' },
  { name: 'Guru Aktif', value: 42, color: '#10b981' },
  { name: 'Ujian Berjalan', value: 8, color: '#f59e0b' },
];

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Panel Administrator</h2>
          <p className="text-slate-500">Mengelola aset pendidikan: {user.schoolId}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition-all">Import Excel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all">Tambah Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Statistik Pengguna</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Server Status</h4>
              <div className="space-y-6 pt-4">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-slate-500">STORAGE USAGE</span>
                    <span className="text-slate-800">42%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{width: '42%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-slate-500">ACTIVE SESSIONS</span>
                    <span className="text-slate-800">88%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-slate-500">LATENCY</span>
                    <span className="text-slate-800">24ms</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100">
               <h4 className="font-bold text-slate-800">Siswa Sedang Ujian</h4>
             </div>
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                 <tr>
                   <th className="px-6 py-3">Nama Siswa</th>
                   <th className="px-6 py-3">Ujian</th>
                   <th className="px-6 py-3">Progress</th>
                   <th className="px-6 py-3">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {[1, 2, 3].map((i) => (
                   <tr key={i} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-slate-700">Siswa Sample {i}</td>
                     <td className="px-6 py-4 text-slate-500">Matematika Dasar</td>
                     <td className="px-6 py-4">
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{width: `${30 * i}%`}}></div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600 uppercase">Online</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-6">Aksi Cepat</h4>
          <div className="grid grid-cols-1 gap-4">
            <button className="w-full p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-100 hover:bg-blue-50 transition-all flex items-center text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="font-bold text-slate-800">Reset Password</p>
                <p className="text-xs text-slate-400">Kembalikan akses akun siswa</p>
              </div>
            </button>
            <button className="w-full p-4 rounded-2xl border-2 border-slate-50 hover:border-green-100 hover:bg-green-50 transition-all flex items-center text-left">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <div>
                <p className="font-bold text-slate-800">Monitor Realtime</p>
                <p className="text-xs text-slate-400">Lihat semua ujian aktif</p>
              </div>
            </button>
            <button className="w-full p-4 rounded-2xl border-2 border-slate-50 hover:border-red-100 hover:bg-red-50 transition-all flex items-center text-left">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <p className="font-bold text-slate-800">Kunci Sistem</p>
                <p className="text-xs text-slate-400">Tutup akses login sementara</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
