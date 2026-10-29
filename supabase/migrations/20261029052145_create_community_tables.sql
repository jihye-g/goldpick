-- 커뮤니티: 프로필 · 게시글 · 댓글 · 북마크

create type public.post_category as enum ('free', 'question', 'review', 'sell');

-- 닉네임·프로필 사진 (auth.users 는 클라이언트에서 직접 읽을 수 없어서 공개용 프로필을 둔다)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 20),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  category public.post_category not null,
  title text not null check (char_length(title) between 1 and 100),
  content text not null check (char_length(content) between 1 and 5000),
  images text[] not null default '{}',
  view_count integer not null default 0 check (view_count >= 0),
  -- 목록 카드용 집계 (트리거로 유지)
  comment_count integer not null default 0 check (comment_count >= 0),
  bookmark_count integer not null default 0 check (bookmark_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_created_at_idx on public.posts (created_at desc);
create index posts_category_created_at_idx on public.posts (category, created_at desc);
create index posts_author_id_idx on public.posts (author_id);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  content text not null check (char_length(content) between 1 and 500),
  is_secret boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index comments_post_id_created_at_idx on public.comments (post_id, created_at);
create index comments_author_id_idx on public.comments (author_id);

create table public.bookmarks (
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create index bookmarks_post_id_idx on public.bookmarks (post_id);
