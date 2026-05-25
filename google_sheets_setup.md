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
    // Session.getActiveUser().getEmail() automatically fetches the email of the account owning the sheet
    var emailRecipient = Session.getActiveUser().getEmail() || "your-school-email@gmail.com";
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
```

Once configured, the forms will securely submit to your Google Sheets and send email notifications directly to your inbox! If these environment variables are absent, the form will cleanly simulate success in development without raising errors.
