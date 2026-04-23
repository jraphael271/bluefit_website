'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Aanbod', href: '/aanbod' },
  { label: 'Tarieven', href: '/tarieven/abonnementen' },
  { label: 'Over ons', href: '/#over-ons' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('heroExpanded', handler);
    return () => window.removeEventListener('heroExpanded', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
      <nav className='mx-auto flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border-b border-white/10'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2.5'>
          <Image src='/favicon.svg' alt='BlueFit logo' width={32} height={32} />
          <span className='text-white font-bold text-lg tracking-tight'>
            BlueFit
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className='hidden md:flex items-center gap-7'>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className='text-white/80 text-sm font-medium hover:text-white transition-colors duration-200'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side CTAs */}
        <div className='hidden md:flex items-center gap-3'>
          <Link
            href='#'
            className='text-white/80 text-sm font-medium hover:text-white transition-colors duration-200'
          >
            Inloggen
          </Link>
          <Link
            href='#'
            className='px-4 py-2 rounded-full bg-[#1f7bbf] hover:bg-[#1560a8] text-white text-sm font-semibold transition-colors duration-200'
          >
            Proefweek
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className='md:hidden text-white'
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label='Toggle menu'
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden bg-sky-950/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-col gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className='text-white/80 text-sm font-medium hover:text-white transition-colors duration-200'
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href='#'
            className='text-white/80 text-sm font-medium hover:text-white transition-colors duration-200'
            onClick={() => setMobileOpen(false)}
          >
            Inloggen
          </Link>
          <Link
            href='#'
            className='px-4 py-2 rounded-full bg-[#1f7bbf] hover:bg-[#1560a8] text-white text-sm font-semibold text-center transition-colors duration-200'
            onClick={() => setMobileOpen(false)}
          >
            Proefweek
          </Link>
        </div>
      )}
    </header>
  );
}
