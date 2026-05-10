export type SkillGroupVariant = 'primary' | 'secondary' | undefined;

export type SkillGroup = {
  name: string;
  meta: string;
  items: string[];
  variant?: SkillGroupVariant;
};

export const skillGroups: SkillGroup[] = [
  {
    name: 'Now · 主戦場',
    meta: 'current focus',
    variant: 'primary',
    items: [
      'Next.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'Hono',
      'GCP',
      'Cloud Run',
      'Vertex AI',
      'Gemini',
      'Claude API',
      'GPT-4o',
      'AI Agent',
      'Mastra',
      'PostgreSQL',
    ],
  },
  {
    name: 'Comfortable',
    meta: 'regularly used',
    items: [
      'React',
      'Tailwind CSS',
      'tRPC',
      'Prisma',
      'NestJS',
      'REST',
      'OpenAPI',
      'Docker',
      'GitHub Actions',
      'Sentry',
      'Cloud SQL',
    ],
  },
  {
    name: 'Past · 経験あり',
    meta: 'background',
    variant: 'secondary',
    items: ['Vue', 'Java', 'Spring', 'Oracle', 'AWS', 'jQuery', 'Visual Basic .NET'],
  },
];
