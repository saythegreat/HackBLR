# Supabase Database Setup

To enable session saving in the cloud (persistent translation history), you need to create a `sessions` table in your Supabase project.

### 📝 SQL Script
Please go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) and run the following script:

```sql
-- Create the sessions table
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  from_lang text not null,
  to_lang text not null,
  from_flag text,
  to_flag text,
  messages_count integer default 0,
  duration text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.sessions enable row level security;

-- Create Policy: Users can only see their own sessions
create policy "Users can view their own sessions"
  on public.sessions for select
  using ( auth.uid() = user_id );

-- Create Policy: Users can only insert their own sessions
create policy "Users can insert their own sessions"
  on public.sessions for insert
  with check ( auth.uid() = user_id );
```

### 🚀 What this does
1.  **Saves History**: Every translation session is now saved in your Supabase database instead of just `localStorage`.
2.  **Syncs Devices**: When you log in on another device, your history will automatically appear.
3.  **Security (RLS)**: The policies ensure that users can **only** see and save their own specific sessions.
