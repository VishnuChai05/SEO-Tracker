-- WARNING: this resets previous shared tracker_state data.
drop table if exists public.tracker_state;

create table public.tracker_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_id text not null default 'default',
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, workspace_id)
);

create index if not exists tracker_state_workspace_idx
on public.tracker_state (workspace_id);

alter table public.tracker_state replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.tracker_state;
  exception
    when duplicate_object then
      null;
  end;
end
$$;

alter table public.tracker_state enable row level security;

drop policy if exists "Allow anon read tracker_state" on public.tracker_state;
drop policy if exists "Allow anon upsert tracker_state" on public.tracker_state;
drop policy if exists "Users manage own tracker_state" on public.tracker_state;

create policy "Users manage own tracker_state"
on public.tracker_state
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
