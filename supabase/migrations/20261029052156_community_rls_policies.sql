alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.bookmarks enable row level security;

-- profiles: 누구나 조회, 본인만 수정 (생성은 가입 트리거가 담당)
create policy "profiles_select_all" on public.profiles
  for select to anon, authenticated using (true);
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- posts: 누구나 조회, 작성·수정·삭제는 본인만
create policy "posts_select_all" on public.posts
  for select to anon, authenticated using (true);
create policy "posts_insert_own" on public.posts
  for insert to authenticated with check ((select auth.uid()) = author_id);
create policy "posts_update_own" on public.posts
  for update to authenticated
  using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);
create policy "posts_delete_own" on public.posts
  for delete to authenticated using ((select auth.uid()) = author_id);

-- 집계 칸은 트리거만 바꾼다 (작성자가 직접 수정하지 못하게)
revoke update (view_count, comment_count, bookmark_count) on public.posts from anon, authenticated;

-- comments: 행은 누구나 조회, 작성·수정·삭제는 본인만
create policy "comments_select_all" on public.comments
  for select to anon, authenticated using (true);
create policy "comments_insert_own" on public.comments
  for insert to authenticated with check ((select auth.uid()) = author_id);
create policy "comments_update_own" on public.comments
  for update to authenticated
  using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);
create policy "comments_delete_own" on public.comments
  for delete to authenticated using ((select auth.uid()) = author_id);

-- 비밀 댓글: RLS는 행 단위라 내용만 가릴 수 없다.
-- content 칸은 직접 읽지 못하게 막고, get_post_comments() 가 권한에 따라 내용을 null 로 바꿔 돌려준다.
revoke select on public.comments from anon, authenticated;
grant select (id, post_id, author_id, is_secret, created_at, updated_at) on public.comments to anon, authenticated;

-- bookmarks: 본인 것만 조회·추가·삭제
create policy "bookmarks_select_own" on public.bookmarks
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "bookmarks_insert_own" on public.bookmarks
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "bookmarks_delete_own" on public.bookmarks
  for delete to authenticated using ((select auth.uid()) = user_id);
