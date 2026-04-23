'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const offerings = [
  {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'Kracht · Cardio · Functioneel',
    description:
      'Bij BlueFit geloven we dat fitness meer is dan alleen bewegen. Het gaat om duurzame beweging, plezier en werken aan een sterk en gezond lichaam. Onze trainers zijn er om te luisteren, te begeleiden en te motiveren.',
    image: '/offer-massage.jpg',
    href: '/aanbod/fitness',
    note: null,
  },
  {
    id: 'groepslessen',
    title: 'Groepslessen',
    subtitle: '15+ lessen per week',
    description:
      'Bij BlueFit sport je samen! Of je nu zweet bij Sky High (HIIT), kracht opbouwt met Iron Pump, ontspant tijdens Ocean Flow (Yoga) of energie haalt uit Blue Beats (Zumba) — er is altijd een les die bij jou past.',
    image: '/offer-groepslessen.jpg',
    href: '/aanbod/groepslessen',
    note: null,
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    subtitle: '1-op-1 coaching op maat',
    description:
      'Wil je snellere resultaten, meer motivatie en persoonlijke aandacht? Bij BlueFit Lent verbinden we je met personal trainers die samen met jou werken aan jouw gezondheid, kracht en fitness — allemaal onder het BlueFit-dak.',
    image: '/offer-personal-training.jpg',
    href: '/aanbod/personal-training',
    note: 'Aangeboden door zelfstandige ondernemer',
  },
  {
    id: 'voeding',
    title: 'Voedingsadvies',
    subtitle: 'Orthomoleculaire begeleiding',
    description:
      'Gezonde voeding is de basis van een fit en energiek leven. Met voedingsadvies bij BlueFit krijg je begeleiding van een orthomoleculaire voedingsdeskundige die samen met jou kijkt naar jouw levensstijl, doelen en uitdagingen.',
    image: '/offer-voeding.jpg',
    href: '/aanbod/voeding',
    note: 'Aangeboden door zelfstandige deskundige',
  },
  {
    id: 'massage',
    title: 'Relax Massage',
    subtitle: 'Herstel & ontspanning',
    description:
      'Last van spierpijn of spanning, of gewoon volledig ontspannen? Bij BlueFit Lent werken we samen met een ervaren ontspanningsmasseur die helpt bij herstel, ontspanning en het voorkomen van blessures.',
    image: '/offer-fitness.jpg',
    href: '/aanbod/relax-massage',
    note: 'Aangeboden door zelfstandige masseur',
  },
];

const CARD_WIDTH = 400;
const CARD_GAP = 20;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

function OfferCard({ offering }: { offering: (typeof offerings)[number] }) {
  return (
    <Link
      href={offering.href}
      className='group relative flex-none rounded-2xl overflow-hidden'
      style={{ width: CARD_WIDTH, height: 500 }}
    >
      <Image
        src={offering.image}
        alt={offering.title}
        fill
        className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
      />
      {/* gradient */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#071830]/95 via-[#071830]/40 to-transparent' />
      <div className='absolute inset-0 bg-[#1560a8]/15 mix-blend-multiply' />

      {/* content */}
      <div className='absolute bottom-0 left-0 right-0 p-7'>
        <p className='text-[#7ec8f4] text-xs font-semibold uppercase tracking-widest mb-1.5'>
          {offering.subtitle}
        </p>
        <h3 className='text-white text-2xl font-bold tracking-tight mb-2.5'>
          {offering.title}
        </h3>
        <p className='text-white/65 text-sm leading-relaxed mb-4'>
          {offering.description}
        </p>
        {offering.note && (
          <p className='text-white/35 text-xs italic mb-3'>{offering.note}</p>
        )}
        <span className='inline-flex items-center gap-1.5 text-[#7ec8f4] text-sm font-semibold group-hover:gap-3 transition-all duration-300'>
          Meer weten <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function AanbodSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pause = (ms = 3000) => {
    pausedRef.current = true;
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += 0.6;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current!);
      clearTimeout(resumeTimeout.current);
    };
  }, []);

  const scrollPrev = () => {
    pause();
    trackRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  };

  const scrollNext = () => {
    pause();
    trackRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section id='aanbod' className='bg-[#F7F9FC] py-24'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='px-6 md:px-16 mb-12 max-w-7xl mx-auto'
      >
        <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
          Wat wij bieden
        </p>
        <div className='flex items-end justify-between gap-4'>
          <h2 className='text-[#0d1f3c] text-4xl md:text-5xl font-bold tracking-tight leading-tight'>
            Alles voor jouw{' '}
            <span className='text-[#1f7bbf]'>gezonde leven</span>
          </h2>
          {/* Arrow buttons */}
          <div className='flex gap-3 flex-shrink-0'>
            <button
              onClick={scrollPrev}
              className='w-11 h-11 rounded-full border border-[#0d1f3c]/12 bg-white hover:bg-[#0d1f3c]/5 text-[#0d1f3c] flex items-center justify-center transition-colors duration-200 shadow-sm'
              aria-label='Vorige'
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className='w-11 h-11 rounded-full border border-[#0d1f3c]/12 bg-white hover:bg-[#0d1f3c]/5 text-[#0d1f3c] flex items-center justify-center transition-colors duration-200 shadow-sm'
              aria-label='Volgende'
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Carousel track */}
      <div className='relative'>
        {/* Fade edges */}
        <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F7F9FC] to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F7F9FC] to-transparent z-10 pointer-events-none' />

        <div
          ref={trackRef}
          className='flex overflow-x-hidden pl-6 md:pl-16'
          style={{ gap: CARD_GAP, scrollbarWidth: 'none', paddingRight: 64 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Duplicate for seamless loop */}
          {[...offerings, ...offerings].map((o, i) => (
            <OfferCard key={`${o.id}-${i}`} offering={o} />
          ))}
        </div>
      </div>
    </section>
  );
}
