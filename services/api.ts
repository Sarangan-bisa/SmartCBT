
// NOTE: Replace this with your deployed Google Apps Script URL
const API_URL = 'https://script.google.com/macros/s/AKfycby8kbFO_IWJln6rCNQk7SpQe_R9zcgdqTG_EDEIQkpY37i54BD3aW3pTzNStpCcmC3aGg/exec';

export const callApi = async (action: string, payload: any = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        ...payload,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    if (API_URL.includes('YOUR_SCRIPT_ID')) {
      return mockResponse(action, payload);
    }
    throw error;
  }
};

const mockResponse = (action: string, payload: any) => {
  console.warn(`NexusCBT: Mode Simulasi Aktif [${action}]`);
  
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

      if (roles[username] && password === username) {
        return {
          success: true,
          user: {
            id: 'demo-' + username,
            username: username,
            fullName: username.charAt(0).toUpperCase() + username.slice(1) + ' Demo',
            role: roles[username],
            schoolId: payload.schoolCode || 'SCH01'
          }
        };
      }
      return { success: false, message: 'Kredensial salah. Gunakan username & password yang sama (e.g. guru/guru)' };
    
    case 'getExams':
      return {
        success: true,
        exams: [
          { id: 'ex1', title: 'Ujian Tengah Semester - Matematika', subject: 'Matematika', durationMinutes: 60, status: 'published' },
          { id: 'ex2', title: 'Kuis Harian - Bahasa Inggris', subject: 'Bahasa Inggris', durationMinutes: 30, status: 'published' }
        ]
      };

    case 'getQuestions':
        return {
          success: true,
          questions: [
            { id: 'q1', text: 'Berapakah hasil dari 2 + 2?', type: 'PG', options: ['2', '3', '4', '5'], correctAnswer: '4' },
            { id: 'q2', text: 'Ibukota Indonesia adalah Jakarta.', type: 'BS', options: ['Benar', 'Salah'], correctAnswer: 'Benar' },
            { id: 'q3', text: 'Sebutkan 3 warna pelangi!', type: 'URAIAN', correctAnswer: '' }
          ]
        };

    default:
      return { success: true, message: 'Mock response executed successfully' };
  }
};
