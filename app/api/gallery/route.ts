import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity, GalleryItem } from '@/lib/local-db';
import { GALLERY_ITEMS } from '@/app/data/gallery-data';
import { checkAuth } from '@/lib/auth-helper';

// Helper to convert Google Drive share link to direct image link
function parseGoogleDriveLink(url: string): string {
  if (!url) return '';
  
  // Handle drive.google.com/file/d/FILE_ID/view
  const fileDMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileDMatch[1]}`;
  }

  // Handle drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }

  return url;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchOnlyLocal = searchParams.get('local') === 'true';

    const db = readDb();
    const dbItems = db.gallery || [];

    // Parse and clean Drive links for DB items
    const parsedDbItems = dbItems.map(item => ({
      ...item,
      image: parseGoogleDriveLink(item.image),
      fallback: '/images/hero_banner.jpg'
    }));

    if (fetchOnlyLocal) {
      return NextResponse.json({ status: 'success', data: parsedDbItems });
    }

    // Merge static default gallery items with custom uploaded dashboard items
    // Custom database uploads are placed first
    const mergedGallery = [...parsedDbItems, ...GALLERY_ITEMS];

    return NextResponse.json({ status: 'success', data: mergedGallery });
  } catch (error: any) {
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

    const newImage: GalleryItem = {
      id: Date.now(),
      title: body.title || 'Event Photo', // Event Name
      tags: Array.isArray(body.tags) ? body.tags : [body.category || 'Activities'], // Category
      image: parseGoogleDriveLink(body.image || ''), // Google Drive Image Link
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: body.type || 'photo',
      videoUrl: body.videoUrl || '',
      desc: body.desc || ''
    };

    db.gallery.unshift(newImage);
    writeDb(db);
    logActivity(`Added image to gallery: "${newImage.title}"`, 'gallery');

    return NextResponse.json({ status: 'success', data: newImage });
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

    const index = db.gallery.findIndex(g => g.id === body.id);
    if (index === -1) {
      return NextResponse.json({ status: 'error', message: 'Gallery item not found' }, { status: 404 });
    }

    const updatedItem = {
      ...db.gallery[index],
      title: body.title ?? db.gallery[index].title,
      tags: Array.isArray(body.tags) ? body.tags : (body.category ? [body.category] : db.gallery[index].tags),
      image: body.image ? parseGoogleDriveLink(body.image) : db.gallery[index].image,
      date: body.date ?? db.gallery[index].date,
      type: body.type ?? db.gallery[index].type,
      videoUrl: body.videoUrl ?? db.gallery[index].videoUrl,
      desc: body.desc ?? db.gallery[index].desc,
    };

    db.gallery[index] = updatedItem;
    writeDb(db);
    logActivity(`Updated gallery item: "${updatedItem.title}"`, 'gallery');

    return NextResponse.json({ status: 'success', data: updatedItem });
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
      return NextResponse.json({ status: 'error', message: 'Item ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const itemToDelete = db.gallery.find(g => g.id === id);
    if (!itemToDelete) {
      return NextResponse.json({ status: 'error', message: 'Gallery item not found' }, { status: 404 });
    }

    db.gallery = db.gallery.filter(g => g.id !== id);
    writeDb(db);
    logActivity(`Deleted gallery item: "${itemToDelete.title}"`, 'gallery');

    return NextResponse.json({ status: 'success', message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
