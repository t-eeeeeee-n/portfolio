import type { Metadata } from 'next';
import { LabPage } from '@/components/lab/LabPage';

export const metadata: Metadata = {
  title: 'Component Lab',
  description:
    '次の開発で使える形にしておくための実験場。UI / Product / AI Agent / Architecture の 19 コンポーネントを Preview / Code / Props / Notes で公開。',
  openGraph: {
    title: 'Component Lab — teeeen.lab',
    description: '作って終わりにせず、次の開発で使える形にしておく実験場。',
    type: 'website',
  },
};

export default function ComponentLabPage() {
  return <LabPage />;
}
