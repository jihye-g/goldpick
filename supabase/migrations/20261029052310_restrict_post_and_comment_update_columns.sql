-- 칸 단위 revoke 는 테이블 단위 grant 를 이기지 못한다 → 테이블 update 를 걷고 수정 가능한 칸만 다시 준다
revoke update on public.posts from anon, authenticated;
grant update (category, title, content, images) on public.posts to authenticated;

-- 댓글도 작성자·글 이동 없이 내용·비밀 여부만 수정
revoke update on public.comments from anon, authenticated;
grant update (content, is_secret) on public.comments to authenticated;

-- 프로필은 닉네임·사진만
revoke update on public.profiles from anon, authenticated;
grant update (nickname, avatar_url) on public.profiles to authenticated;
