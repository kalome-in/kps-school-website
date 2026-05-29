import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity, Notice } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchOnlyLocal = searchParams.get('local') === 'true';

    // 1. Get notices from local database
    const db = readDb();
    let localNotices = db.notices || [];

    // If fetching for admin panel, return local database notices directly (including Drafts)
    if (fetchOnlyLocal) {
      return NextResponse.json({ status: 'success', data: localNotices });
    }

    // Filter only Published notices for public view
    let publicNotices = localNotices.filter(n => n.status === 'Published');

    // 2. Read from Google Sheet URL if configured
    const url = process.env.NOTICES_SHEET_URL;
    let sheetNotices: any[] = [];

    if (url && !url.includes('PASTE_YOUR_') && !url.includes('/s/...')) {
      let fetchUrl = url;
      if (url.includes('docs.google.com/spreadsheets')) {
        const matches = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (matches && matches[1]) {
          fetchUrl = `https://docs.google.com/spreadsheets/d/${matches[1]}/export?format=csv`;
        }
      }

      try {
        const response = await fetch(fetchUrl, {
          method: 'GET',
          next: { revalidate: 15 } // Cache notices for 15 seconds in production
        });

        if (response.ok) {
          const responseText = await response.text();
          const cleanText = responseText.trim().toLowerCase();
          
          if (!cleanText.startsWith('<!doctype') && !cleanText.startsWith('<html')) {
            if (fetchUrl.includes('export?format=csv') || responseText.includes(',')) {
              sheetNotices = parseCSV(responseText);
            }
          }
        }
      } catch (err) {
        console.warn('Failed to fetch notices from Google Sheet:', err);
      }
    }

    // Merge notices: Sheet notices are added to the list if they are not already represented by title in local DB
    const localTitles = new Set(publicNotices.map(n => n.title.toLowerCase().trim()));
    const mergedNotices = [...publicNotices];

    // Format and append sheet notices
    sheetNotices.forEach((sheetNotice, index) => {
      if (!localTitles.has(sheetNotice.title.toLowerCase().trim())) {
        mergedNotices.push({
          id: 1000 + index, // Offset sheet notice IDs
          title: sheetNotice.title,
          description: sheetNotice.description || 'Announced via notice board.',
          category: sheetNotice.tag || 'Circular',
          priority: 'Medium',
          fileUrl: sheetNotice.fileUrl || '',
          date: sheetNotice.date || 'Recent',
          status: 'Published',
          timestamp: sheetNotice.timestamp || new Date().toISOString()
        });
      }
    });

    // Sort by date/timestamp descending
    mergedNotices.sort((a, b) => {
      const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
      const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({ status: 'success', data: mergedNotices });
  } catch (error: any) {
    console.error('Notices GET Route Error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = readDb();

    const newNotice: Notice = {
      id: Date.now(),
      title: body.title || '',
      description: body.description || '',
      category: body.category || 'Circular',
      priority: body.priority || 'Medium',
      fileUrl: body.fileUrl || '',
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: body.status || 'Published',
      timestamp: new Date().toISOString()
    };

    db.notices.unshift(newNotice);
    writeDb(db);
    logActivity(`Created notice: "${newNotice.title}"`, 'notice');

    // Optional Apps Script Forwarding
    await forwardToAppsScript('create', newNotice);

    return NextResponse.json({ status: 'success', data: newNotice });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = readDb();

    const index = db.notices.findIndex(n => n.id === body.id);
    if (index === -1) {
      return NextResponse.json({ status: 'error', message: 'Notice not found' }, { status: 404 });
    }

    const updatedNotice = {
      ...db.notices[index],
      title: body.title ?? db.notices[index].title,
      description: body.description ?? db.notices[index].description,
      category: body.category ?? db.notices[index].category,
      priority: body.priority ?? db.notices[index].priority,
      fileUrl: body.fileUrl ?? db.notices[index].fileUrl,
      date: body.date ?? db.notices[index].date,
      status: body.status ?? db.notices[index].status,
    };

    db.notices[index] = updatedNotice;
    writeDb(db);
    logActivity(`Updated notice: "${updatedNotice.title}"`, 'notice');

    await forwardToAppsScript('update', updatedNotice);

    return NextResponse.json({ status: 'success', data: updatedNotice });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ status: 'error', message: 'Notice ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const noticeToDelete = db.notices.find(n => n.id === id);
    if (!noticeToDelete) {
      return NextResponse.json({ status: 'error', message: 'Notice not found' }, { status: 404 });
    }

    db.notices = db.notices.filter(n => n.id !== id);
    writeDb(db);
    logActivity(`Deleted notice: "${noticeToDelete.title}"`, 'notice');

    await forwardToAppsScript('delete', { id });

    return NextResponse.json({ status: 'success', message: 'Notice deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// Forward action to Apps Script if configured
async function forwardToAppsScript(action: string, payload: any) {
  const url = process.env.NOTICES_SHEET_URL;
  if (!url || !url.startsWith('https://script.google.com/macros')) return;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, formType: 'Notices Board', ...payload })
    });
  } catch (e) {
    console.warn('Failed to forward notice write action to Apps Script Webapp:', e);
  }
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r?\n/);
  if (lines.length <= 1) return [];

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
      } else if (header.includes('desc')) {
        notice.description = val;
      }
    }

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
    if (!notice.date) notice.date = "Recent";
    if (!notice.tag) notice.tag = "Circular";

    if (notice.title) {
      notices.push(notice);
    }
  }

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
