# KaryaTrack

KaryaTrack is a single-page professional and personal tracking app with Supabase authentication and per-user live sync.

## Features

- Professional dashboard with dynamic phases (starts empty, user creates phases)
- Task management inside phases with status, owner, due date, notes, and effort
- Personal tracker with drag-and-drop calendar cards
- Insights dashboard for completion metrics
- CSV export and JSON sync import/export
- Supabase Auth (email/password)
- Per-user cloud sync with row-level security (RLS)
- Local browser persistence for fast offline experience

## Current App Behavior

- The professional dashboard starts with no phases by default.
- Users must create at least one phase before adding professional tasks.
- Sign-in modal appears on app entry if there is no active session.
- Cloud sync is user-scoped (each authenticated user can only access their own state).

## Tech Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Express
- Auth and cloud sync: Supabase
- Local storage: browser localStorage

## Project Structure

- [index.html](index.html): full frontend UI and client logic
- [server.js](server.js): Express server and sync config endpoint
- [api/sync-config.js](api/sync-config.js): serverless sync config endpoint for deployment
- [supabase_setup.sql](supabase_setup.sql): Supabase table + RLS setup
- [assets/karyatrack-logo.png](assets/karyatrack-logo.png): app logo in header
- [vercel.json](vercel.json): deployment configuration

## Requirements

- Node.js 18+
- Supabase project
- Supabase Auth enabled (email/password)

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create a .env file in the project root.

```env
PORT=3000
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_WORKSPACE_ID=karyatrack-main
```

3. Run the SQL setup in Supabase SQL Editor.

Use [supabase_setup.sql](supabase_setup.sql).

Important: current SQL drops and recreates public.tracker_state, which resets previous shared sync data.

4. Start the app.

```bash
npm start
```

5. Open:

```text
http://localhost:3000
```

## Supabase Schema and Security

The tracker_state table is user-scoped:

- user_id references auth.users(id)
- workspace_id supports per-user workspaces
- composite primary key: (user_id, workspace_id)

RLS policy allows only authenticated users to read/write their own rows:

- using (auth.uid() = user_id)
- with check (auth.uid() = user_id)

## Live Sync Notes

- Live sync requires login.
- Sync operations use user_id + workspace_id.
- Realtime updates are scoped to the logged-in user.

## Scripts

- npm start: run Express server
- npm run dev: run Express server
- npm run dev:vercel: run Vercel dev server

## Troubleshooting

- Port 3000 already in use:
	- another instance is already running; open http://localhost:3000 directly
	- or stop the existing process and rerun npm start
- Logo not visible:
	- confirm [assets/karyatrack-logo.png](assets/karyatrack-logo.png) exists
	- hard refresh browser cache (Ctrl+F5)
- Login modal appears but auth fails:
	- verify SUPABASE_URL and SUPABASE_ANON_KEY
	- ensure email/password auth is enabled in Supabase
- Live sync push/pull fails:
	- apply [supabase_setup.sql](supabase_setup.sql)
	- confirm user is logged in (sync is disabled for guest sessions)

## Usage Guide

See [docs/usage-guide.md](docs/usage-guide.md) for flow walkthroughs.

## License

No license has been specified for this project.
