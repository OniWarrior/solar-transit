import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import DestinationsSection from '../components/DestinationsSection';

export const metadata: Metadata = {
  title: 'Solar Transit — Commercial Spaceflight Booking',
  description:
    'Reserve civilian journeys across the solar system. Explore destinations from Mars to Titan.',
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/*
          ─────────────────────────────────────────────
          Placeholder sections — add as you build them:

          <DestinationsSection />
          <HowItWorksSection />
          <CTABanner />
          ─────────────────────────────────────────────
        */}
        <DestinationsSection />
      </main>
      <Footer />
    </>
  );
}
