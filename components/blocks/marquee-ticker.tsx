'use client';

import { useEffect, useState } from 'react';

const rules = [
  'Beweeg natuurlijk dagelijks actief zonder te sporten',
  "Doel hebben weten waarom je 's ochtends opstaat",
  'Ontspanning dagelijkse momenten van rust en stressverlaging',
  '80%: regel eten tot je voor 80% vol zit',
  'Plantaardig eten vooral plantaardige voeding, weinig vlees',
  'Train in een persoonlijke en ongedwongen sfeer',
  'Wijn bij het eten met mate en in goed gezelschap',
  'Geloof of zingeving onderdeel zijn van een gemeenschap',
  'Familie eerst investeren in familiebanden',
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
    <div className={`absolute bottom-0 left-0 right-0 z-30 overflow-hidden select-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Fade edges */}
      <div className='absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none' />
      <div className='absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black/40 to-transparent pointer-events-none' />

      <div className='py-4 bg-gradient-to-t from-black/25 to-transparent'>
        <div className='flex whitespace-nowrap animate-marquee' style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
          {items.map((rule, i) => (
            <span key={i} className='inline-flex items-center'>
              <span className='text-white/95 text-sm font-medium tracking-wide drop-shadow-sm'>
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
