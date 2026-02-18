
// URL Apps Script Anda. Pastikan sudah di-deploy sebagai "Web App" dan akses "Anyone".
const API_URL = 'https://script.google.com/macros/s/AKfycby8kbFO_IWJln6rCNQk7SpQe_R9zcgdqTG_EDEIQkpY37i54BD3aW3pTzNStpCcmC3aGg/exec';

export const callApi = async (action: string, payload: any = {}) => {
  try {
    // Jika URL masih default atau belum diisi, langsung ke mock
    if (!API_URL || API_URL.includes('YOUR_SCRIPT_ID')) {
      return mockResponse(action, payload);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Apps Script lebih stabil dengan text/plain pada POST
      },
      body: JSON.stringify({
        action,
        ...payload,
      }),
    });

    if (!response.ok) {
      throw new Error('Server returned error status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`SmartCBT API Error [${action}]:`, error);
    // Fallback ke mode simulasi jika terjadi error koneksi/CORS
    return mockResponse(action, payload);
  }
};

const mockResponse = (action: string, payload: any) => {
  console.warn(`SmartCBT: Menjalankan Mode Simulasi untuk aksi [${action}]`);
  
  switch (action) {
    case 'login':
      const { username, password } = payload;
      const roles: Record<string, string> = {
        'superadmin': 'super_admin',
        'admin': 'admin',
        'guru': 'guru',
        'siswa': 'siswa',
        'pengawas': 'pengawas'
      };

      // Validasi sederhana untuk demo: password harus sama dengan username
      if (roles[username.toLowerCase()] && password === username) {
        return {
          success: true,
          user: {
            id: 'demo-' + username,
            username: username.toLowerCase(),
            fullName: username.charAt(0).toUpperCase() + username.slice(1) + ' (Demo Mode)',
            role: roles[username.toLowerCase()],
            schoolId: payload.schoolCode || 'DEMO01'
          }
        };
      }
      return { 
        success: false, 
        message: 'Kredensial simulasi: gunakan username & password yang sama (contoh: siswa / siswa)' 
      };
    
    case 'getExams':
      return {
        success: true,
        exams: [
          { id: 'ex1', title: 'Ujian Tengah Semester - Matematika', subject: 'Matematika', durationMinutes: 60, status: 'published' },
          { id: 'ex2', title: 'Kuis Harian - Bahasa Inggris', subject: 'Bahasa Inggris', durationMinutes: 30, status: 'published' },
          { id: 'ex3', title: 'Ujian Akhir Semester - Fisika', subject: 'Fisika', durationMinutes: 90, status: 'published' }
        ]
      };

    case 'getQuestions':
        return {
          success: true,
          questions: [
            { id: 'q1', text: 'Berapakah hasil dari 25 x 4?', type: 'PG', options: ['80', '90', '100', '110'], correctAnswer: '100' },
            { id: 'q2', text: 'Ibukota negara Indonesia saat ini adalah Jakarta.', type: 'PG', options: ['Benar', 'Salah'], correctAnswer: 'Benar' },
            { id: 'q3', text: 'Sebutkan 3 komponen utama komputer!', type: 'PG', options: ['Monitor, Mouse, Keyboard', 'CPU, RAM, Storage', 'Windows, Office, Chrome'], correctAnswer: 'CPU, RAM, Storage' }
          ]
        };

    case 'submitExam':
      return { success: true, message: 'Jawaban simulasi berhasil disimpan' };

    default:
      return { success: true, message: 'Aksi simulasi berhasil' };
  }
};
