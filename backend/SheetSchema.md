
# Google Sheets Database Structure

Buat Spreadsheet baru dan buat sheet dengan nama-nama berikut (Case Sensitive):

### 1. Schools
Kolom: `id`, `name`, `code`, `active`

### 2. Users
Kolom: `id`, `username`, `password`, `fullName`, `schoolCode`, `role` (admin, guru, siswa, pengawas)

### 3. Exams
Kolom: `id`, `title`, `subject`, `startTime`, `durationMinutes`, `schoolId`, `teacherId`, `status`

### 4. Questions
Kolom: `id`, `examId`, `text`, `type`, `options` (JSON string), `correctAnswer`

### 5. Responses
Kolom: `timestamp`, `userId`, `examId`, `answers` (JSON string), `status`

### 6. Logs
Kolom: `timestamp`, `userId`, `action`, `details`, `schoolId`
