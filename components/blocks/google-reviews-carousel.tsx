'use client';

import { useEffect, useRef, useState } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  permalink: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Rogier Bosmans',
    rating: 5,
    date: '7 maanden geleden',
    text: 'Sinds ik begonnen ben, geniet ik enorm van het trainen bij Blue Fit. De studio heeft prachtige, professionele apparatuur en de begeleiding is fantastisch. Het team staat altijd klaar om advies te geven of vragen te beantwoorden. Dankzij de training en motivatie van Bas en zijn team ben ik al meer dan 15 kilo afgevallen. Je voelt je welkom, ondersteund en krijgt de juiste begeleiding om je doelen te bereiken.',
    permalink: 'https://share.google/S5xQTCMiW1n5nCRuD',
  },
  {
    id: 'r2',
    name: 'Gosia',
    rating: 5,
    date: '3 maanden geleden',
    text: "I just recently moved to Lent and was in desperate need for a new gym. Blue Fit met all the requirements and more! The gym is modern, fully equipped, the people here are so friendly and helpful, and most importantly you are set up for success from the start with a dedicated training program. I couldn't be happier with the gym and the team here. Thank you Blue Fit!",
    permalink: 'https://share.google/PsWe1xg7GmhakgAt8',
  },
  {
    id: 'r3',
    name: 'Milou Versantvoort',
    rating: 5,
    date: '5 maanden geleden',
    text: 'Een geweldige sportschool met goede apparatuur. Er heerst een prettige sfeer en het personeel is erg vriendelijk en behulpzaam. Ze bieden een breed scala aan groepslessen aan, afgestemd op de wensen en interesses van hun leden. Ik beveel Blue Fit Lent absoluut aan!',
    permalink: 'https://share.google/KQGIvPVMDgdOKPRMa',
  },
  {
    id: 'r4',
    name: 'Joy Bet',
    rating: 5,
    date: '7 maanden geleden',
    text: 'Mooie sportschool, vriendelijk personeel, nieuwste apparatuur! Geweldige ZUMBA groepsles op zaterdagochtend door Quinta — een leuke afwisseling. Cardio, krachttraining, Hyrox & groepslessen. PT-opties ook beschikbaar. Geweldige locatie, 2 uur gratis parkeren.',
    permalink: 'https://share.google/iavaf3lBaSHWe2XcO',
  },
  {
    id: 'r5',
    name: 'Esmée Otten',
    rating: 5,
    date: '3 maanden geleden',
    text: 'Een echt geweldige sportschool! Geweldige sfeer, schoon en georganiseerd, en geweldige apparatuur. Het personeel is vriendelijk en altijd bereid te helpen als je vragen hebt. Zeker aan te raden!',
    permalink: 'https://share.google/clMkgzk0KAPANLiZy',
  },
];

const GoogleIcon = () => (
  <svg viewBox='0 0 24 24' className='w-5 h-5' xmlns='http://www.w3.org/2000/svg'>
    <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4' />
    <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853' />
    <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z' fill='#FBBC05' />
    <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335' />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className='flex gap-0.5'>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className='w-4 h-4'
        fill={i < rating ? '#FBBC04' : '#e5e7eb'}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ))}
  </div>
);

export default function GoogleReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [overallRating, setOverallRating] = useState<number>(5.0);

  // Fetch live overall rating from Google Places API (server-side cached 24h)
  useEffect(() => {
    fetch('/api/google-rating')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.rating === 'number') setOverallRating(data.rating);
      })
      .catch(() => {/* keep default 5.0 */});
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += 0.8;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const displayReviews = [...REVIEWS, ...REVIEWS];

  return (
    <div>
      {/* Header */}
      <div className='flex items-end justify-between mb-8'>
        <div>
          <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-2'>
            Wat onze leden zeggen
          </p>
          <h3 className='text-[#0d1f3c] text-2xl md:text-3xl font-bold tracking-tight'>
            Google Beoordelingen
          </h3>
        </div>
        {/* Live overall rating badge */}
        <div className='hidden sm:flex items-center gap-2'>
          <GoogleIcon />
          <StarRating rating={Math.round(overallRating)} />
          <span className='text-[#0d1f3c]/60 text-sm font-medium'>
            {overallRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Carousel */}
      <div className='relative overflow-hidden'>
        {/* Fade edges */}
        <div className='absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#F7F9FC] to-transparent pointer-events-none' />
        <div className='absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#F7F9FC] to-transparent pointer-events-none' />

        <div
          ref={trackRef}
          className='flex gap-5 overflow-x-scroll'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {displayReviews.map((review, i) => (
            <a
              key={`${review.id}-${i}`}
              href={review.permalink}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-none w-[340px] bg-white rounded-2xl p-6 border border-[#0d1f3c]/8 hover:border-[#1f7bbf]/30 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-3'
            >
              {/* Google icon + stars */}
              <div className='flex items-center justify-between'>
                <GoogleIcon />
                <StarRating rating={review.rating} />
              </div>

              {/* Review text */}
              <p className='text-[#0d1f3c]/70 text-sm leading-relaxed line-clamp-5 flex-1'>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer info */}
              <div>
                <p className='text-[#0d1f3c] text-sm font-semibold'>{review.name}</p>
                <p className='text-[#0d1f3c]/40 text-xs mt-0.5'>{review.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}