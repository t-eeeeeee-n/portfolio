import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'd-bg-0': 'var(--d-bg-0)',
        'd-bg-1': 'var(--d-bg-1)',
        'd-bg-2': 'var(--d-bg-2)',
        'd-bg-3': 'var(--d-bg-3)',
        'd-line': 'var(--d-line)',
        'd-line-2': 'var(--d-line-2)',
        'd-text-0': 'var(--d-text-0)',
        'd-text-1': 'var(--d-text-1)',
        'd-text-2': 'var(--d-text-2)',
        'd-text-3': 'var(--d-text-3)',
        'l-bg-0': 'var(--l-bg-0)',
        'l-bg-1': 'var(--l-bg-1)',
        'l-bg-2': 'var(--l-bg-2)',
        'l-line': 'var(--l-line)',
        'l-line-2': 'var(--l-line-2)',
        'l-text-0': 'var(--l-text-0)',
        'l-text-1': 'var(--l-text-1)',
        'l-text-2': 'var(--l-text-2)',
        'l-text-3': 'var(--l-text-3)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        display: 'var(--font-display)',
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
      },
      maxWidth: {
        page: 'var(--max-w)',
      },
      screens: {
        '720': '720px',
        '900': '900px',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
