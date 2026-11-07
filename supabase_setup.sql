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

-- The website now sends inquiries to WhatsApp rather than storing them in this table.
-- Remove the former public access policies if this setup script is applied to an existing project.
drop policy if exists "Allow anonymous insert" on leads;
drop policy if exists "Allow anonymous select" on leads;
drop policy if exists "Allow anonymous update" on leads;
