'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersSection from '@/components/PartnersSection';
import PerformanceChart from '@/components/PerformanceChart';
import AboutSection from '@/components/AboutSection';
import FreeVideosPreview from '@/components/FreeVideosPreview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <PerformanceChart />
      <AboutSection />
      <FreeVideosPreview />
      <Footer />
    </main>
  );
}
