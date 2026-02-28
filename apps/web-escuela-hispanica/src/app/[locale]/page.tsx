import { Navbar, Footer } from '@/components/sections';
import {
  HomeHero,
  HomeManifesto,
  HomeProject,
  HomeActivities,
  HomePublications,
  HomePillars,
  HomeMembership
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#050a14]">
        <HomeHero />
        <HomeManifesto />
        <HomeProject />
        <HomeActivities />
        <HomePublications />
        <HomePillars />
        <HomeMembership />
      </main>
      <Footer />
    </>
  );
}
