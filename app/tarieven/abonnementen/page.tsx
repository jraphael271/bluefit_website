'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/blocks/navbar';

/* ─── Data ─── */

const mainPlans = [
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
    cta: 'Start jouw proefweek',
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
  },
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
  },
  {
    id: 'light-blue-flex',
    name: 'Light Blue Flex',
    price: '46',
    period: '4 weken',
    tagline: 'Daluren + flexibel',
    popular: false,
    features: [
      'Alles van Light Blue',
      'Per 4 weken opzegbaar',
      'Flexibel bevriezen',
    ],
    cta: 'Kies Light Blue Flex',
  },
];

const groupPlans = [
  {
    id: 'bootcamp',
    name: 'Bootcamp',
    price: '28',
    period: '4 weken',
    description: 'Buiten groepstraining met gebruik van trappen, bankjes, heuvels en meer. Eenvoudig te upgraden naar een fitnessabonnement.',
    features: [
      'Buiten groepstraining',
      'Gebruik van trappen, bankjes & heuvels',
      'Eenvoudig omzetten naar fitnessabonnement',
    ],
  },
  {
    id: 'blue-icons',
    name: 'Blue Icons',
    price: '29,50',
    period: '4 weken',
    description: 'Laagdrempelige seniorenfitness 1–2 keer per week, gericht op vitaliteit en balans.',
    features: [
      '1–2 lessen per week',
      'Gericht op vitaliteit & balans',
      'Sociale en vertrouwde omgeving',
    ],
  },
  {
    id: 'blue-stars',
    name: 'Blue Stars',
    price: '30',
    period: '4 weken',
    note: '€15 voor leden',
    description: 'Kinderdansles speciaal voor kinderen van 3–9 jaar.',
    features: [
      'Kinderdans voor 3–9 jaar',
      '€15 per 4 weken voor bestaande leden',
      'Hip-hop, modern & meer',
    ],
  },
  {
    id: 'mama-flow',
    name: 'Mama Flow',
    price: '30',
    period: '4 weken',
    description: 'Veilig sporten tijdens of na de zwangerschap.',
    features: [
      'Pre- en postnatale fitness',
      'Gericht op bekkenbodem & herstel',
      'Klein en persoonlijk',
    ],
  },
];

const extraOptions = [
  {
    id: 'try',
    name: 'Proefweek',
    price: 'Gratis',
    description: 'Één week gratis kennismaken. Daarna €56/4 weken (Blue). Alleen tijdens begeleidingsuren.',
  },
  {
    id: 'dagpas',
    name: 'Dagpas',
    price: '€16,50',
    description: 'Eenmalige toegang tot alle faciliteiten. Kosten worden verrekend bij lidmaatschap. Ook toegang tot groepslessen.',
  },
];

const faqs = [
  {
    q: 'Kan ik mijn abonnement pauzeren?',
    a: 'Ja, met een flex-abonnement kun je je lidmaatschap tijdelijk bevriezen.',
  },
  {
    q: 'Wat is het verschil tussen Blue en Light Blue?',
    a: 'Met Light Blue sport je tijdens daluren (10:00–16:00) en in het weekend. Blue geeft toegang van 06:00–23:00, 7 dagen per week.',
  },
  {
    q: 'Kan ik eerst proberen?',
    a: 'Ja, met Try Blue sport je een gratis week. Daarna schakelt het automatisch over naar een Blue-abonnement zonder opzegging. Je kunt ook een dagpas nemen, die wordt verrekend bij lidmaatschap.',
  },
  {
    q: 'Zijn groepslessen inbegrepen in mijn abonnement?',
    a: 'Ja, alle groepslessen zijn inbegrepen bij Blue en Flex. Voor speciale lessen zoals Mama Flow en Bootcamp zijn aparte groepsabonnementen beschikbaar.',
  },
  {
    q: 'Wat kost een dagpas?',
    a: 'Een dagpas kost €16,50. Als je daarna lid wordt, verrekenen we de kosten met je eerste betaling.',
  },
  {
    q: 'Kan ik een abonnement voor alleen groepslessen of alleen fitness afsluiten?',
    a: 'Nee, wanneer je bij ons bent heb je de mogelijkheid gebruik te maken van al onze faciliteiten.',
  },
  {
    q: 'Hoe zeg ik mijn abonnement op?',
    a: 'Je kunt je abonnement opzeggen via e-mail. Je abonnement wordt dan opgezegd met een opzegtermijn van 28 dagen, tenzij je een jaarcontract hebt.',
  },
  {
    q: 'Wat zijn de openingstijden?',
    a: 'We zijn 365 dagen per jaar open van 6:00 tot 23:00.',
  },
];

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── Components ─── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className='w-full text-left border-b border-[#0d1f3c]/10 py-5 group'
      onClick={() => setOpen(!open)}
    >
      <div className='flex items-start justify-between gap-4'>
        <span className='text-[#0d1f3c] font-semibold leading-snug'>{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[#1f7bbf] mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <p className='mt-3 text-[#0d1f3c]/55 text-sm leading-relaxed'>{a}</p>
      )}
    </button>
  );
}

