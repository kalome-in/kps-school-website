import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = process.env.NOTICES_SHEET_URL;
    if (!url || url.includes('PASTE_YOUR_') || url.includes('/s/...')) {
      console.warn('NOTICES_SHEET_URL environment variable is missing or placeholder. Using fallback notices.');
      return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
    }

    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 60 } // Cache notices for 60 seconds (incremental static regeneration/caching)
    });

    if (!response.ok) {
      throw new Error(`Google Sheets responded with status ${response.status}`);
    }

    const responseText = await response.text();
    const cleanText = responseText.trim().toLowerCase();
    if (cleanText.startsWith('<!doctype') || cleanText.startsWith('<html')) {
      console.warn('NOTICES_SHEET_URL returned HTML instead of JSON. Ensure you did not paste a spreadsheet/form URL directly. You must deploy the Apps Script as a Web App (access: "Anyone") and use the deployed Web App URL.');
      return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
    }

    let json;
    try {
      json = JSON.parse(responseText);
    } catch (e) {
      console.warn('Failed to parse notices response as JSON. Falling back to default notices.', e);
      return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
    }

    if (json.status !== 'success') {
      throw new Error(json.message || 'Failed to fetch notices');
    }

    return NextResponse.json({ status: 'success', data: json.data });
  } catch (error: any) {
    console.error('Notices API Route Error:', error);
    return NextResponse.json({ status: 'error', data: getFallbackNotices() });
  }
}

function getFallbackNotices() {
  return [
    { id: 1, title: 'Half-Yearly Examination Timetable Released for Grades I to X', date: 'Oct 20, 2026', tag: 'Exam', fileUrl: '' },
    { id: 2, title: 'School will remain closed on Oct 24th due to Diwali Festival', date: 'Oct 18, 2026', tag: 'Holiday', fileUrl: '' },
    { id: 3, title: 'Parent-Teacher Meeting scheduled for coming Saturday', date: 'Oct 15, 2026', tag: 'Circular', fileUrl: '' },
    { id: 4, title: 'Transport fee revision for the academic year 2026-2027', date: 'Oct 10, 2026', tag: 'Admin', fileUrl: '' },
    { id: 5, title: 'Guidelines for the upcoming Science Olympiad participation', date: 'Oct 05, 2026', tag: 'Academic', fileUrl: '' },
    { id: 6, title: 'Winter uniform mandate starting from November 1st', date: 'Oct 01, 2026', tag: 'Circular', fileUrl: '' },
  ];
}
