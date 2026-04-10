module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const projectUrl = process.env.SUPABASE_URL || '';
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';
  const workspaceId = process.env.SUPABASE_WORKSPACE_ID || 'ohsou-main';

  if (!projectUrl || !anonKey) {
    res.status(503).json({
      error: 'Missing SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_PUBLISHABLE_KEY) in environment variables'
    });
    return;
  }

  res.status(200).json({
    projectUrl,
    anonKey,
    workspaceId
  });
};
