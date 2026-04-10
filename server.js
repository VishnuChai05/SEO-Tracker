const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

const projectUrl = process.env.SUPABASE_URL || '';
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';
const workspaceId = process.env.SUPABASE_WORKSPACE_ID || 'ohsou-main';

app.get('/api/sync-config', (_req, res) => {
  if (!projectUrl || !anonKey) {
    return res.status(503).json({
      error: 'Missing SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_PUBLISHABLE_KEY) in .env'
    });
  }

  return res.json({
    projectUrl,
    anonKey,
    workspaceId
  });
});

app.use(express.static(path.join(__dirname)));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`SEO tracker running at http://localhost:${port}`);
});
