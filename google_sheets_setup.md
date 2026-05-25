# KPS Website - Google Sheets & Notifications Setup Guide

This guide details how to connect the **Admissions Inquiry**, **Contact Inquiry**, and **Careers Application** forms to your Google Sheets and set up automatic email notifications.

---

## 📅 Step 1: Create your Google Sheets

1. Go to [Google Sheets](https://sheets.google.com) and create **three separate spreadsheets**:
   - One for **Admissions Inquiries** (e.g., named "KPS Admissions Inquiries").
   - One for **Contact Messages** (e.g., named "KPS Contact Messages").
   - One for **Careers Applications** (e.g., named "KPS Careers Applications").
2. In the first row of each sheet, you don't need to write headers manually. The script below will automatically create headers based on the form fields on the first submission!

---

## ✍️ Step 2: Set up the Google Apps Script

Follow these steps for **each** of the three sheets:

1. Open your Google Sheet.
2. In the top menu, go to **Extensions** $\rightarrow$ **Apps Script**.
3. Delete any code in the editor (`Code.gs`) and paste the following script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming form payload
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add header row dynamically if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }
    
    // Build row values
    var row = Object.keys(data).map(function(key) { return data[key]; });
    sheet.appendRow(row);
    
    // Send Email Notification
    // Defaults to the school's admin email; falls back to the sheet owner's email if needed
    var emailRecipient = "kpskorutla@gmail.com"; 
    var subject = "New Website Submission: " + (data.formType || "Inquiry");
    
    // Format the email body
    var body = "Hi KPS Administration,\n\nYou have received a new form submission:\n\n" + 
               Object.keys(data).map(function(key) {
                 return "• " + key.toUpperCase() + ": " + data[key];
               }).join("\n") + 
               "\n\nThis row has been appended to your Google Sheet.\n\nRegards,\nKPS Web Bot";
    
    MailApp.sendEmail(emailRecipient, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Successfully saved to sheet and email sent!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🚀 Step 3: Deploy the Script as a Web App

For the website to communicate with your Apps Script, you must deploy it:

1. In the Apps Script editor, click the blue **Deploy** button in the top right and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the settings:
   - **Description**: `KPS Website Form Webhook`
   - **Execute as**: `Me (your-gmail-account)`
   - **Who has access**: `Anyone` *(Crucial: This allows the secure Next.js API server to push data to the sheet)*
4. Click **Deploy**.
5. Google will ask you to authorize permissions. Click **Authorize access**, select your Google account, click **Advanced**, and then click **Go to Untitled project (unsafe)** to grant the necessary Sheets and Mail permissions.
6. Copy the **Web App URL** provided (it will look like `https://script.google.com/macros/s/.../exec`).

---

## ⚙️ Step 4: Configure environment variables

In the hosting environment of your website (or in your local `.env` / `.env.local` file), paste the respective URLs:

```env
# Google Sheets Webhook Apps Script URLs
ADMISSIONS_SHEET_URL="PASTE_YOUR_ADMISSIONS_WEB_APP_URL_HERE"
CONTACT_SHEET_URL="PASTE_YOUR_CONTACT_WEB_APP_URL_HERE"
CAREERS_SHEET_URL="PASTE_YOUR_CAREERS_WEB_APP_URL_HERE"
NOTICES_SHEET_URL="PASTE_YOUR_NOTICES_WEB_APP_URL_HERE"
```

Once configured, the forms will securely submit to your Google Sheets and send email notifications directly to your inbox! If these environment variables are absent, the form will cleanly simulate success in development without raising errors.

---

## 📢 Notice Board Setup (Google Forms & Sheets Integration)

The Notice Board can display announcements updated dynamically via a Google Form. Since we want to read data *from* the spreadsheet rather than writing *to* it, the Apps Script setup uses a `doGet(e)` function instead of `doPost(e)`.

### 📅 Step 1: Create your Google Form and Sheet
1. Create a new Google Form (e.g. named "KPS Notice Board Portal").
2. Add the following fields to your form:
   - **Notice Title / Announcement** (Short Answer or Paragraph, e.g. "School will remain closed on Oct 24th due to Diwali Festival")
   - **Category / Tag** (Dropdown or Multiple Choice, with options: `Exam`, `Holiday`, `Circular`, `Admin`, `Academic`)
   - **Attachment / PDF Link** (Optional: File upload or Link URL for notice PDFs)
3. Go to the **Responses** tab of your Google Form, click **Link to Sheets**, and create a new spreadsheet (e.g. named "KPS Notices (Responses)").

### ✍️ Step 2: Set up the doGet Google Apps Script
1. Open the linked spreadsheet.
2. Go to **Extensions** $\rightarrow$ **Apps Script**.
3. Clear the editor and paste the following script:

```javascript
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: [] }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*');
    }
    
    var headers = rows[0].map(function(h) { return h.toString().trim().toLowerCase(); });
    var notices = [];
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var notice = { id: i };
      
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        var val = row[j];
        
        if (header.indexOf('timestamp') !== -1) {
          notice.timestamp = val;
        } else if (header.indexOf('title') !== -1 || header.indexOf('announcement') !== -1 || header.indexOf('notice') !== -1) {
          notice.title = val;
        } else if (header.indexOf('tag') !== -1 || header.indexOf('category') !== -1) {
          notice.tag = val;
        } else if (header.indexOf('link') !== -1 || header.indexOf('file') !== -1 || header.indexOf('pdf') !== -1 || header.indexOf('attachment') !== -1) {
          notice.fileUrl = val;
        }
      }
      
      // Post-process date format from Timestamp
      if (notice.timestamp) {
        var dateObj = new Date(notice.timestamp);
        if (!isNaN(dateObj.getTime())) {
          notice.date = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          });
        }
      }
      if (!notice.date) {
        notice.date = "Recent";
      }
      if (!notice.tag) {
        notice.tag = "Circular";
      }
      
      if (notice.title) {
        notices.push(notice);
      }
    }
    
    // Sort by timestamp descending (newest first)
    notices.sort(function(a, b) {
      var dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
      var dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
      return dateB - dateA;
    });
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: notices }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 🚀 Step 3: Deploy the Script
1. Click **Deploy** $\rightarrow$ **New deployment** in the top right.
2. Select type **Web app**.
3. Choose **Execute as: Me** and **Who has access: Anyone**.
4. Deploy and copy the Web App URL.

### ⚙️ Step 4: Configure the Environment Variable
Paste the copied Web App URL in your local `.env` or `.env.local` file:
```env
NOTICES_SHEET_URL="PASTE_YOUR_NOTICES_WEB_APP_URL_HERE"
```
