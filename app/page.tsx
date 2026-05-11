import { About } from '@/components/sections/About';
import { BuildLog } from '@/components/sections/BuildLog';
import { Career } from '@/components/sections/Career';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { LabTeaser } from '@/components/sections/LabTeaser';
import { Nav } from '@/components/sections/Nav';
import { Notes } from '@/components/sections/Notes';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { ZoneFade } from '@/components/sections/ZoneFade';
import { getAllNotes } from '@/lib/notes';

export default async function HomePage() {
  const notes = await getAllNotes();
  return (
    <>
      <Nav />
      <Hero />
      <BuildLog />
      <Projects />
      <ZoneFade dir="down" />
      <LabTeaser />
      <Notes notes={notes} limit={6} showFilter={false} showSeeAll />
      <ZoneFade dir="up" />
      <About />
      <Career />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
