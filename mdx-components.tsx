import type { MDXComponents } from 'mdx/types';

/* MDX components map for content/notes/*.mdx — applies prose-like styling
   tuned to teeeen.lab's tokens. The article wrapper itself uses the
   @tailwindcss/typography plugin's `prose` class; these overrides cover
   the bits that need brand colors or non-default spacing. */

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-0 mb-6 text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-0.025em] font-medium"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-12 mb-4 text-[24px] leading-[1.2] tracking-[-0.02em] font-medium"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 mb-3 text-[18px] leading-[1.3] tracking-[-0.01em] font-medium"
        {...props}
      />
    ),
    h4: (props) => <h4 className="mt-6 mb-2 text-[15px] font-medium" {...props} />,
    p: (props) => <p className="my-4 text-[15.5px] leading-[1.75] text-d-text-1" {...props} />,
    a: (props) => (
      <a
        className="underline decoration-[1.5px] decoration-d-line underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
        {...props}
      />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6 text-d-text-1 [&_li]:my-1.5" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6 text-d-text-1 [&_li]:my-1.5" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-accent/60 pl-4 italic text-d-text-2"
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={
          'rounded bg-d-bg-2 px-1.5 py-0.5 font-mono text-[0.9em] text-d-text-0 ' +
          (className ?? '')
        }
        {...props}
      />
    ),
    pre: ({ className, children, ...props }) => (
      <pre
        className={
          'my-6 overflow-x-auto rounded-md border border-d-line-2 bg-[#050507] p-4 font-mono text-[12.5px] leading-[1.6] text-[#e4e4e7] ' +
          (className ?? '')
        }
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => <hr className="my-10 border-d-line" />,
    strong: (props) => <strong className="font-semibold text-d-text-0" {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-[14px]" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-d-line px-3 py-2 text-left font-medium text-d-text-0"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-d-line-2 px-3 py-2 text-d-text-1" {...props} />
    ),
    ...components,
  };
}
