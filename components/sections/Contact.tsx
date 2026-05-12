import { ArrowUR, Doc, Github, Linkedin, Mail } from '@/components/ui/icons';

export function Contact() {
  return (
    <section id="contact" className="section zone-dark">
      <div className="container">
        <div className="contact-cta">
          <div className="eyebrow mb-4">§ 08 · Contact</div>
          <h2 className="h-section" style={{ maxWidth: 720 }}>
            一緒にプロダクトを作る話、
            <br />
            技術の話、
            <span style={{ color: 'var(--d-text-2)' }}>気軽にどうぞ。</span>
          </h2>
          <p className="lede mt-4 max-w-[620px]">
            副業 / 業務委託・個人開発・技術相談など、内容は問いません。
            <br />
            返信は基本 24h 以内、設計判断や見積もりは文書で先に提示します。
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            <a className="btn btn-primary" href="mailto:t.eeee.n.nir@gmail.com" data-magnetic="0.22">
              <Mail size={14} /> Email
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/t-eeeeeee-n"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="0.18"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.linkedin.com/in/tensho-arai-b071142a3/"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="0.18"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <ArrowUR size={12} />
            </a>
            <a className="btn btn-ghost" href="/skill-sheet">
              <Doc size={13} /> Skill Sheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
