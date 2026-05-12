import { About } from '@/components/sections/About';
import { Career } from '@/components/sections/Career';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { LabTeaser } from '@/components/sections/LabTeaser';
import { Nav } from '@/components/sections/Nav';
import { Notes } from '@/components/sections/Notes';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { WorkStyle } from '@/components/sections/WorkStyle';
import { ZoneFade } from '@/components/sections/ZoneFade';
import { getAllNotes } from '@/lib/notes';

export default async function HomePage() {
  const notes = await getAllNotes();
  const hasNotes = notes.length > 0;
  return (
    <>
      <Nav />
      <Hero />
      <Intro />
      <Projects />
      <ZoneFade dir="down" />
      <LabTeaser />
      {hasNotes && <Notes notes={notes} limit={6} showFilter={false} showSeeAll />}
      <ZoneFade dir="up" />
      <About />
      <Career />
      <Skills />
      <WorkStyle />
      <Contact />
      <Footer />
    </>
  );
}
