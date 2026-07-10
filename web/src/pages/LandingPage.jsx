import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GitBranch } from 'lucide-react';
import HeroSection from '../sections/HeroSection';
import TrustedSection from '../sections/TrustedSection';
import FeaturesPreviewSection from '../sections/FeaturesPreviewSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import DemoSection from '../sections/DemoSection';
import SecuritySection from '../sections/SecuritySection';
import PrivacySection from '../sections/PrivacySection';
import AboutSection from '../sections/AboutSection';
import DocsSection from '../sections/DocsSection';
import FaqSection from '../sections/FaqSection';
import CtaSection from '../sections/CtaSection';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="page-enter" style={{ minHeight: '100vh', position: 'relative' }}>
        {/* Perspective grid background */}
        <div className="bg-grid" />

        <HeroSection />
        <TrustedSection />
        <FeaturesPreviewSection />
      <HowItWorksSection />
      <DemoSection />
      <SecuritySection />
      <PrivacySection />
      <FaqSection />
      <AboutSection />
      <DocsSection />
      <CtaSection />

      <Footer />

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #hero { grid-template-columns: 1fr !important; text-align: center; padding: 32px 24px !important; }
          #hero > div:first-child { display: flex; flex-direction: column; alignItems: center; }
          #hero > div:last-child { height: 400px !important; }
        }
        @media (max-width: 640px) {
          .glass-card { display: none !important; }
          .connector-ring, .connector-dot { display: none !important; }
          #how-it-works .glass-card, #privacy .glass-card, #about .glass-card, #docs .glass-card { display: flex !important; }
        }
      `}</style>
      </div>
    </>
  );
}
