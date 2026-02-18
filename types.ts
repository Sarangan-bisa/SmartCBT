
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  GURU = 'guru',
  SISWA = 'siswa',
  PENGAWAS = 'pengawas'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  schoolId: string;
  token?: string;
  lastLogin?: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export interface Question {
  id: string;
  examId: string;
  type: 'PG' | 'MCMA' | 'BS' | 'URAIAN' | 'MATCHING' | 'CATEGORY';
  text: string;
  options?: string[]; // JSON string or array
  correctAnswer: any;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  token: string;
  schoolId: string;
  teacherId: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed';
}

export interface ExamSession {
  id: string;
  examId: string;
  userId: string;
  schoolId: string;
  startTime: string;
  status: 'started' | 'submitted' | 'expired';
  answers: Record<string, any>;
  progress: number;
}
