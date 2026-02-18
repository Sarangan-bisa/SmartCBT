
/**
 * SmartCBT Backend Core
 * Deploy as a Web App with access 'Anyone'
 */

const SS_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  return ContentService.createTextOutput("SmartCBT API is Active").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  let request;
  try {
    request = JSON.parse(e.postData.contents);
  } catch (err) {
    return response({ success: false, message: 'Invalid JSON body' });
  }

  const action = request.action;
  
  try {
    switch (action) {
      case 'login':
        return response(handleLogin(request));
      case 'getExams':
        return response(getExams(request.schoolId));
      case 'getQuestions':
        return response(getQuestions(request.examId));
      case 'submitExam':
        return response(submitExam(request));
      default:
        return response({ success: false, message: 'Invalid Action: ' + action });
    }
  } catch (err) {
    return response({ success: false, message: 'Server Error: ' + err.toString() });
  }
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 
 * Multi-Tenant Data Retrieval 
 */
function handleLogin(payload) {
  const { username, password, schoolCode } = payload;
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('Users');
  if (!sheet) return { success: false, message: 'Sheet "Users" not found' };

  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // Pastikan perbandingan menggunakan string untuk menghindari error tipe data
    if (String(row[1]) === String(username) && String(row[2]) === String(password) && String(row[4]) === String(schoolCode)) {
      return {
        success: true,
        user: {
          id: row[0],
          username: row[1],
          fullName: row[3],
          role: row[5],
          schoolId: row[4]
        }
      };
    }
  }
  return { success: false, message: 'Username, password, atau kode sekolah salah.' };
}

function getExams(schoolId) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('Exams');
  if (!sheet) return { success: false, message: 'Sheet "Exams" not found' };

  const data = sheet.getDataRange().getValues();
  const exams = [];
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][5]) === String(schoolId) && data[i][7] === 'published') {
      exams.push({
        id: data[i][0],
        title: data[i][1],
        subject: data[i][2],
        durationMinutes: data[i][4],
        status: data[i][7]
      });
    }
  }
  return { success: true, exams };
}

function getQuestions(examId) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('Questions');
  if (!sheet) return { success: false, message: 'Sheet "Questions" not found' };

  const data = sheet.getDataRange().getValues();
  const questions = [];
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]) === String(examId)) {
      questions.push({
        id: data[i][0],
        text: data[i][2],
        type: data[i][3],
        options: data[i][4] ? JSON.parse(data[i][4]) : [],
        correctAnswer: data[i][5]
      });
    }
  }
  return { success: true, questions };
}

function submitExam(payload) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('Responses');
  if (!sheet) return { success: false, message: 'Sheet "Responses" not found' };

  sheet.appendRow([
    new Date(),
    payload.userId,
    payload.examId,
    JSON.stringify(payload.answers),
    'submitted'
  ]);
  return { success: true };
}
