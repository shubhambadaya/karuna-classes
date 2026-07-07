-- Lead capture table for Karuna Classes CRM
create table if not exists leads (
  id bigserial primary key,
  name text not null,
  phone text,
  email text,
  interest text,
  source text default 'website',
  page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text default 'new',
  notes text,
  created_at timestamptz default now()
);

alter table leads enable row level security;

-- Allow anyone (including anonymous website visitors) to submit a lead
create policy "Allow anonymous insert"
  on leads for insert
  to anon
  with check (true);

-- Allow anon select/update so the CRM dashboard can read and manage leads
-- (tighten this to an authenticated policy once admin auth is added)
create policy "Allow anonymous select"
  on leads for select
  to anon
  using (true);

create policy "Allow anonymous update"
  on leads for update
  to anon
  using (true)
  with check (true);
