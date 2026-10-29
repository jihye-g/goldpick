-- 가입 시 프로필 생성 (닉네임은 가입 메타데이터 nickname, 없으면 이메일 앞부분)
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    left(coalesce(nullif(new.raw_user_meta_data ->> 'nickname', ''), split_part(new.email, '@', 1), '사용자'), 20),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at 자동 갱신
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();
create trigger comments_set_updated_at before update on public.comments
  for each row execute function public.set_updated_at();

-- 댓글 수 · 북마크 수 집계
create function public.sync_post_comment_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set comment_count = comment_count + 1 where id = new.post_id;
  else
    update public.posts set comment_count = greatest(comment_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end;
$$;

create trigger comments_sync_post_count after insert or delete on public.comments
  for each row execute function public.sync_post_comment_count();

create function public.sync_post_bookmark_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set bookmark_count = bookmark_count + 1 where id = new.post_id;
  else
    update public.posts set bookmark_count = greatest(bookmark_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end;
$$;

create trigger bookmarks_sync_post_count after insert or delete on public.bookmarks
  for each row execute function public.sync_post_bookmark_count();

-- 트리거 전용 함수는 API(RPC)로 호출하지 못하게
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.sync_post_comment_count() from public, anon, authenticated;
revoke execute on function public.sync_post_bookmark_count() from public, anon, authenticated;

-- 조회수 +1 (본인 글이 아니어도 올릴 수 있어야 해서 security definer)
create function public.increment_post_view(p_post_id uuid)
returns integer
language sql
security definer
set search_path = ''
as $$
  update public.posts set view_count = view_count + 1 where id = p_post_id
  returning view_count;
$$;

revoke execute on function public.increment_post_view(uuid) from public;
grant execute on function public.increment_post_view(uuid) to anon, authenticated;

-- 댓글 목록: 비밀 댓글 내용은 글쓴이·댓글 작성자에게만, 나머지에게는 null
create function public.get_post_comments(p_post_id uuid, p_sort text default 'oldest')
returns table (
  id uuid,
  author_id uuid,
  author_nickname text,
  author_avatar_url text,
  content text,
  is_secret boolean,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    c.id,
    c.author_id,
    pr.nickname,
    pr.avatar_url,
    case
      when not c.is_secret or (select auth.uid()) in (c.author_id, p.author_id) then c.content
    end,
    c.is_secret,
    c.created_at
  from public.comments c
  join public.posts p on p.id = c.post_id
  join public.profiles pr on pr.id = c.author_id
  where c.post_id = p_post_id
  order by
    case when p_sort = 'latest' then c.created_at end desc,
    c.created_at asc;
$$;

revoke execute on function public.get_post_comments(uuid, text) from public;
grant execute on function public.get_post_comments(uuid, text) to anon, authenticated;
