# Portfolio Website Customization Guide

This project is a duplicate of an existing portfolio website. Your job is to customize it for **Alwan** (the owner's brother). The architecture, admin panel, and backend are fully built and working. You only need to **replace Suheer's personal content with Alwan's content** and **set up fresh deployment infrastructure**.

---

## PROJECT ARCHITECTURE

This is a monorepo with three parts:

```
alwan_portfolio/
├── client/          # Static portfolio website (HTML/CSS/JS, no framework)
├── server/          # Node.js/Express REST API + MongoDB
├── admin/           # React admin panel (Vite + React Router)
├── package.json     # Root-level dev scripts
└── .gitignore
```

### How it works

1. `client/data.js` contains static portfolio data as a `PORTFOLIO` object (fallback data)
2. `client/api.js` abstracts data fetching - tries the backend API first, falls back to `PORTFOLIO` data from `data.js` if the server is unreachable
3. `client/script.js` renders all sections into the DOM from the data layer
4. `server/` is an Express API with MongoDB (Mongoose) that stores all content
5. `admin/` is a React SPA that lets the owner CRUD all content via the API
6. `server/seed.js` seeds the database with initial data from hardcoded objects

The portfolio works without the backend (using static fallback data), but the admin panel and dynamic updates require the backend + MongoDB.

---

## WHAT NEEDS TO CHANGE

### Phase 1: Content Replacement (Must Do)

You need to get Alwan's information from the user for ALL of the following. Do NOT make up content - ask the user for every detail.

#### 1. `client/data.js` - Static Fallback Data
Replace the entire `PORTFOLIO` object with Alwan's info:
- **personal**: full name, short name, title/role, email, phone, location, GitHub URL, LinkedIn URL, resume filename
- **hero**: greeting text, title (supports `<em>` tags for italic emphasis words), subtitle
- **stats**: array of `{number, label}` objects (e.g. "5+" / "Years Experience")
- **about**: badge text, title (supports `<em>`), subtitle, paragraphs array
- **projects**: each needs title, tag, tagColor (orange/green/purple/pink/cyan), description, tech array, github URL, gradient CSS, icon (layers/cart/store or custom)
- **skillCategories**: array of categories, each with title and items `{name, logo, invert?}`. Logos can be CDN URLs (see devicons pattern below) or local SVG paths
- **journey**: array of `{title, place, description}` for experience/education
- **testimonials**: array of `{quote, name, role, avatar}`

**Logo URL pattern** for common tech:
```
https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/TECH/TECH-original.svg
```
Examples: `flutter/flutter-original.svg`, `react/react-original.svg`, `python/python-original.svg`

For technologies without CDN logos, create custom SVGs in `client/assets/logos/`. The current project has custom SVGs for: bloc, provider, riverpod, getx, stacked, mobx, api, websocket. Keep or remove these based on Alwan's tech stack.

#### 2. `server/seed.js` - Database Seed Data
This file contains the SAME data as `data.js` but with `order` fields added. Update it to match whatever you put in `data.js`. The seed data structure mirrors `data.js` exactly, with these additions:
- Stats, projects, skillCategories, journey, testimonials each get `order: 0, 1, 2...`
- Personal `resumeUrl` should be `"/api/resume"` (not a filename)

#### 3. `client/index.html` - HTML Shell
Replace these Suheer-specific items:
- `<title>` tag (line 6): e.g. "Alwan | Web Developer"
- `<meta name="description">` (line 7)
- Nav logo text `SK` (line 17): Change to Alwan's initials
- Footer logo text `SK` (line 143): Same initials
- Footer copyright `Suheer Khan` (line 158)

#### 4. `server/models/SiteSettings.js` - Default Settings
Update the default values:
- `footerText`: Change from `'Suheer Khan. All rights reserved.'`
- `seoTitle`: Change from `'Suheer Khan | Flutter Developer'`
- `seoDescription`: Change from Suheer's description
- `accentColor`: Keep `#00e5ff` or change if Alwan wants a different accent

#### 5. `admin/src/components/Layout.jsx` - Admin Sidebar Header
Change `SK` to Alwan's initials on line 28.

#### 6. `client/style.css` - Design Variables (Optional)
The current design uses:
- `--accent: #00e5ff` (cyan accent color)
- `--bg-primary: #050505` (near-black background)
- Dark theme with glass-morphism cards

Only change if Alwan wants a different color scheme. The accent color can also be changed dynamically from the admin panel's Site Settings page.

---

### Phase 2: Deployment Infrastructure (New Services Needed)

The original project uses:
- **Vercel** for client + admin hosting (free)
- **Render** for Node.js backend (free tier)
- **MongoDB Atlas** for database (free M0 cluster)
- **Cloudflare** for DNS (if using custom domain)

For Alwan's version, you need **separate instances of everything**:

#### A. New GitHub Repository
Create a new repo (e.g. `alwan-portfolio`) and push the customized code.

#### B. MongoDB Atlas
- Create a new database (can use the same cluster if one exists, just a different database name like `alwan_portfolio`)
- Or create a new free M0 cluster
- Get the connection string. **IMPORTANT**: if the password contains `%` characters, URL-encode them as `%25`

#### C. Render Backend
Deploy `server/` directory as a new Web Service on Render with these env vars:
```
PORT=5000
MONGODB_URI=<atlas connection string>
JWT_SECRET=<random secret string>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<chosen password>
CLIENT_URL=<portfolio domain, e.g. https://alwan.com>
ADMIN_URL=<admin domain, e.g. https://admin.alwan.com>
```

After deploying, run the seed script:
```
# From Render shell, or locally with the Atlas URI:
cd server && MONGODB_URI='<atlas_uri>' ADMIN_PASSWORD='<password>' node seed.js
```

#### D. Vercel - Portfolio (client/)
Deploy `client/` as a new Vercel project. No special config needed (it's static files).

#### E. Vercel - Admin Panel (admin/)
Deploy `admin/` as a separate Vercel project. The `admin/vercel.json` has SPA rewrites already configured:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

#### F. Update API URLs in Code
After deployment, update these files with the actual URLs:

**`client/api.js`** (line 9):
```javascript
baseUrl: window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://NEW-RENDER-URL.onrender.com',
```

**`admin/src/api.js`** (lines 3-4):
```javascript
const baseURL = import.meta.env.PROD
    ? 'https://NEW-RENDER-URL.onrender.com/api'
    : '/api';
```

**`server/index.js`** (lines 13-20) - CORS origins:
```javascript
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.ADMIN_URL,
        'https://alwan-domain.com',        // portfolio domain
        'https://www.alwan-domain.com',     // www variant
        'https://admin.alwan-domain.com',   // admin subdomain
        'https://admin-xxx.vercel.app',     // actual Vercel URL
    ].filter(Boolean),
    credentials: true,
}));
```

#### G. Custom Domain (Optional)
If Alwan buys a domain:
1. Add domain to Vercel project (portfolio)
2. Add subdomain (admin.domain.com) to admin Vercel project
3. Configure DNS at the registrar:
   - `A` record for root domain -> Vercel IP `76.76.21.21`
   - `CNAME` record for `admin` -> `cname.vercel-dns.com`
4. If using Cloudflare: set DNS records to **DNS only** mode (gray cloud), NOT proxied (orange cloud), to avoid SSL conflicts with Vercel

---

## FILE-BY-FILE REFERENCE

### Client Files

| File | Purpose | What to change |
|------|---------|----------------|
| `client/index.html` | HTML shell with empty containers | Title, meta, logo initials, copyright |
| `client/data.js` | Static fallback data | ALL content |
| `client/api.js` | API abstraction with fetch fallback | Backend URL |
| `client/script.js` | DOM renderer + interactions | Nothing (data-driven) |
| `client/style.css` | Full dark theme CSS | Optional: accent color |
| `client/assets/logos/*.svg` | Custom tech logos | Add/remove per tech stack |

### Server Files

| File | Purpose | What to change |
|------|---------|----------------|
| `server/index.js` | Express app entry, CORS | CORS origin URLs |
| `server/seed.js` | Database seeder | ALL seed data |
| `server/.env` | Local dev config | Local values only |
| `server/config/db.js` | MongoDB connection | Nothing |
| `server/middleware/auth.js` | JWT verification | Nothing |
| `server/controllers/authController.js` | Login endpoint | Nothing |
| `server/controllers/publicController.js` | Public GET endpoints | Nothing |
| `server/controllers/adminController.js` | Admin CRUD endpoints | Nothing |
| `server/routes/public.js` | Public route definitions | Nothing |
| `server/routes/admin.js` | Admin route definitions | Nothing |
| `server/routes/auth.js` | Auth route definition | Nothing |
| `server/models/*.js` | Mongoose schemas | Only `SiteSettings.js` defaults |

### Admin Files

| File | Purpose | What to change |
|------|---------|----------------|
| `admin/src/api.js` | Axios instance with JWT | Backend URL |
| `admin/src/App.jsx` | React Router routes | Nothing |
| `admin/src/components/Layout.jsx` | Sidebar navigation | Logo initials |
| `admin/src/components/ProtectedRoute.jsx` | Auth guard | Nothing |
| `admin/src/context/AuthContext.jsx` | Auth state management | Nothing |
| `admin/src/pages/*.jsx` | 12 admin pages | Nothing |
| `admin/src/styles.css` | Admin panel styles | Nothing |
| `admin/vite.config.js` | Dev server proxy config | Nothing |
| `admin/vercel.json` | Vercel SPA rewrites | Nothing |

### Root Files

| File | Purpose | What to change |
|------|---------|----------------|
| `package.json` | Root dev scripts | Project name |
| `.gitignore` | Git ignore patterns | Nothing |

---

## DEVELOPMENT WORKFLOW

### Install dependencies
```bash
npm run install:all
# or manually:
cd server && npm install
cd ../admin && npm install
```

### Start local MongoDB (required for backend)
```bash
brew services start mongodb-community
```

### Run everything locally
```bash
# Terminal 1: Backend (port 5000)
npm run dev:server

# Terminal 2: Admin panel (port 5173)
npm run dev:admin

# Terminal 3: Portfolio website (port 5500)
npm run dev:client
```

### Seed the database
```bash
npm run seed
# or: cd server && node seed.js
```

### Local URLs
- Portfolio: http://localhost:5500
- Admin panel: http://localhost:5173
- API: http://localhost:5000/api/health

---

## KEY ARCHITECTURAL PATTERNS

1. **Singleton pattern**: Personal, Hero, About, SiteSettings use `findOneAndUpdate` with `upsert: true` - there's only ever one document
2. **CRUD factory**: `crudController(Model)` in adminController.js generates getAll/create/update/remove for any model
3. **Static fallback**: If the API is unreachable, the portfolio renders from `data.js` so it never shows a blank page
4. **JWT auth**: 7-day tokens stored in localStorage, auto-redirect to `/login` on 401
5. **Resume upload**: Multer stores in `server/uploads/`, served via `GET /api/resume`
6. **Custom sections**: Dynamic sections created from admin, rendered before the contact section

---

## IMPORTANT GOTCHAS

1. **ADMIN_PASSWORD env var only affects seeding**. Changing it on Render does NOT change the password. To change password after seeding, run:
   ```bash
   MONGODB_URI='<uri>' ADMIN_PASSWORD='<new>' node -e "
   require('dotenv').config();
   const mongoose = require('mongoose');
   const Admin = require('./models/Admin');
   (async () => {
       await mongoose.connect(process.env.MONGODB_URI);
       const hash = await Admin.hashPassword(process.env.ADMIN_PASSWORD);
       await Admin.findOneAndUpdate({username:'admin'},{passwordHash:hash});
       console.log('Updated'); process.exit(0);
   })();
   "
   ```

2. **Render free tier has cold starts**. First request after inactivity takes ~30 seconds. The portfolio handles this gracefully via static fallback.

3. **Vercel + React Router needs rewrites**. The `admin/vercel.json` file handles this. Without it, direct navigation to `/login` returns 404.

4. **MongoDB Atlas passwords with special characters**: URL-encode `%` as `%25`, `@` as `%40`, etc in the connection string.

5. **Cloudflare + Vercel**: Use "DNS only" mode (gray cloud icon), NOT "Proxied" (orange cloud). Proxied mode causes SSL certificate conflicts.

6. **The `server/uploads/` directory** must exist. There's a `.gitkeep` file to ensure it's tracked. If missing, resume upload will fail.

---

## CHECKLIST

- [ ] Get all of Alwan's personal/professional info from the user
- [ ] Update `client/data.js` with Alwan's content
- [ ] Update `server/seed.js` to match `data.js`
- [ ] Update `client/index.html` (title, meta, initials, copyright)
- [ ] Update `server/models/SiteSettings.js` defaults
- [ ] Update `admin/src/components/Layout.jsx` initials
- [ ] Update `package.json` project name
- [ ] Add/remove custom SVG logos in `client/assets/logos/` based on tech stack
- [ ] Create new GitHub repo and push
- [ ] Set up MongoDB Atlas database
- [ ] Deploy backend to Render with correct env vars
- [ ] Run `seed.js` against the production database
- [ ] Deploy client/ to Vercel
- [ ] Deploy admin/ to Vercel
- [ ] Update `client/api.js` and `admin/src/api.js` with production API URL
- [ ] Update `server/index.js` CORS origins with production URLs
- [ ] (Optional) Set up custom domain with DNS records
- [ ] Test: portfolio loads, admin login works, content updates reflect on portfolio
