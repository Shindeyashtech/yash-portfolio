# 🚀 Yash Shinde Portfolio — Deploy Guide (Upstash + Vercel)

## Why Upstash instead of Vercel KV?
Vercel KV was discontinued. Upstash Redis is the replacement —
same thing, free tier, works perfectly with Vercel. 100% free forever for a portfolio.

---

## STEP 1 — Create FREE Upstash Database (2 minutes)

1. Go to **console.upstash.com** → Sign up free (use GitHub login)
2. Click **"Create Database"**
3. Name: `portfolio-db` | Type: **Regional** | Region: `ap-southeast-1` (closest to India)
4. Click **Create**
5. On the database page, scroll to **REST API** section
6. Copy these two values — you'll need them:
   - `UPSTASH_REDIS_REST_URL`  → looks like `https://xxx.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` → long string starting with `AX...`

---
UPSTASH_REDIS_REST_URL="https://humorous-walleye-121767.upstash.io"
UPSTASH_REDIS_REST_TOKEN="gQAAAAAAAdunAAIgcDIxMjUxZWEzMDZjNWU0M2IxOTVmYjgxMWM4ODkxZjJhZg"

## STEP 2 — Deploy to Vercel (3 minutes)

### Option A — GitHub (recommended, auto-redeploy on push)
1. Push this folder to a GitHub repo
2. Go to **vercel.com** → Import Project → Select your repo
3. Keep all settings default → Deploy

### Option B — Vercel CLI
```bash
npm install -g vercel
cd yash-portfolio
vercel login
vercel --prod
```

---

## STEP 3 — Add Environment Variables on Vercel

Go to your Vercel project → **Settings** → **Environment Variables** → Add these:

| Variable | Value |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Your Upstash URL from Step 1 |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash token from Step 1 |
| `ADMIN_PASSWORD` | Choose any password e.g. `YashAdmin2026!` |

After adding → **Redeploy** (Deployments tab → top deploy → Redeploy)

---

## STEP 4 — Add Gemini API Key (for AI chatbot)

1. Get free key at **aistudio.google.com/apikey**
2. Open `public/index.html`
3. Find: `const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'`
4. Replace with your key
5. Push to GitHub (auto-redeploys) or run `vercel --prod`

---

## STEP 5 — Use your Admin Panel

1. Go to `yoursite.vercel.app/admin`
2. Enter your `ADMIN_PASSWORD`
3. Fill the form → **PUBLISH POST** → Done ✓
4. Post appears live on your portfolio instantly!

---

## Your daily workflow

| Task | What to do | Time |
|---|---|---|
| Add LinkedIn post | `/admin` → fill form → Publish | 30 sec |
| New GitHub project | Just push to GitHub | 0 sec (auto) |
| Update bio / skills | Edit `public/index.html` → push | 2 min |
| Delete a post | `/admin` → click trash icon | 5 sec |

---

## Folder structure

```
yash-portfolio/
├── public/
│   └── index.html       ← Your portfolio (main site)
├── admin/
│   └── index.html       ← Admin panel (password protected)
├── api/
│   └── posts.js         ← Serverless API (Upstash powered)
├── vercel.json          ← Routing config
├── package.json         ← Project config
└── DEPLOY_GUIDE.md      ← This file
```

---

## Free tier limits (more than enough forever)

| Service | Free Limit |
|---|---|
| Vercel | 100GB bandwidth/month, unlimited deploys |
| Upstash Redis | 10,000 requests/day, 256MB storage |
| GitHub API | 60 requests/hour (unauthenticated) |
| Gemini API | 1,500 requests/day |

A portfolio gets maybe 50 visitors/day. You'll never hit any limit.
