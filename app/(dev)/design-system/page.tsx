import { notFound } from "next/navigation";
import { Avatar } from "@/components/common/Avatar";
import { Badge } from "@/components/common/Badge";
import { BottomNavigation } from "@/components/common/BottomNavigation";
import { Button } from "@/components/common/Button";
import { Checkbox, CheckboxField } from "@/components/common/Checkbox";
import { Divider } from "@/components/common/Divider";
import { EmptyState } from "@/components/common/EmptyState";
import { FilterChip } from "@/components/common/FilterChip";
import { BellIcon, BookmarkIcon, DotVerticalIcon, EyeIcon, Icon3D, SearchIcon } from "@/components/common/Icon";
import { IconButton } from "@/components/common/IconButton";
import { LoadingDots, LoadingSkeleton } from "@/components/common/Loading";
import { TextField } from "@/components/common/TextField";
import { TopAppBar } from "@/components/common/TopAppBar";
import { BottomSheetDemo } from "./components/BottomSheetDemo";
import { Row, Section } from "./components/Section";
import { SortSelectDemo, SortTabsDemo } from "./components/SortDemo";
import { ToastDemo, ToastPreview } from "./components/ToastDemo";

// 공용 컴포넌트 카탈로그 — variant별로 늘어놓고 Figma 카드와 나란히 캡처해 비교한다.
// 섹션마다 id가 있어 /design-system#button 처럼 한 섹션만 잘라 찍을 수 있다.

