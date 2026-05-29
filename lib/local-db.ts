import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'lib', 'local-db.json');

export interface Notice {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  fileUrl?: string;
  date: string;
  status: 'Published' | 'Draft';
  timestamp: string;
}

export interface Job {
  id: number;
  title: string;
  department: string;
  qualification: string;
  experience: string;
  salary?: string;
  lastDate: string;
  applyLink: string;
  status: 'Open' | 'Closed';
}

export interface Admission {
  id: number;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  message?: string;
  timestamp: string;
}

export interface GalleryItem {
  id: number;
  title: string; // Event Name
  tags: string[]; // Category/Sub-category
  image: string; // Google Drive link or direct URL
  date: string;
  type: 'photo' | 'video';
  videoUrl?: string;
  desc?: string;
}

export interface ContactQuery {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface CareerApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeLink: string;
  message?: string;
  timestamp: string;
}

export interface Settings {
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  phone: string;
  email: string;
  username?: string;
  password?: string;
}

export interface Activity {
  id: number;
  text: string;
  timestamp: string;
  type: 'admission' | 'query' | 'notice' | 'job' | 'gallery' | 'settings' | 'auth';
}

export interface DbSchema {
  notices: Notice[];
  jobs: Job[];
  admissions: Admission[];
  gallery: GalleryItem[];
  queries: ContactQuery[];
  careersApplications: CareerApplication[];
  settings: Settings;
  activities: Activity[];
}


const DEFAULT_SETTINGS: Settings = {
  instagramUrl: 'https://instagram.com/kpskorutla',
  facebookUrl: 'https://facebook.com/kpskorutla',
  youtubeUrl: 'https://youtube.com/kpskorutla',
  linkedinUrl: 'https://linkedin.com/company/kpskorutla',
  twitterUrl: 'https://twitter.com/kpskorutla',
  phone: '+91 98484 59246 / 99894 09246',
  email: 'kpskorutla@gmail.com',
  username: 'admin',
  password: 'kpsadmin123',
};

const DEFAULT_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Half-Yearly Examination Timetable Released for Grades I to X',
    description: 'The half-yearly examinations are scheduled to begin next month. Please check the detailed timetable attached below.',
    category: 'Exam',
    priority: 'High',
    fileUrl: 'https://drive.google.com/file/d/1_exam_timetable_mock/view',
    date: 'Oct 20, 2026',
    status: 'Published',
    timestamp: '2026-10-20T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'School will remain closed on Oct 24th due to Diwali Festival',
    description: 'On the auspicious occasion of Diwali, the school will remain closed. Normal classes will resume from Oct 25th.',
    category: 'Holiday',
    priority: 'Medium',
    fileUrl: '',
    date: 'Oct 18, 2026',
    status: 'Published',
    timestamp: '2026-10-18T09:00:00.000Z',
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting scheduled for coming Saturday',
    description: 'We request all parents to attend the parent-teacher meeting to discuss the academic progress of their wards.',
    category: 'Circular',
    priority: 'High',
    fileUrl: '',
    date: 'Oct 15, 2026',
    status: 'Published',
    timestamp: '2026-10-15T08:30:00.000Z',
  },
];

const DEFAULT_JOBS: Job[] = [
  {
    id: 1,
    title: 'TGT Science Teacher',
    department: 'Science',
    qualification: 'B.Ed & B.Sc/M.Sc with 3+ years experience',
    experience: '3+ Years',
    salary: 'Negotiable',
    lastDate: '2026-06-30',
    applyLink: '/careers',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Primary English Teacher',
    department: 'English',
    qualification: 'B.Ed & B.A/M.A English with 2+ years experience',
    experience: '2+ Years',
    salary: 'Negotiable',
    lastDate: '2026-06-30',
    applyLink: '/careers',
    status: 'Open',
  },
];

const DEFAULT_DB: DbSchema = {
  notices: DEFAULT_NOTICES,
  jobs: DEFAULT_JOBS,
  admissions: [],
  gallery: [],
  queries: [],
  careersApplications: [],
  settings: DEFAULT_SETTINGS,
  activities: [
    {
      id: 1,
      text: 'Database initialized successfully.',
      timestamp: new Date().toISOString(),
      type: 'settings',
    },
  ],
};

// Helper function to read the DB
export function readDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      writeDb(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    
    // Ensure all required properties exist
    return {
      notices: parsed.notices || [],
      jobs: parsed.jobs || [],
      admissions: parsed.admissions || [],
      gallery: parsed.gallery || [],
      queries: parsed.queries || [],
      careersApplications: parsed.careersApplications || [],
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      activities: parsed.activities || [],
    };
  } catch (error) {
    console.error('Error reading local JSON database:', error);
    return DEFAULT_DB;
  }
}

// Helper function to write to the DB
export function writeDb(data: DbSchema): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local JSON database:', error);
  }
}

// Activity Logging Helper
export function logActivity(text: string, type: Activity['type']): void {
  const db = readDb();
  const newActivity: Activity = {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString(),
    type,
  };
  
  db.activities.unshift(newActivity);
  
  // Keep only the last 50 activities to avoid bloat
  if (db.activities.length > 50) {
    db.activities = db.activities.slice(0, 50);
  }
  
  writeDb(db);
}
