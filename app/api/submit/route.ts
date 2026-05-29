import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/local-db';

// Simple helper to send emails via Resend API
async function sendEmailNotification(formType: string, data: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'kpskorutla@gmail.com';
  
  // Format the email body as HTML
  const emailContent = `
    <h2>New Website Submission: ${formType}</h2>
    <p>Hi KPS Administration,</p>
    <p>You have received a new form submission on the school portal:</p>
    <table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #eee; font-family: sans-serif;">
      <tbody>
        ${Object.entries(data)
          .map(([key, val]) => `
            <tr>
              <td style="font-weight: bold; background: #f9f9f9; text-transform: uppercase; font-size: 11px; color: #555;">${key}</td>
              <td style="font-size: 14px;">${val}</td>
            </tr>
          `)
          .join('')}
      </tbody>
    </table>
    <p>This entry has been saved in the Admin Dashboard database.</p>
    <p>Regards,<br>KPS Web Bot</p>
  `;

  if (!apiKey || apiKey.includes('YOUR_RESEND_API_KEY')) {
    console.log('--- [MOCK EMAIL SENT] ---');
    console.log(`To: ${adminEmail}`);
    console.log(`Subject: New Website Submission: ${formType}`);
    console.log(`Content:\n`, emailContent.replace(/<[^>]*>/g, ''));
    console.log('-------------------------');
    return { status: 'mock_sent', message: 'Email simulated successfully (RESEND_API_KEY is not configured)' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'KPS Admin Portal <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Website Submission: ${formType}`,
        html: emailContent,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API responded with status ${response.status}: ${errText}`);
    }

    const resJson = await response.json();
    console.log('Email sent successfully via Resend:', resJson.id);
    return { status: 'sent', id: resJson.id };
  } catch (error: any) {
    console.error('Failed to send email notification:', error);
    return { status: 'failed', error: error.message };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, ...formData } = body;
    
    if (!formType) {
      return NextResponse.json({ status: 'error', message: 'formType is required' }, { status: 400 });
    }

    // 1. SAVE TO LOCAL DATABASE
    const db = readDb();
    const id = Date.now();
    const timestamp = new Date().toISOString();
    
    if (formType === 'Admissions Inquiry') {
      const newAdmission = {
        id,
        parentName: formData.parentName || '',
        studentName: formData.studentName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        grade: formData.grade || '',
        message: formData.message || '',
        timestamp: formData.timestamp || timestamp
      };
      db.admissions.unshift(newAdmission);
      logActivity(`New admissions inquiry for student: ${newAdmission.studentName} (Grade: ${newAdmission.grade})`, 'admission');
      writeDb(db);
    } 
    else if (formType === 'Contact Message') {
      const newQuery = {
        id,
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        message: formData.message || '',
        timestamp: formData.timestamp || timestamp,
        read: false
      };
      db.queries.unshift(newQuery);
      logActivity(`New website contact message from: ${newQuery.name}`, 'query');
      writeDb(db);
    } 
    else if (formType === 'Careers Application') {
      const newApplication = {
        id,
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        position: formData.position || '',
        experience: formData.experience || '',
        resumeLink: formData.resumeLink || '',
        message: formData.message || '',
        timestamp: formData.timestamp || timestamp
      };
      db.careersApplications.unshift(newApplication);
      logActivity(`New career application from: ${newApplication.name} for position: ${newApplication.position}`, 'job');
      writeDb(db);
    }

    // 2. FORWARD TO GOOGLE SHEETS WEBHOOK (IF CONFIGURED)
    let sheetUrl = '';
    if (formType === 'Admissions Inquiry') {
      sheetUrl = process.env.ADMISSIONS_SHEET_URL || '';
    } else if (formType === 'Contact Message') {
      sheetUrl = process.env.CONTACT_SHEET_URL || '';
    } else if (formType === 'Careers Application') {
      sheetUrl = process.env.CAREERS_SHEET_URL || '';
    }

    let sheetsStatus = 'skipped';
    let sheetsMessage = 'Google Sheets URL not configured';

    if (sheetUrl && !sheetUrl.includes('PASTE_YOUR_') && !sheetUrl.includes('/s/...')) {
      try {
        const response = await fetch(sheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const resultText = await response.text();
        sheetsStatus = response.ok ? 'success' : 'failed';
        sheetsMessage = `Sheets responded with: ${resultText}`;
      } catch (err: any) {
        console.error(`Google Sheets webhook error for ${formType}:`, err);
        sheetsStatus = 'failed';
        sheetsMessage = err.message;
      }
    }

    // 3. SEND EMAIL AUTOMATION (Resend/Mock)
    const emailResult = await sendEmailNotification(formType, formData);

    return NextResponse.json({
      status: 'success',
      savedLocally: true,
      sheets: { status: sheetsStatus, message: sheetsMessage },
      email: emailResult
    });

  } catch (error: any) {
    console.error('Submit API Route Error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
