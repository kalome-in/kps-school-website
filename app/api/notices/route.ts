import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = process.env.NOTICES_SHEET_URL;
    if (!url || url.includes('PASTE_YOUR_') || url.includes('/s/...')) {
      console.warn('NOTICES_SHEET_URL environment variable is missing or placeholder. Using fallback notices.');
      return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
    }

    let fetchUrl = url;
    if (url.includes('docs.google.com/spreadsheets')) {
      const matches = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (matches && matches[1]) {
        fetchUrl = `https://docs.google.com/spreadsheets/d/${matches[1]}/export?format=csv`;
      }
    }

    const response = await fetch(fetchUrl, {
      method: 'GET',
      next: { revalidate: 60 } // Cache notices for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Google Sheets responded with status ${response.status}`);
    }

    const responseText = await response.text();
    const cleanText = responseText.trim().toLowerCase();
    
    // If it is HTML, it means the sheet is probably not shared publicly
    if (cleanText.startsWith('<!doctype') || cleanText.startsWith('<html') || cleanText.startsWith('<script')) {
      console.warn('NOTICES_SHEET_URL returned HTML instead of CSV/JSON. If using a direct Google Sheet link, please make sure you changed the sharing settings to "Anyone with the link can view".');
      return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
    }

    let notices: any[] = [];
    if (fetchUrl.includes('export?format=csv') || responseText.includes(',')) {
      // Parse as CSV
      notices = parseCSV(responseText);
    } else {
      // Try parsing as JSON (fallback for old Apps Script if they still use it)
      try {
        const json = JSON.parse(responseText);
        notices = json.status === 'success' ? json.data : getFallbackNotices();
      } catch (e) {
        console.warn('Failed to parse notices response. Falling back to default notices.', e);
        return NextResponse.json({ status: 'mock_success', data: getFallbackNotices() });
      }
    }

    return NextResponse.json({ status: 'success', data: notices });
  } catch (error: any) {
    console.error('Notices API Route Error:', error);
    return NextResponse.json({ status: 'error', data: getFallbackNotices() });
  }
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r?\n/);
  if (lines.length <= 1) return [];

  // Parse headers
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const notices: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const notice: any = { id: i };

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const val = values[j] || '';

      if (header.includes('timestamp')) {
        notice.timestamp = val;
      } else if (header.includes('title') || header.includes('announcement') || header.includes('notice')) {
        notice.title = val;
      } else if (header.includes('tag') || header.includes('category')) {
        notice.tag = val;
      } else if (header.includes('link') || header.includes('file') || header.includes('pdf') || header.includes('attachment')) {
        notice.fileUrl = val;
      }
    }

    // Post-process date format from Timestamp
    if (notice.timestamp) {
      const dateObj = new Date(notice.timestamp);
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

  // Sort by timestamp desc
  notices.sort((a, b) => {
    const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
    const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return notices;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(v => v.replace(/^"|"$/g, '').trim());
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