const BUTTON_VARIANTS = ["primary", "secondary", "ghost", "danger", "ghost-dark"] as const;
const SIZES = ["L", "M", "S"] as const;
const BADGE_TONES = ["neutral", "primary", "success", "warning", "error", "info"] as const;
const BADGE_VARIANTS = ["subtle", "solid", "outline"] as const;
const AVATAR_SIZES = ["sm", "md", "lg", "xl"] as const;

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex max-w-[960px] flex-col bg-bg-canvas">
      <h1 className="p-[24px] text-28 font-bold text-text-primary">골드픽 공용 컴포넌트</h1>

      <Section id="top-app-bar" title="Top App Bar" figmaNode="1055:620">
        <div className="flex w-[375px] flex-col gap-[8px] bg-bg-muted">
          <TopAppBar title="커뮤니티" actions={<><IconButton size="compact" label="검색"><SearchIcon /></IconButton><IconButton size="compact" label="알림"><BellIcon /></IconButton></>} />
          <TopAppBar title="커뮤니티" showBack backHref="/design-system" actions={<><IconButton size="compact" label="북마크"><BookmarkIcon /></IconButton><IconButton size="compact" label="더보기"><DotVerticalIcon /></IconButton></>} />
          <TopAppBar title="페이지 타이틀" showBack backHref="/design-system" caption="히스토리" />
          <TopAppBar title="페이지 타이틀" />
        </div>
      </Section>

      <Section id="bottom-navigation" title="Bottom Navigation" figmaNode="2636:20518">
        <div className="w-[375px] bg-bg-muted">
          <BottomNavigation chatBadge />
        </div>
        <p className="text-12 text-text-tertiary">현재 경로 기준으로 활성 탭이 정해져서 이 페이지에선 모두 비활성으로 보인다.</p>
      </Section>

      <Section id="filter-chip" title="Filter Chip" figmaNode="952:5068">
        {SIZES.map((size) => (
          <Row key={size} label={`Size ${size}`}>
            <FilterChip size={size} label="전체" selected />
            <FilterChip size={size} label="질문" />
            <FilterChip size={size} label="금팔기" selected tone="secondary" />
            <FilterChip size={size} label="후기" disabled />
          </Row>
        ))}
      </Section>

      <Section id="badge" title="Badge" figmaNode="952:4818">
        {BADGE_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            {BADGE_TONES.map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>{tone}</Badge>
            ))}
          </Row>
        ))}
      </Section>

      <Section id="avatar" title="Avatar" figmaNode="1021:8158">
        <Row label="글자">
          {AVATAR_SIZES.map((size) => <Avatar key={size} size={size} name="골드러버" />)}
        </Row>
      </Section>

      <Section id="icon-button" title="Icon Button" figmaNode="1036:435">
        <Row label="default · disabled">
          <IconButton label="검색"><SearchIcon /></IconButton>
          <IconButton label="검색" disabled><SearchIcon /></IconButton>
          <span className="text-12 text-text-tertiary">눌러야 pressed 배경이 보인다</span>
        </Row>
        <Row label="compact (24)">
          <IconButton size="compact" label="북마크"><BookmarkIcon /></IconButton>
          <IconButton size="compact" label="더보기"><DotVerticalIcon /></IconButton>
        </Row>
      </Section>

      <Section id="sort" title="Sort Select · Sort Tabs" figmaNode="952:5079">
        <Row label="SortSelect"><SortSelectDemo /></Row>
        <Row label="SortTabs"><SortTabsDemo /></Row>
      </Section>

      <Section id="checkbox" title="Checkbox" figmaNode="1013:334">
        <Row label="상태">
          <Checkbox aria-label="기본" />
          <Checkbox aria-label="체크" defaultChecked />
          <Checkbox aria-label="부분선택" indeterminate />
          <Checkbox aria-label="비활성" disabled />
          <Checkbox aria-label="비활성 체크" disabled defaultChecked />
        </Row>
        <div className="w-[375px]">
          <CheckboxField label="비밀댓글로 달기" caption="Caption" defaultChecked />
        </div>
      </Section>

      <Section id="input" title="Input" figmaNode="Input">
        <div className="flex w-[343px] flex-col gap-[16px]">
          <TextField label="닉네임" required placeholder="Label" caption="영문, 숫자 조합 8자 이상" counter="12/50" leadingIcon={<SearchIcon />} />
          <TextField label="오류" defaultValue="Label" status="error" caption="이미 사용 중인 닉네임이에요" leadingIcon={<SearchIcon />} />
          <TextField label="성공" defaultValue="Label" status="success" caption="사용할 수 있어요" trailing={<EyeIcon />} />
          <TextField label="비활성" placeholder="Label" disabled trailing="원" />
          <TextField label="버튼" placeholder="휴대폰 번호" action={<Button variant="secondary" size="L">인증요청</Button>} />
        </div>
      </Section>

      <Section id="button" title="Button" figmaNode="952:4604">
        {BUTTON_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className={variant === "ghost-dark" ? "flex flex-wrap gap-[12px] rounded-[8px] bg-text-primary p-[8px]" : "flex flex-wrap gap-[12px]"}>
              {SIZES.map((size) => <Button key={size} variant={variant} size={size}>Label</Button>)}
              {SIZES.map((size) => <Button key={`${size}-disabled`} variant={variant} size={size} disabled>Label</Button>)}
            </div>
          </Row>
        ))}
      </Section>

      <Section id="divider" title="Divider" figmaNode="1061:604">
        <div className="flex w-[375px] flex-col gap-[16px]">
          <Divider />
          <Divider variant="band" />
        </div>
        <div className="flex h-[48px] items-center gap-[16px]">
          <span className="text-text-secondary">왼쪽</span>
          <Divider orientation="vertical" />
          <span className="text-text-secondary">오른쪽</span>
        </div>
      </Section>

      <Section id="toast" title="Toast" figmaNode="2073:1133">
        <ToastPreview />
        <Row label="실제 띄우기"><ToastDemo /></Row>
      </Section>

      <Section id="bottom-sheet" title="Bottom Sheet" figmaNode="1058:966">
        <BottomSheetDemo />
      </Section>

      <Section id="empty-state" title="Empty State" figmaNode="2063:1119">
        <div className="w-[375px]">
          <EmptyState icon={<SearchIcon className="size-[103px] text-text-primary" />} title="제목이 들어갑니다" description="설명 문구가 들어갑니다." action={<Button size="M">Label</Button>} />
          <EmptyState icon={<Icon3D name="no-posts" />} title="아직 게시글이 없어요" description="첫 번째 글을 남겨보세요." />
        </div>
      </Section>

      <Section id="loading" title="Loading" figmaNode="1042:550">
        <Row label="Spinner"><LoadingDots /></Row>
        <Row label="Skeleton"><LoadingSkeleton /></Row>
      </Section>
    </main>
  );
}
