
import React, { useState, useEffect } from 'react';
import { User, Exam } from '../../types';
import { callApi } from '../../services/api';

interface SiswaDashboardProps {
  user: User;
  onStartExam: (examId: string) => void;
}

const SiswaDashboard: React.FC<SiswaDashboardProps> = ({ user, onStartExam }) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await callApi('getExams', { schoolId: user.schoolId });
        if (res.success) {
          setExams(res.exams);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-2">Halo, {user.fullName}! 👋</h3>
        <p className="opacity-90">Selamat datang kembali di portal ujian NexusCBT. Periksa jadwal ujianmu hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Ujian Tersedia</div>
          <div className="text-3xl font-bold text-slate-800">{exams.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Sudah Dikerjakan</div>
          <div className="text-3xl font-bold text-slate-800">12</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Rata-rata Nilai</div>
          <div className="text-3xl font-bold text-slate-800">88.4</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-lg">Jadwal Ujian Aktif</h4>
          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold">Online</span>
        </div>
        
        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-10 text-center text-slate-400">Memuat data ujian...</div>
          ) : exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="mb-4 md:mb-0">
                  <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{exam.title}</h5>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {exam.durationMinutes} Menit</span>
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Terbuka Sampai 17:00</span>
                  </div>
                </div>
                <button 
                  onClick={() => onStartExam(exam.id)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  Kerjakan
                </button>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400">Tidak ada ujian aktif saat ini.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiswaDashboard;
