'use client';

import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import MarqueeTicker from '@/components/blocks/marquee-ticker';
import AanbodSection from '@/components/blocks/aanbod-section';
import TarievenSection from '@/components/blocks/tarieven-section';
import OverOnsSection from '@/components/blocks/over-ons-section';
import ContactSection from '@/components/blocks/contact-section';

export default function Home() {
  return (
    <main className='relative'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/video-project.mp4"
        bgImageSrc="/ocean-img.jpg"
        title="Welkom Bij BlueFit"
        subtitle="Jouw gym in Lent"
        autoExpand
        autoExpandDelay={600}
        autoExpandDuration={2800}
        textBlend
      />

      {/* Blue Zones Power 9 ticker — sits over the hero */}
      <div className='absolute inset-0 pointer-events-none' style={{ height: '100dvh' }}>
        <MarqueeTicker />
      </div>

      <AanbodSection />
      <TarievenSection />
      <OverOnsSection />
      <ContactSection />
    </main>
  );
}
