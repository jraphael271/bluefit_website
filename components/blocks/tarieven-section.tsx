'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';

const plans = [
  {
    id: 'light-blue',
    name: 'Light Blue',
    price: '46',
    period: '4 weken',
    tagline: 'Ideaal voor daluren',
    popular: false,
    features: [
      'Onbeperkt toegang van 10:00–16:00',
      'Weekendtoegang tot 23:00',
      'Alle faciliteiten van Blue',
      'Functionele zone',
      'Cardio & smart apparatuur',
    ],
    cta: 'Kies Light Blue',
    ctaHref: '#',
  },
  {
    id: 'blue',
    name: 'Blue',
    price: '56',
    period: '4 weken',
    tagline: 'Meest gekozen',
    popular: true,
    features: [
      'Gymtoegang van 06:00–23:00',
      'Onbeperkte groepslessen binnen & buiten',
      'Functionele zone',
      'Periodieke persoonlijke metingen',
      'Cardio & smart apparatuur',
      'Voedingsadvies',
    ],
    cta: 'Kies Blue',
    ctaHref: '#',
  },
  {
    id: 'blue-flex',
    name: 'Blue Flex',
    price: '63',
    period: '4 weken',
    tagline: 'Maximale flexibiliteit',
    popular: false,
    features: [
      'Alles van Blue',
      'Per 4 weken opzegbaar',
      'Flexibel bevriezen',
    ],
    cta: 'Kies Blue Flex',
    ctaHref: '#',
  },
  {
    id: 'try',
    name: 'Proefweek',
    price: '0',
    period: 'eerste week',
    tagline: 'Probeer gratis',
    popular: false,
    accent: true,
    features: [
      'Één week gratis kennismaken',
      'Daarna €56/4 weken (Blue)',
      'Tijdens begeleidingsuren',
    ],
    cta: 'Start gratis',
    ctaHref: '#',
  },
];

const specials = [
  { name: 'Bootcamp', price: '28', note: 'Buiten groepstraining' },
  { name: 'Blue Icons', price: '29,50', note: '55+ seniorenfitness' },
  { name: 'Blue Stars', price: '30', note: 'Kinderdansles (3–9 jr)' },
  { name: 'Mama Flow', price: '30', note: 'Pre/postnatale fitness' },
  { name: 'Dagpas', price: '16,50', note: 'Eenmalige toegang' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function TarievenSection() {
  return (
    <section id='tarieven' className='bg-[#EDF2F8] py-24 px-6 md:px-16'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='max-w-7xl mx-auto mb-16'
      >
        <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
          Tarieven
        </p>
        <h2 className='text-[#0d1f3c] text-4xl md:text-5xl font-bold tracking-tight leading-tight'>
          Kies het abonnement{' '}
          <span className='text-[#1f7bbf]'>dat bij jou past</span>
        </h2>
        <p className='text-[#0d1f3c]/50 mt-4 max-w-xl leading-relaxed'>
          Bij BlueFit sport je 365 dagen per jaar, volg je onbeperkt groepslessen, gebruik je moderne apparatuur en kun je altijd bij ons terecht met je vragen. Of je nu kiest voor fitness, groepslessen of personal training: er is altijd een abonnement dat bij jou past.
        </p>
      </motion.div>

      {/* Main plan cards */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            custom={i}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className={`relative rounded-2xl flex flex-col p-7 border transition-shadow duration-300 ${
              plan.popular
                ? 'bg-[#1f7bbf] border-[#3a9bd5] shadow-[0_8px_40px_rgba(31,123,191,0.30)]'
                : plan.accent
                ? 'bg-white border-[#1f7bbf]/30 hover:border-[#1f7bbf]/60 shadow-sm hover:shadow-md'
                : 'bg-white border-[#0d1f3c]/8 hover:border-[#0d1f3c]/18 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                <span className='inline-flex items-center gap-1 bg-white text-[#1f7bbf] text-xs font-bold px-3 py-1 rounded-full shadow-sm'>
                  <Star size={10} fill='currentColor' /> Meest gekozen
                </span>
              </div>
            )}

            {/* Plan name & tagline */}
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? 'text-white/70' : 'text-[#1f7bbf]'}`}>
              {plan.tagline}
            </p>
            <h3 className={`text-2xl font-bold mb-5 ${plan.popular ? 'text-white' : 'text-[#0d1f3c]'}`}>
              {plan.name}
            </h3>

            {/* Price */}
            <div className='mb-6'>
              <div className='flex items-end gap-1.5'>
                {plan.price === '0' ? (
                  <span className={`text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-[#0d1f3c]'}`}>
                    Gratis
                  </span>
                ) : (
                  <>
                    <span className={`text-lg font-semibold mt-1 ${plan.popular ? 'text-white/80' : 'text-[#0d1f3c]/50'}`}>€</span>
                    <span className={`text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-[#0d1f3c]'}`}>
                      {plan.price}
                    </span>
                  </>
                )}
              </div>
              <p className={`text-sm mt-0.5 ${plan.popular ? 'text-white/60' : 'text-[#0d1f3c]/40'}`}>
                per {plan.period}
              </p>
            </div>

            {/* Features */}
            <ul className='flex flex-col gap-2.5 mb-8 flex-1'>
              {plan.features.map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <Check
                    size={14}
                    className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#1f7bbf]'}`}
                    strokeWidth={3}
                  />
                  <span className={`text-sm leading-snug ${plan.popular ? 'text-white/85' : 'text-[#0d1f3c]/60'}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={plan.ctaHref}
              className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                plan.popular
                  ? 'bg-white text-[#1f7bbf] hover:bg-white/90'
                  : plan.accent
                  ? 'bg-[#1f7bbf] text-white hover:bg-[#1560a8]'
                  : 'bg-[#0d1f3c]/6 text-[#0d1f3c] hover:bg-[#0d1f3c]/12 border border-[#0d1f3c]/10'
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Special subscriptions row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='max-w-7xl mx-auto'
      >
        <p className='text-[#0d1f3c]/40 text-xs uppercase tracking-widest font-semibold mb-4'>
          Speciale abonnementen
        </p>
        <div className='flex flex-wrap gap-3'>
          {specials.map((s) => (
            <Link
              key={s.name}
              href='#'
              className='flex items-center gap-3 bg-white hover:bg-[#1f7bbf]/5 border border-[#0d1f3c]/8 hover:border-[#1f7bbf]/30 rounded-xl px-5 py-3 transition-all duration-200 group shadow-sm'
            >
              <div>
                <p className='text-[#0d1f3c] text-sm font-semibold'>{s.name}</p>
                <p className='text-[#0d1f3c]/40 text-xs'>{s.note}</p>
              </div>
              <span className='text-[#1f7bbf] text-sm font-bold ml-2'>€{s.price}</span>
              <ArrowRight size={13} className='text-[#0d1f3c]/25 group-hover:text-[#1f7bbf] transition-colors ml-1' />
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