/* ─── Page ─── */

export default function AbonnementenPage() {
  return (
    <>
      <Navbar forceVisible />
      <main className='bg-[#F7F9FC] min-h-screen'>

        {/* Hero banner */}
        <div className='relative overflow-hidden pt-32 pb-20 px-6 md:px-16 bg-gradient-to-b from-[#EDF2F8] to-[#F7F9FC]'>
          <div className='absolute inset-0 opacity-10'
            style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #1f7bbf 0%, transparent 60%)' }} />
          <div className='max-w-7xl mx-auto relative'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
                Tarieven
              </p>
              <h1 className='text-[#0d1f3c] text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5'>
                Gym abonnementen{' '}
                <span className='text-[#1f7bbf]'>in Lent</span>
              </h1>
              <p className='text-[#0d1f3c]/55 text-lg max-w-2xl leading-relaxed mb-8'>
                365 dagen per jaar sporten, onbeperkte groepslessen en altijd begeleiding —
                alles onder één dak bij BlueFit. Kies het abonnement dat bij jou past.
              </p>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='#abonnementen'
                  className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1f7bbf] hover:bg-[#1560a8] text-white font-semibold text-sm transition-colors duration-200'
                >
                  Bekijk abonnementen <ArrowRight size={15} />
                </Link>
                <Link
                  href='#faq'
                  className='inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0d1f3c]/12 bg-white hover:bg-[#0d1f3c]/5 text-[#0d1f3c] font-semibold text-sm transition-colors duration-200'
                >
                  Veelgestelde vragen
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Blue Fit strip */}
        <div className='border-y border-[#0d1f3c]/8 py-10 px-6 md:px-16 bg-white'>
          <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { label: '365 dagen open', sub: 'Van 06:00 tot 23:00' },
              { label: 'Onbeperkte lessen', sub: '15+ groepslessen per week' },
              { label: 'Smart apparatuur', sub: 'Kracht & cardio' },
              { label: 'Proefweek gratis', sub: 'Geen verplichtingen' },
            ].map((item) => (
              <div key={item.label}>
                <p className='text-[#0d1f3c] font-bold text-lg'>{item.label}</p>
                <p className='text-[#0d1f3c]/40 text-sm mt-0.5'>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main fitness subscriptions */}
        <section id='abonnementen' className='py-20 px-6 md:px-16'>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-12'
            >
              <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
                Fitness & Groepslessen
              </p>
              <h2 className='text-[#0d1f3c] text-3xl md:text-4xl font-bold tracking-tight'>
                Kies jouw abonnement
              </h2>
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
              {mainPlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  custom={i}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  className={`relative rounded-2xl flex flex-col p-7 border transition-shadow duration-300 ${
                    plan.popular
                      ? 'bg-[#1f7bbf] border-[#3a9bd5] shadow-[0_8px_40px_rgba(31,123,191,0.28)]'
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
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? 'text-white/70' : 'text-[#1f7bbf]'}`}>
                    {plan.tagline}
                  </p>
                  <h3 className={`text-2xl font-bold mb-5 ${plan.popular ? 'text-white' : 'text-[#0d1f3c]'}`}>{plan.name}</h3>
                  <div className='mb-6'>
                    <div className='flex items-end gap-1.5'>
                      <span className={`text-lg font-semibold mt-1 ${plan.popular ? 'text-white/80' : 'text-[#0d1f3c]/50'}`}>€</span>
                      <span className={`text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-[#0d1f3c]'}`}>{plan.price}</span>
                    </div>
                    <p className={`text-sm mt-0.5 ${plan.popular ? 'text-white/60' : 'text-[#0d1f3c]/40'}`}>per {plan.period}</p>
                  </div>
                  <ul className='flex flex-col gap-2.5 mb-8 flex-1'>
                    {plan.features.map((f) => (
                      <li key={f} className='flex items-start gap-2.5'>
                        <Check size={14} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#1f7bbf]'}`} strokeWidth={3} />
                        <span className={`text-sm leading-snug ${plan.popular ? 'text-white/85' : 'text-[#0d1f3c]/60'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href='#'
                    className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-white text-[#1f7bbf] hover:bg-white/90'
                        : 'bg-[#0d1f3c]/6 text-[#0d1f3c] hover:bg-[#0d1f3c]/12 border border-[#0d1f3c]/10'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Group class subscriptions */}
        <section className='py-20 px-6 md:px-16 bg-[#EDF2F8]'>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-12'
            >
              <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
                Speciale abonnementen
              </p>
              <h2 className='text-[#0d1f3c] text-3xl md:text-4xl font-bold tracking-tight'>
                Groepslessen abonnementen
              </h2>
              <p className='text-[#0d1f3c]/45 mt-3 max-w-xl text-sm leading-relaxed'>
                Naast onze reguliere abonnementen bieden we aparte abonnementen aan voor specifieke programma's.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
              {groupPlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  custom={i}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  className='bg-white border border-[#0d1f3c]/8 hover:border-[#0d1f3c]/18 rounded-2xl p-7 flex flex-col transition-all duration-300 shadow-sm hover:shadow-md'
                >
                  <h3 className='text-[#0d1f3c] text-xl font-bold mb-1'>{plan.name}</h3>
                  {plan.note && (
                    <span className='text-[#1f7bbf] text-xs font-semibold mb-3'>{plan.note}</span>
                  )}
                  <div className='mb-4'>
                    <div className='flex items-end gap-1'>
                      <span className='text-[#0d1f3c]/50 text-base font-semibold mt-1'>€</span>
                      <span className='text-4xl font-black tracking-tight text-[#0d1f3c]'>{plan.price}</span>
                    </div>
                    <p className='text-[#0d1f3c]/40 text-xs mt-0.5'>per {plan.period}</p>
                  </div>
                  <p className='text-[#0d1f3c]/50 text-sm leading-relaxed mb-5 flex-1'>{plan.description}</p>
                  <ul className='flex flex-col gap-2 mb-6'>
                    {plan.features.map((f) => (
                      <li key={f} className='flex items-start gap-2'>
                        <Check size={13} className='mt-0.5 flex-shrink-0 text-[#1f7bbf]' strokeWidth={3} />
                        <span className='text-[#0d1f3c]/55 text-xs leading-snug'>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href='#'
                    className='w-full text-center py-2.5 rounded-xl text-sm font-bold bg-[#0d1f3c]/6 text-[#0d1f3c] hover:bg-[#0d1f3c]/12 border border-[#0d1f3c]/10 transition-all duration-200'
                  >
                    Meer info
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra options */}
        <section className='py-20 px-6 md:px-16'>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-10'
            >
              <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
                Eerst uitproberen?
              </p>
              <h2 className='text-[#0d1f3c] text-3xl md:text-4xl font-bold tracking-tight'>
                Extra opties
              </h2>
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {extraOptions.map((opt, i) => (
                <motion.div
                  key={opt.id}
                  custom={i}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className='bg-white border border-[#1f7bbf]/20 hover:border-[#1f7bbf]/50 rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 shadow-sm hover:shadow-md'
                >
                  <div className='flex-1'>
                    <h3 className='text-[#0d1f3c] text-xl font-bold mb-2'>{opt.name}</h3>
                    <p className='text-[#0d1f3c]/50 text-sm leading-relaxed'>{opt.description}</p>
                  </div>
                  <div className='flex-shrink-0 text-right md:text-left'>
                    <p className='text-[#1f7bbf] text-3xl font-black'>{opt.price}</p>
                    <Link
                      href='#'
                      className='mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1f7bbf] hover:bg-[#1560a8] text-white text-sm font-bold transition-colors duration-200'
                    >
                      {opt.id === 'try' ? 'Start gratis' : 'Koop dagpas'} <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id='faq' className='py-20 px-6 md:px-16 bg-[#EDF2F8]'>
          <div className='max-w-3xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='mb-12 text-center'
            >
              <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
                Veelgestelde vragen
              </p>
              <h2 className='text-[#0d1f3c] text-3xl md:text-4xl font-bold tracking-tight'>
                Alles wat je wilt weten
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className='py-24 px-6 md:px-16 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl mx-auto'
          >
            <h2 className='text-[#0d1f3c] text-3xl md:text-4xl font-bold tracking-tight mb-4'>
              Klaar om te beginnen?
            </h2>
            <p className='text-[#0d1f3c]/50 leading-relaxed mb-8'>
              Probeer BlueFit een week gratis. Geen verplichtingen, geen creditcard nodig.
              Ervaar zelf wat sporten bij BlueFit in Lent betekent.
            </p>
            <div className='flex flex-wrap justify-center gap-3'>
              <Link
                href='#'
                className='inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1f7bbf] hover:bg-[#1560a8] text-white font-semibold transition-colors duration-200'
              >
                Start jouw proefweek <ArrowRight size={16} />
              </Link>
              <Link
                href='/'
                className='inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#0d1f3c]/12 bg-white hover:bg-[#0d1f3c]/5 text-[#0d1f3c] font-semibold transition-colors duration-200'
              >
                Terug naar home
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}
