
/**
 * SmartCBT Backend Core
 * Deploy as a Web App with access 'Anyone'
 */

const SS_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  const request = JSON.parse(e.postData.contents);
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
        return response({ success: false, message: 'Invalid Action' });
    }
  } catch (err) {
    return response({ success: false, message: err.toString() });
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
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName('Users');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[1] == username && row[2] == password && row[4] == schoolCode) {
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
  return { success: false, message: 'Invalid credentials or school code' };
}

function getExams(schoolId) {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName('Exams');
  const data = sheet.getDataRange().getValues();
  const exams = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5] == schoolId && data[i][7] == 'published') {
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
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName('Questions');
  const data = sheet.getDataRange().getValues();
  const questions = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] == examId) {
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
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName('Responses');
  sheet.appendRow([
    new Date(),
    payload.userId,
    payload.examId,
    JSON.stringify(payload.answers),
    'submitted'
  ]);
  return { success: true };
}
