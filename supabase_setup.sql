create table if not exists public.tracker_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

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
create policy "Allow anon read tracker_state"
on public.tracker_state
for select
using (true);

drop policy if exists "Allow anon upsert tracker_state" on public.tracker_state;
create policy "Allow anon upsert tracker_state"
on public.tracker_state
for all
using (true)
with check (true);
