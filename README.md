<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Korutla Public School Website

An interactive, premium, and fully responsive school portal and administrative dashboard built using **Next.js 15 (App Router)** and **TailwindCSS**. The website showcases Korutla Public School's (KPS) academic curriculum, world-class facilities, latest notice announcements, and a comprehensive structured visual archive of school memories.

---

## 🚀 Key Features

* **Advanced Curriculum Explorers**: Detailed learning paths for **Pre-Primary** (Pearson Pinnacle+), **Primary** (LEAD School System), and **High School** (Spectropy IIT-NEET Academy).
* **Interactive Notice Board**: A dynamically updated notices panel connected to a Google Sheets backend API `/api/notices` with real-time searching and categorizing.
* **Cinematic Media Gallery**:
  * **Categorized Photo & Video Grid**: Easily browse through events: *Annual Day*, *Festivals*, *Achievements*, *Activities*, *Campus Life*, and *Sports*.
  * **Dynamic Album Filters**: Sub-filters dynamically generated based on active tags (e.g. Abacus, Softball, specific festivals) to prevent empty categories.
  * **Preserved Video Archives**: Actual YouTube recordings of students' festival performances and party assemblies.
* **Wall of Fame & Newspaper Clippings**: Celebrating school toppers, national softball and math olympiad rankers, with categorized scans of press releases.
* **Gated Security & Infrastructure Panel**: Visual walkthrough of science labs, computer hubs, digital library, and safe school bus transits.

---

## 📂 Project Architecture

```bash
├── app/
│   ├── academics/           # Academic level details (pre-primary, primary, high-school)
│   ├── admissions/          # Admissions request form
│   ├── api/                 # Backend API handlers (Notices Google Sheets integration)
│   ├── data/                # Typed database configurations
│   │   ├── gallery-data.ts        # Consolidation & topper info
│   │   └── gallery-data-local.ts  # 291 organized local images & clipping records
│   ├── gallery/             # Main gallery layout with dynamic filters and lightbox
│   ├── layout.tsx           # Base site structure, Navbar & Footer components
│   └── page.tsx             # Interactive landing page and stats infographic
├── components/              # Reusable React components (FacilitiesExplorer, NoticeBoard, Gallery)
├── public/                  # Static assets
│   └── images/
│       └── gallery/         # Lowercase-kebabcase organized image files
└── next.config.ts           # Next.js configurations
```

---

## 🛠️ Getting Started & Run Locally

### Prerequisites
Make sure you have **Node.js 18+** installed.

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add the following sheet variables for notice synchronization (optional fallback data is used if missing):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NOTICES_SHEET_URL=your_google_sheets_csv_export_url_here
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📸 Media Gallery Asset Management

All image assets must follow a lowercase-kebabcase folder and file naming structure under `public/images/gallery/` to stay organized:
- **Abacus**: `public/images/gallery/abacus/abacus-x.jpg`
- **Annual Day**: `public/images/gallery/annual-day-2025/annual-day-2025-x.jpg`
- **Sports Events**: `public/images/gallery/sports/kho-kho-and-kabbadi/image-x.jpg`
- **Press Clippings**: `public/images/gallery/seen-on-newspaper/` (grouped by event name, e.g. `vanaja-national-baseball-x.jpg`)

To avoid caching and offline build errors:
* All mock URLs (e.g. `picsum.photos`) have been removed from fallbacks.
* Remote image permissions are limited to Unsplash (`images.unsplash.com` for generic icons) and YouTube (`img.youtube.com`/`i.ytimg.com` for video previews).

---

## 📦 Deployment & Production Build

To test production optimizations or build static files:
```bash
npm run build
npm run start
```
The project uses the `standalone` Next.js output mode, optimized for containerized environments.
