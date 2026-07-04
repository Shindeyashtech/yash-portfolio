// api/posts.js — Powered by Upstash Redis (free, no Vercel KV needed)
// GET all posts | POST new post | DELETE post

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'yash2026admin';
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Simple Upstash REST API helper — no SDK needed
async function kvGet(key) {
  const res = await fetch(`${UPSTASH_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const data = await res.json();
  if (!data.result) return null;
  return JSON.parse(data.result);
}

async function kvSet(key, value) {
  const res = await fetch(`${UPSTASH_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(JSON.stringify(value))
  });
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET — public, no auth ──
  if (req.method === 'GET') {
    try {
      const posts = await kvGet('linkedin_posts') || [];
      return res.status(200).json({ success: true, posts });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── Auth check for POST/DELETE ──
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  // ── POST — add new post ──
  if (req.method === 'POST') {
    try {
      const { title, excerpt, type, date, link, likes, comments } = req.body;
      if (!title || !excerpt) {
        return res.status(400).json({ success: false, error: 'Title and excerpt required' });
      }
      const posts = await kvGet('linkedin_posts') || [];
      const newPost = {
        id: Date.now().toString(),
        title, excerpt,
        type: type || 'POST',
        date: date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        link: link || 'https://www.linkedin.com/in/yashshinde-tech',
        likes: parseInt(likes) || 0,
        comments: parseInt(comments) || 0,
        createdAt: new Date().toISOString()
      };
      posts.unshift(newPost);
      await kvSet('linkedin_posts', posts);
      return res.status(200).json({ success: true, post: newPost });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── DELETE — remove post by id ──
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const posts = await kvGet('linkedin_posts') || [];
      const filtered = posts.filter(p => p.id !== id);
      await kvSet('linkedin_posts', filtered);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
