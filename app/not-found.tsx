import Link from 'next/link';
import { ArrowR } from '@/components/ui/icons';

export default function NotFound() {
  return (
    <main className="zone-dark min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <span
          className="nav-logo-mark mx-auto"
          style={{ width: 36, height: 36, fontSize: 13 }}
          aria-hidden="true"
        >
          t.n
        </span>
        <div className="font-mono text-[11px] text-d-text-3 mt-6 uppercase tracking-[0.12em]">
          404 · Not Found
        </div>
        <h1 className="h-section mt-3" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
          このページは見つかりませんでした。
        </h1>
        <p className="lede mt-4 max-w-[480px] mx-auto">
          URL が変わったか、まだ書かれていないノートかもしれません。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="btn btn-primary">
            ← Home <ArrowR size={13} className="btn-arrow" />
          </Link>
          <Link href="/notes" className="btn btn-ghost">
            Notes
          </Link>
          <Link href="/component-lab" className="btn btn-ghost">
            Component Lab
          </Link>
        </div>
      </div>
    </main>
  );
}
