"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const faq = [
  {
    q: "Voor wie is relax massage geschikt?",
    a: "Niet alleen voor fanatieke sporters. Als je last hebt van rug-, schouder- of nekklachten door werk, kan massage ook verlichting bieden.",
  },
  {
    q: "Doet een relax massage pijn?",
    a: "Het kan soms wat gevoelig zijn, vooral rond spierknopen. Maar de masseur stemt de intensiteit altijd af op jouw lichaam.",
  },
  {
    q: "Hoe vaak is een relax massage aan te raden?",
    a: "Dat hangt af van je training en werkdruk. Fanatieke sporters kiezen vaak voor een massage elke 2–4 weken. Bij klachten kunnen vaker sessies gunstig zijn.",
  },
  {
    q: "Helpt relax massage bij het voorkomen van blessures?",
    a: "Ja, het helpt spanning te verminderen, de doorbloeding te verbeteren en zo blessures te voorkomen of herstel te versnellen.",
  },
  {
    q: "Kan ik een relax massage boeken bij Blue Fit zonder lid te zijn?",
    a: "Ja, relax massage in Lent is ook beschikbaar voor niet-leden uit Nijmegen en omgeving.",
  },
];

function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left text-slate-900 font-semibold
                   hover:text-[#1768E5] transition-colors duration-150 focus-visible:outline-none focus-visible:text-[#1768E5]"
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 leading-[1.75]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RelaxPage() {
  return (
    <main className="bg-[#F8FAFF] text-slate-900 min-h-screen font-sans overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/B036.jpg"
            alt="Relax massage bij Blue Fit"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[#1768E5]/15 mix-blend-multiply" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="grain-relax">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-relax)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-6"
          >
            <Link href="/aanbod" className="hover:text-white transition-colors duration-150">Aanbod</Link>
            <span>/</span>
            <span className="text-white">Relax Massage</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Relax Massage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Herstel en{" "}
            <span className="text-[#60A5FA]">ontspanning bij Blue Fit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white/65 leading-[1.7] text-xl max-w-2xl"
          >
            Last van spierpijn, spanning of wil je gewoon volledig ontspannen? Bij Blue Fit Lent werken wij samen met een ervaren ontspanningsmasseur die helpt bij herstel, ontspanning en blessurepreventie. Zo voel je je fitter en herstel je sneller na je trainingen.
          </motion.p>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Relax Massage bij Blue Fit</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Wat kun je verwachten
            </h2>
            <p className="text-slate-500 leading-[1.75] mb-5">
              Onze masseur ontvangt je in zijn eigen praktijk in Lent, waar je terechtkunt voor professionele, op maat gemaakte behandelingen. Wij verbinden je graag met hem, zodat jij eenvoudig een afspraak kunt maken.
            </p>

            {/* Note callout */}
            <div
              className="rounded-2xl px-5 py-4 mb-5 border border-[#1768E5]/20 bg-[#1768E5]/5"
            >
              <p className="text-sm text-slate-700 leading-[1.7]">
                <span className="font-semibold text-[#1768E5]">Let op: </span>
                De masseur werkt zelfstandig en buiten Blue Fit. Massages worden direct bij hem geboekt en betaald, maar dankzij onze samenwerking weet je dat je in goede handen bent.
              </p>
            </div>

            <p className="text-slate-500 leading-[1.75]">
              Tijdens een Relax Massage richt onze masseur zich op jouw herstel. De massage stimuleert de doorbloeding, voert afvalstoffen sneller af en helpt spierknopen te verminderen. Of je nu intensief sport of gewoon spanning ervaart van werk of stress — massage helpt je om weer soepel en energiek te bewegen.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Benefits */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Voordelen</h3>
              <ul className="space-y-3">
                {[
                  "Bevordert sneller spierherstel",
                  "Voorkomt en vermindert blessures",
                  "Vermindert spierpijn en stijfheid",
                  "Verbetert doorbloeding en mobiliteit",
                  "Ontspannend bij stress of spanning",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#1768E5]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical info */}
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Doel", value: "Spierherstel, ontspanning & blessurepreventie" },
                { label: "Duur", value: "60 min per sessie" },
                { label: "Begeleiding", value: "Gecertificeerde masseur" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-1"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}
                >
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Veelgestelde vragen</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">Alles over relax massage</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {faq.map((item) => (
            <FaqAccordion key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#1768E5] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">Klaar voor jouw eerste massage?</h2>
          <p className="text-white/75 leading-[1.7] mb-8 text-lg">
            Neem contact op via de balie en wij verbinden je met onze masseur. Ook toegankelijk voor niet-leden.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1768E5] px-8 py-4 rounded-full text-sm font-bold
                       transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Neem contact op
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
