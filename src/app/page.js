'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PerformanceChart from '@/components/PerformanceChart';
import AboutSection from '@/components/AboutSection';
import FreeVideosPreview from '@/components/FreeVideosPreview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PerformanceChart />
      <AboutSection />
      <FreeVideosPreview />
      <Footer />
    </main>
  );
}
