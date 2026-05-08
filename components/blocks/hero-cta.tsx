'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('heroExpanded', handler);
    return () => window.removeEventListener('heroExpanded', handler);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-end pb-28 px-6 text-center transition-all duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Big bold headline */}
      <h1
        className='text-white font-black uppercase leading-none tracking-tighter mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', pointerEvents: 'none' }}
      >
        Meer dan
        <br />
        <span className='text-[#7ec8f4]'>een Sportschool.</span>
      </h1>

      {/* CTA button */}
      <Link
        href='https://blue-fit.opencontrolplus.nl/membership_onboarding?club_portal=1'
        target='_blank'
        rel='noopener noreferrer'
        style={{ pointerEvents: 'auto' }}
        className='inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1f7bbf] hover:bg-[#1560a8] text-white font-bold text-base shadow-[0_4px_24px_rgba(31,123,191,0.55)] hover:shadow-[0_6px_32px_rgba(31,123,191,0.7)] hover:gap-4 transition-all duration-200'
      >
        Boek gratis proefweek <ArrowRight size={16} />
      </Link>
    </div>
  );
}
