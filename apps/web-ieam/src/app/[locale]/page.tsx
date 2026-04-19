import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StrategySection from '@/components/StrategySection';
import LatestAnalysis from '@/components/LatestAnalysis';
import HomeEvents from '@/components/HomeEvents';
import NewsletterCTA from '@/components/NewsletterCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StrategySection />
      <LatestAnalysis />
      <HomeEvents />
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
