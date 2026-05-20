'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';

const contactItems = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Moormannstraat 4, 6663 RD Lent',
    href: 'https://maps.google.com/?q=Moormannstraat+4,+6663+RD+Lent',
  },
  {
    icon: Phone,
    label: 'Telefoon',
    value: '06 46 91 60 76',
    href: 'tel:0646916076',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'info@blue-fit.nl',
    href: 'mailto:info@blue-fit.nl',
  },
  {
    icon: Clock,
    label: 'Openingstijden',
    value: 'Elke dag 06:00 – 23:00',
    href: null,
  },
  {
    icon: Building2,
    label: 'KVK',
    value: '90705211',
    href: null,
  },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/bluefitlent',
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id='contact' className='bg-[#EDF2F8] py-24 px-6 md:px-16'>
      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-14'
        >
          <p className='text-[#1f7bbf] text-xs font-semibold uppercase tracking-widest mb-3'>
            Contact
          </p>
          <h2 className='text-[#0d1f3c] text-4xl md:text-5xl font-bold tracking-tight leading-tight'>
            Kom langs in{' '}
            <span className='text-[#1f7bbf]'>Lent</span>
          </h2>
          <p className='text-[#0d1f3c]/50 mt-4 max-w-xl leading-relaxed'>
            We staan elke dag voor je klaar. Bezoek ons in Lent, bel, of stuur een e-mail
            we horen graag van je.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>

          {/* Left — contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex flex-col gap-4'
          >
            {/* Contact items */}
            <div className='bg-white rounded-2xl border border-[#0d1f3c]/8 shadow-sm overflow-hidden'>
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className={`flex items-start gap-4 px-6 py-5 ${i < contactItems.length - 1 ? 'border-b border-[#0d1f3c]/6' : ''}`}>
                    <div className='w-9 h-9 rounded-xl bg-[#1f7bbf]/10 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Icon size={16} className='text-[#1f7bbf]' strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className='text-[#0d1f3c]/40 text-xs font-semibold uppercase tracking-widest mb-0.5'>
                        {item.label}
                      </p>
                      <p className={`text-[#0d1f3c] font-semibold text-sm leading-snug ${item.href ? 'group-hover:text-[#1f7bbf] transition-colors duration-200' : ''}`}>
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ExternalLink size={14} className='ml-auto text-[#0d1f3c]/20 group-hover:text-[#1f7bbf] transition-colors duration-200 mt-1 flex-shrink-0' />
                    )}
                  </div>
                );

                return item.href ? (
                  <Link href={item.href} key={item.label} className='group block' target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {inner}
                  </Link>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div className='bg-white rounded-2xl border border-[#0d1f3c]/8 shadow-sm px-6 py-5'>
              <p className='text-[#0d1f3c]/40 text-xs font-semibold uppercase tracking-widest mb-4'>
                Volg ons
              </p>
              <div className='flex gap-3'>
                {socials.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className='flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0d1f3c]/5 hover:bg-[#1f7bbf]/10 border border-[#0d1f3c]/8 hover:border-[#1f7bbf]/30 text-[#0d1f3c] hover:text-[#1f7bbf] transition-all duration-200'
                  >
                    {s.icon}
                    <span className='text-sm font-semibold'>{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='flex flex-col gap-4'
          >
            {/* Map embed */}
            <div className='rounded-2xl overflow-hidden border border-[#0d1f3c]/8 shadow-sm' style={{ height: 340 }}>
              <iframe
                src='https://maps.google.com/maps?q=Moormannstraat+4,+6663+RD+Lent&output=embed&hl=nl&z=15'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='BlueFit locatie'
              />
            </div>

            {/* Open in Maps CTA */}
            <Link
              href='https://maps.google.com/?q=Moormannstraat+4,+6663+RD+Lent'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between gap-4 bg-[#1f7bbf] hover:bg-[#1560a8] text-white rounded-2xl px-6 py-5 transition-colors duration-200 group shadow-[0_4px_20px_rgba(31,123,191,0.25)]'
            >
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0'>
                  <MapPin size={18} className='text-white' />
                </div>
                <div>
                  <p className='font-bold text-sm'>Routebeschrijving</p>
                  <p className='text-white/70 text-xs mt-0.5'>Moormannstraat 4, Lent · Openen in Google Maps</p>
                </div>
              </div>
              <ExternalLink size={16} className='text-white/60 group-hover:text-white transition-colors duration-200 flex-shrink-0' />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
