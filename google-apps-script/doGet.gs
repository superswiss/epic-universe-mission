// Paste this into Extensions → Apps Script for your Google Sheet
// Then Deploy → New deployment → Web app
// "Execute as": Me
// "Who has access": Anyone (or Anyone, even anonymous)

function doGet(e) {
  var SPREADSHEET_ID = 'PUT_SPREADSHEET_ID_HERE';
  var sheetName = e.parameter.sheet || 'Sheet1';
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Sheet not found: ' + sheetName }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var rows = sheet.getDataRange().getValues();
  if (rows.length === 0) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var headers = rows.shift().map(function(h) { return String(h).trim(); });
  var out = rows.map(function(r) {
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = r[i]; });
    return obj;
  });

  var json = JSON.stringify(out);
  // JSONP support if you need to bypass strict CORS: ?callback=yourFunc
  if (e.parameter.callback) {
    var body = e.parameter.callback + '(' + json + ');';
    return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
