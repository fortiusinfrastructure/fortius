import { Navigation } from "@/components/shared/Navigation";
import { Hero } from "@/components/consulting/Hero";
import { Method } from "@/components/consulting/Method";
import { Statement } from "@/components/consulting/Statement";
import { Services } from "@/components/consulting/Services";
import { Intelligence } from "@/components/consulting/Intelligence";
import { Experience } from "@/components/consulting/Experience";
import { CTASection } from "@/components/consulting/CTASection";
import { Footer } from "@/components/shared/Footer";

export default function ConsultingLandingPage() {
  return (
    <>
      <Navigation />
      <main className="bg-background">
        <Hero />
        <Method />
        <Statement />
        <Services />
        <Intelligence />
        <Experience />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
