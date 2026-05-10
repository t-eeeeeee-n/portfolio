import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  sw?: number;
};

function Icon({
  d,
  size = 16,
  fill = 'none',
  stroke = 'currentColor',
  sw = 1.6,
  children,
  ...rest
}: IconProps & { d?: string; children?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export const ArrowR = (p: IconProps) => <Icon d="M5 12h14 M13 6l6 6-6 6" {...p} />;
export const ArrowUR = (p: IconProps) => <Icon d="M7 17 17 7 M9 7h8v8" {...p} />;
export const Check = (p: IconProps) => <Icon d="M4 12l5 5 11-12" {...p} />;
export const Spark = (p: IconProps) => (
  <Icon d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1" {...p} />
);
export const Mail = (p: IconProps) => <Icon d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M3 6l9 7 9-7" {...p} />;
export const Github = (p: IconProps) => (
  <Icon
    d="M9 19c-4.3 1.4-4.3-2.5-6-3 M15 21v-3.9a3.4 3.4 0 0 0-.9-2.5c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4a4.9 4.9 0 0 0-.1-3.6S17.5.4 15 2.1a13 13 0 0 0-7 0C5.5.4 4.1.4 4.1.4A4.9 4.9 0 0 0 4 4a5.2 5.2 0 0 0-1.4 3.9c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.5V21"
    {...p}
  />
);
export const Linkedin = (p: IconProps) => (
  <Icon d="M4 4h4v16H4z M8 9h4v2c.7-1.3 2.4-2.3 4-2.3 3.4 0 4 2.3 4 5V20h-4v-5c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5v5H8z M6 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" {...p} />
);
export const Search = (p: IconProps) => <Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z M21 21l-4.3-4.3" {...p} />;
export const X = (p: IconProps) => <Icon d="M5 5l14 14 M19 5L5 19" {...p} />;
export const Doc = (p: IconProps) => <Icon d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6 M9 13h6 M9 17h4" {...p} />;
export const Layer = (p: IconProps) => <Icon d="M12 2 2 8l10 6 10-6-10-6z M2 14l10 6 10-6 M2 11l10 6 10-6" {...p} />;
export const Cube = (p: IconProps) => <Icon d="M12 2 3 7v10l9 5 9-5V7l-9-5z M3 7l9 5 9-5 M12 12v10" {...p} />;
export const Clock = (p: IconProps) => <Icon d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2" {...p} />;
export const Box = (p: IconProps) => <Icon d="M3 7l9-4 9 4-9 4-9-4z M3 7v10l9 4 9-4V7 M12 11v10" {...p} />;
