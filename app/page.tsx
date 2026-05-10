import { About } from '@/components/sections/About';
import { BuildLog } from '@/components/sections/BuildLog';
import { Career } from '@/components/sections/Career';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Nav } from '@/components/sections/Nav';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <BuildLog />
      <Projects />
      <About />
      <Career />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
