'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Activity, Leaf, Compass, Users } from 'lucide-react';
import InstagramCarousel from './instagram-carousel';
import GoogleReviewsCarousel from './google-reviews-carousel';

const values = [
  {
    id: 'bewegen',
    icon: Activity,
    title: 'Bewegen',
    body: 'Bij BlueFit geloven we dat beweging de basis is van een vitaal leven. Of het nu een intensieve workout is, een wandeling in de natuur of een speelse training met anderen beweging geeft energie, zelfvertrouwen en balans. We stimuleren een actieve levensstijl op een manier die bij jou past: duurzaam en met plezier.',
  },
  {
    id: 'voeding',
    icon: Leaf,
    title: 'Gezonde Voeding',
    body: 'Gezonde voeding is brandstof voor lichaam en geest. We helpen je bewuste keuzes te maken die niet draaien om strikte regels, maar om balans en genot. Met kennis, inspiratie en praktische tips maken we gezond eten haalbaar en leuk elke dag.',
  },
  {
    id: 'purpose',
    icon: Compass,
    title: 'Purpose',
    body: 'Echte vitaliteit komt van binnenuit. BlueFit gaat verder dan alleen fysiek fit zijn: het gaat ook om zingeving, groei en doen wat je écht gelukkig maakt. Samen ontdekken we wat jou drijft, zodat je met energie en betekenis leeft.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community',
    body: 'Bij BlueFit doen we het samen. Onze community is een plek van verbinding, motivatie en ondersteuning. We delen successen, overwinnen uitdagingen en inspireren elkaar om elke dag een beetje fitter, sterker en gelukkiger te worden. Want samen ga je verder.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function OverOnsSection() {
  return (
    <section id='over-ons' className='bg-[#F7F9FC] py-24 px-6 md:px-16'>
      <div className='max-w-7xl mx-auto'>

        {/* Mission block — heading full width, then photo + text side by side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className='mb-12'
        >
          <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-4'>
            Over Ons
          </p>
          <h2 className='text-[#0d1f3c] text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6'>
            Meer dan een gym.{' '}
            <span className='text-[#1f7bbf]'>Jouw Blue Zone</span>{' '}
            aan de Waal.
          </h2>
          <div className='inline-flex items-center gap-3 bg-white border border-[#0d1f3c]/8 rounded-full px-5 py-2.5 shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-[#1f7bbf] flex-shrink-0' />
            <span className='text-[#0d1f3c]/60 text-sm font-medium'>Opgericht in Lent, 2025</span>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
          {/* Team photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='relative h-[480px] rounded-2xl overflow-hidden shadow-lg'
          >
            <Image
              src='/photos/team.jpeg'
              alt='Het BlueFit team'
              fill
              className='object-cover' style={{ objectPosition: '50% 70%' }}
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0d1f3c]/30 via-transparent to-transparent' />
          </motion.div>

          {/* Mission text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='flex flex-col gap-5'
          >
            <p className='text-[#0d1f3c]/65 text-lg leading-relaxed'>
              BlueFit is opgericht met één duidelijke missie: een sportschool creëren waar gezondheid verder gaat dan alleen trainen. Geïnspireerd door de principes van de Blue Zones gebieden in de wereld waar mensen langer en gezonder leven bouwen we een plek waar beweging, voeding, zingeving en verbinding samenkomen.
            </p>
            <p className='text-[#0d1f3c]/65 leading-relaxed'>
              We willen meer zijn dan een gym. BlueFit is een community waar mensen elkaar motiveren, inspireren en ondersteunen op weg naar een gezond, gelukkig en betekenisvol leven.
            </p>
            <blockquote className='mt-2 pl-5 border-l-2 border-[#1f7bbf]'>
              <p className='text-[#0d1f3c] font-semibold leading-snug italic'>
                &ldquo;BlueFit wil de Blue Zone aan de Waal creëren een plek waar mensen samen werken aan een duurzame levensstijl.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Divider */}
        <div className='border-t border-[#0d1f3c]/8 mb-16' />

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-10'
        >
          <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-2'>
            Onze kernwaarden
          </p>
          <h3 className='text-[#0d1f3c] text-2xl md:text-3xl font-bold tracking-tight'>
            De vier pijlers van BlueFit
          </h3>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                custom={i}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className='bg-white rounded-2xl p-7 border border-[#0d1f3c]/8 hover:border-[#1f7bbf]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4'
              >
                {/* Icon circle */}
                <div className='w-11 h-11 rounded-xl bg-[#1f7bbf]/10 flex items-center justify-center flex-shrink-0'>
                  <Icon size={20} className='text-[#1f7bbf]' strokeWidth={1.8} />
                </div>

                <div>
                  <h4 className='text-[#0d1f3c] text-lg font-bold mb-2'>{v.title}</h4>
                  <p className='text-[#0d1f3c]/55 text-sm leading-relaxed'>{v.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Instagram carousel */}
        <div className='mt-20 border-t border-[#0d1f3c]/8 pt-16'>
          <InstagramCarousel />
        </div>

        {/* Google Reviews carousel */}
        <div className='mt-16 border-t border-[#0d1f3c]/8 pt-16'>
          <GoogleReviewsCarousel />
        </div>

      </div>
    </section>
  );
}
