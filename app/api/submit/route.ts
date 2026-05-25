import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Select the sheet URL based on formType
    let sheetUrl = '';
    if (body.formType === 'Admissions Inquiry') {
      sheetUrl = process.env.ADMISSIONS_SHEET_URL || '';
    } else if (body.formType === 'Contact Message') {
      sheetUrl = process.env.CONTACT_SHEET_URL || '';
    }
    
    if (!sheetUrl) {
      console.warn(`Google Sheet Apps Script URL is not configured for: ${body.formType}`);
      // Return simulated success in development environment
      return NextResponse.json({ 
        status: 'mock_success', 
        message: 'Google Sheets URL is missing. Submission simulated successfully.' 
      });
    }
    
    // Forward the POST request to the Google Apps Script Web App
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const resultText = await response.text();
    let resultJson;
    try {
      resultJson = JSON.parse(resultText);
    } catch (e) {
      resultJson = { message: resultText };
    }
    
    if (!response.ok) {
      throw new Error(`Google Sheets Apps Script responded with status ${response.status}`);
    }
    
    return NextResponse.json({ status: 'success', data: resultJson });
  } catch (error: any) {
    console.error('Submit API Route Error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
