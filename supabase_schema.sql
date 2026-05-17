-- Products Table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  features text[],
  price_label text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Gallery Table
create table gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  category text,
  created_at timestamptz default now()
);

-- Articles Table
create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  published_at timestamptz,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- Set up Row Level Security (RLS)

-- Enable RLS on all tables
alter table products enable row level security;
alter table gallery enable row level security;
alter table articles enable row level security;

-- Policies for public read access
create policy "Public can view active products" on products
  for select using (is_active = true);

create policy "Public can view gallery" on gallery
  for select using (true);

create policy "Public can view published articles" on articles
  for select using (is_published = true);

-- Policies for authenticated admins (all operations)
create policy "Admins can manage products" on products
  for all using (auth.role() = 'authenticated');

create policy "Admins can manage gallery" on gallery
  for all using (auth.role() = 'authenticated');

create policy "Admins can manage articles" on articles
  for all using (auth.role() = 'authenticated');

-- Storage setup for 'media' bucket
insert into storage.buckets (id, name, public) values ('media', 'media', true);

create policy "Public can view media" on storage.objects
  for select using (bucket_id = 'media');

create policy "Admins can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can update media" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can delete media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
