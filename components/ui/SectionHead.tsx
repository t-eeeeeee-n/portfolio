import type { ReactNode } from 'react';

type SectionHeadProps = {
  n: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
};

export function SectionHead({ n, eyebrow, title, lede, action }: SectionHeadProps) {
  return (
    <div
      data-reveal
      className="grid gap-6 items-start mb-12 grid-cols-1 900:grid-cols-[1fr_auto] 900:items-end"
    >
      <div>
        <div className="eyebrow mb-3.5">
          <span className="mr-3">§ {n}</span>
          {eyebrow}
        </div>
        <h2 className="h-section">{title}</h2>
        {lede && <p className="lede max-w-[640px] mt-4">{lede}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
