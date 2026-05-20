"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const testimonials = [
  {
    quote: "Ik probeerde al jaren af te vallen, maar niets werkte. Met de begeleiding van de diëtist bij Blue Fit ben ik 12 kilo afgevallen en voel ik me energieker.",
    author: "Anouk",
    age: 42,
  },
  {
    quote: "Het voedingsplan gaf me meer balans in mijn dag. Ik eet nu gevarieerder en merk dat ik na mijn trainingen beter herstel.",
    author: "David",
    age: 36,
  },
  {
    quote: "Het was fijn dat er rekening werd gehouden met mijn drukke werk- en gezinsleven. Kleine aanpassingen maakten al een groot verschil.",
    author: "Eva",
    age: 33,
  },
];

const faq = [
  {
    q: "Is voedingsadvies alleen voor afvallen?",
    a: "Nee, onze voedingsdeskundige in Lent helpt ook bij spieropbouw, sportvoeding, medische klachten of simpelweg gezonder eten.",
  },
  {
    q: "Hoe verloopt een afspraak bij de voedingsdeskundige?",
    a: "Tijdens de intake bespreken we jouw doelen, leefstijl en voedingspatroon. Daarna ontvang je een persoonlijk plan op maat aan de hand van onze weegschaal.",
  },
  {
    q: "Kan ik voedingsadvies combineren met personal training?",
    a: "Absoluut. Juist de combinatie van voeding en training zorgt voor de beste resultaten.",
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

export default function VoedingPage() {
  return (
    <main className="bg-[#F8FAFF] text-slate-900 min-h-screen font-sans overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/B007.jpg"
            alt="Voedingsadvies bij Blue Fit"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[#1768E5]/15 mix-blend-multiply" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="grain-voeding">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-voeding)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-6"
          >
            <Link href="/#aanbod" className="hover:text-white transition-colors duration-150">Aanbod</Link>
            <span>/</span>
            <span className="text-white">Voeding</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Voeding
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Voedingsadvies{" "}
            <span className="text-[#60A5FA]">bij Blue Fit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white/65 leading-[1.7] text-xl max-w-2xl"
          >
            Persoonlijk voedingsadvies van een orthomoleculaire diëtist — afgestemd op jouw
            doelen, leefstijl en uitdagingen. Stap voor stap naar een fitter en energieker leven.
          </motion.p>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Voedingsadvies bij Blue Fit</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Wat kun je verwachten
            </h2>
            <p className="text-slate-500 leading-[1.75] mb-5">
              Gezond eten is de basis van een fit en energiek leven. Met voedingsadvies bij Blue Fit in Lent krijg je begeleiding van een orthomoleculair voedingsdeskundige die samen met jou kijkt naar je leefstijl, doelen en uitdagingen. Of je nu wilt afvallen, spiermassa wilt opbouwen of gewoon gezonder wilt leven — wij helpen je stap voor stap vooruit.
            </p>
            <p className="text-slate-500 leading-[1.75]">
              Tijdens de intake bespreken we jouw doelen en huidige eetpatroon. Daarna stelt de voedingsdeskundige een persoonlijk voedingsplan op dat past bij jouw lichaam, dagindeling en voorkeuren. Geen streng dieet, maar haalbare en duurzame keuzes. Je leert hoe voeding kan bijdragen aan meer energie, betere sportprestaties en een gezond gewicht.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Benefits */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Voordelen</h3>
              <ul className="space-y-3">
                {[
                  "Persoonlijk voedingsplan",
                  "Ondersteuning bij afvallen, spiermassa opbouwen of gezonder leven",
                  "Praktische tips die je direct kunt toepassen",
                  "Combineerbaar met Personal Training of groepslessen",
                  "Inzicht in jouw lichaam via metingen",
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
                { label: "Doel", value: "Gezond gewicht, meer energie & betere prestaties" },
                { label: "Duur intake", value: "20 minuten" },
                { label: "Begeleiding", value: "1-op-1 met een orthomoleculaire diëtist" },
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

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Ervaringen</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">Wat Blue Fitters zeggen</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#60A5FA]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/75 leading-[1.75] text-sm flex-1">"{t.quote}"</p>
                <p className="text-white font-semibold text-sm">— {t.author} ({t.age})</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Veelgestelde vragen</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">Alles over voeding bij Blue Fit</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">Plan een intakegesprek</h2>
          <p className="text-white/75 leading-[1.7] mb-8 text-lg">
            Ontdek wat voedingsbegeleiding bij Blue Fit voor jou kan betekenen. Geen verplichtingen, geen risico.
          </p>
          <Link
            href="/#contact"
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
