'use client';

import { useEffect, useState } from 'react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['italic'],
});

const rules = [
  'Beweeg Elke Dag',
  'Ken Je Levensdoel',
  'Verminder Stress',
  'Eet Met Bewustzijn',
  'Plantaardig & Puur',
  'Geniet Met Mate',
  'Voel Je Verbonden',
  'Familie op de Eerste Plaats',
  'Kies Je Omgeving Bewust',
];

const Separator = () => (
  <span className='mx-8 text-white/30 text-sm select-none'>✦</span>
);

export default function MarqueeTicker() {
  const [visible, setVisible] = useState(false);
  const items = [...rules, ...rules, ...rules];

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('heroExpanded', handler);
    return () => window.removeEventListener('heroExpanded', handler);
  }, []);

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-30 overflow-hidden select-none transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Fade edges */}
      <div className='absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none' />
      <div className='absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black/40 to-transparent pointer-events-none' />

      <div className='py-4 bg-gradient-to-t from-black/25 to-transparent'>
        <div className={`flex whitespace-nowrap animate-marquee ${cormorant.className}`}>
          {items.map((rule, i) => (
            <span key={i} className='inline-flex items-center'>
              <span className='text-white/95 text-2xl italic font-light tracking-widest drop-shadow-sm'>
                {rule}
              </span>
              <Separator />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
