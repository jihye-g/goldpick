interface SectionProps {
  /** 캡처용 앵커 — /design-system#button 처럼 섹션만 잘라 찍는다 */
  id: string;
  title: string;
  /** 비교할 Figma 컴포넌트 노드 ID */
  figmaNode: string;
  children: React.ReactNode;
}

export function Section({ id, title, figmaNode, children }: SectionProps) {
  return (
    <section id={id} data-capture={id} className="flex flex-col gap-[16px] border-b border-border-default bg-bg-surface p-[24px]">
      <header className="flex items-baseline gap-[8px]">
        <h2 className="text-20 font-bold text-text-primary">{title}</h2>
        <span className="text-12 text-text-tertiary">Figma {figmaNode}</span>
      </header>
      {children}
    </section>
  );
}

// 섹션 안 한 줄 — 왼쪽에 variant 이름, 오른쪽에 컴포넌트들
export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[16px]">
      <span className="w-[96px] shrink-0 text-12 text-text-tertiary">{label}</span>
      <div className="flex flex-wrap items-center gap-[12px]">{children}</div>
    </div>
  );
}
