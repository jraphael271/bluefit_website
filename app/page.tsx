'use client';

import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import MarqueeTicker from '@/components/blocks/marquee-ticker';

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
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Welkom bij BlueFit
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            BlueFit is meer dan een gym. Het is een plek waar beweging, voeding,
            zingeving en verbinding samenkomen — gebaseerd op de Blue Zones
            filosofie voor een langer en gezonder leven.
          </p>
        </div>
      </ScrollExpandMedia>

      {/* Blue Zones Power 9 ticker — sits over the hero */}
      <div className='absolute inset-0 pointer-events-none' style={{ height: '100dvh' }}>
        <MarqueeTicker />
      </div>
    </main>
  );
}
