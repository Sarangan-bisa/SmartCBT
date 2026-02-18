
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, Question } from '../types';
import { callApi } from '../services/api';

interface ExamViewProps {
  user: User;
  examId: string;
  onExit: () => void;
}

const ExamView: React.FC<ExamViewProps> = ({ user, examId, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour mock
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [violations, setViolations] = useState(0);
  const examContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await callApi('getQuestions', { examId });
        if (res.success) {
          setQuestions(res.questions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
    
    // Prevent Refresh / Exit
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Data akan hilang jika Anda meninggalkan halaman ini.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Anti-Cheat: Tab Switch Detection
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setViolations(v => v + 1);
        alert('PERINGATAN: Jangan meninggalkan halaman ujian! Pelanggaran dicatat.');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Anti-Cheat: Right Click & Keyboard lock
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Print, Save, Inspect Element (Ctrl+Shift+I, F12), etc.
      if (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
        e.preventDefault();
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectAnswer = (qId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (confirm('Apakah Anda yakin ingin mengakhiri ujian? Semua jawaban akan dikirim.')) {
      setIsSubmitting(true);
      try {
        await callApi('submitExam', { 
          examId, 
          userId: user.id, 
          answers,
          violations 
        });
        alert('Ujian berhasil dikumpulkan! Terima kasih.');
        onExit();
      } catch (err) {
        alert('Gagal mengumpulkan. Coba periksa koneksi internet Anda.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      examContainerRef.current?.requestFullscreen().catch(err => {
        alert(`Gagal masuk mode layar penuh: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p className="text-slate-600 font-bold">Mempersiapkan Lembar Jawaban...</p>
    </div>
  );

  const currentQuestion = questions[currentIdx];
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={examContainerRef} className="min-h-screen flex flex-col bg-slate-100 select-none">
      {/* Exam Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="https://iili.io/FGx55hP.png" alt="Logo" className="w-12 h-12 object-contain" />
          <div>
            <h2 className="font-bold text-slate-800 leading-tight tracking-tight">SmartCBT: Ujian Aktif</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user.fullName} • {user.schoolId}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Sisa Waktu</span>
            <div className={`font-mono font-bold text-xl ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Toggle Fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50"
            >
              Selesai Ujian
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Violation Indicator */}
        {violations > 0 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl animate-bounce">
            Terdeteksi {violations}x Kecurangan
          </div>
        )}

        {/* Main Panel */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Soal {currentIdx + 1} dari {questions.length}
                </span>
                <span className="text-slate-400 text-xs font-semibold">Tipe: {currentQuestion?.type === 'PG' ? 'Pilihan Ganda' : 'Esai'}</span>
              </div>

              <div className="text-xl text-slate-800 leading-relaxed mb-12 font-medium">
                {currentQuestion?.text}
              </div>

              <div className="space-y-4">
                {currentQuestion?.options?.map((opt, i) => (
                  <label 
                    key={i} 
                    className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 group ${answers[currentQuestion.id] === opt ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20' : 'hover:bg-slate-50 border-slate-100'}`}
                  >
                    <input 
                      type="radio" 
                      className="hidden" 
                      name={`q-${currentQuestion.id}`}
                      checked={answers[currentQuestion.id] === opt}
                      onChange={() => handleSelectAnswer(currentQuestion.id, opt)}
                    />
                    <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center mr-5 transition-all font-bold ${answers[currentQuestion.id] === opt ? 'border-blue-600 bg-blue-600 text-white shadow-lg' : 'border-slate-200 text-slate-400 group-hover:border-slate-400'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={`font-semibold text-lg ${answers[currentQuestion.id] === opt ? 'text-blue-900' : 'text-slate-600'}`}>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-100">
                <button 
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="flex items-center px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl disabled:opacity-30 hover:bg-slate-200 transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  Sebelumnya
                </button>
                <button 
                  disabled={currentIdx === questions.length - 1}
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl disabled:opacity-30 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Berikutnya
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Navigation Sidebar */}
        <aside className="w-full md:w-96 bg-white border-l border-slate-200 p-8 flex flex-col h-full sticky top-0 overflow-y-auto">
          <div className="mb-10">
            <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center">
              <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              Navigasi Soal
            </h4>
            <p className="text-xs text-slate-400 font-medium">Klik nomor soal untuk berpindah dengan cepat.</p>
          </div>
          
          <div className="grid grid-cols-5 gap-3 mb-10">
            {questions.map((q, idx) => (
              <button 
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-full aspect-square flex items-center justify-center rounded-2xl font-bold transition-all border-2 text-sm ${currentIdx === idx ? 'border-blue-600 bg-blue-50 text-blue-600 scale-105 shadow-md' : answers[q.id] ? 'bg-green-500 border-green-500 text-white shadow-sm' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Legend</h5>
            <div className="flex items-center text-xs font-bold text-slate-600">
              <div className="w-4 h-4 rounded-md bg-green-500 mr-3 shadow-sm"></div> Sudah Terjawab
            </div>
            <div className="flex items-center text-xs font-bold text-slate-600">
              <div className="w-4 h-4 rounded-md bg-blue-50 border-2 border-blue-600 mr-3 shadow-sm"></div> Soal Aktif
            </div>
            <div className="flex items-center text-xs font-bold text-slate-600">
              <div className="w-4 h-4 rounded-md bg-slate-100 mr-3 shadow-sm"></div> Belum Terjawab
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamView;
