import { ArrowUR, Github, Linkedin, Mail } from '@/components/ui/icons';

export function Contact() {
  return (
    <section id="contact" className="section zone-dark">
      <div className="container">
        <div className="contact-cta">
          <div className="eyebrow mb-4">§ 07 · Contact</div>
          <h2 className="h-section" style={{ maxWidth: 720 }}>
            一緒にプロダクトを作る話、
            <br />
            技術の話、
            <span style={{ color: 'var(--d-text-2)' }}>気軽にどうぞ。</span>
          </h2>
          <p className="lede mt-4 max-w-[560px]">
            個人開発・受託開発・技術相談など、内容は問いません。返信しやすい連絡手段でどうぞ。
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            <a className="btn btn-primary" href="mailto:t.eeee.n.nir@gmail.com">
              <Mail size={14} /> Email
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/t-eeeeeee-n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.linkedin.com/in/tensho-arai-b071142a3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <ArrowUR size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
