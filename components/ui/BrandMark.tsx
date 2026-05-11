/* teeeen.lab brand mark — Morse code for "TN".
   T = ━ (top dash), N = ━ · (bottom dash + dot).
   Single component used everywhere (Nav, page headers, 404, OG, favicon,
   apple-icon). Orange (#ec5e2a) is fixed as the brand color and does not
   follow the user-customizable --accent variable — accent customizes
   site highlights, the brand mark stays brand. */

type BrandMarkProps = {
  size?: number;
  color?: string;
  className?: string;
  /** When the mark sits next to the brand name text, set decorative=true
   *  to hide it from screen readers (avoids duplicate "teeeen.lab"). */
  decorative?: boolean;
};

export function BrandMark({
  size = 22,
  color = '#ec5e2a',
  className,
  decorative = false,
}: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : 'teeeen.lab'}
      className={className}
    >
      <rect x="5" y="9" width="22" height="3.5" rx="1.75" fill={color} />
      <rect x="5" y="19.5" width="14" height="3.5" rx="1.75" fill={color} />
      <circle cx="24" cy="21.25" r="2" fill={color} />
    </svg>
  );
}
