"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const trainers = [
  {
    name: "Burak",
    photo: "https://placehold.co/400x400/1768E5/ffffff?text=Burak",
    intro:
      "Burak is een gecertificeerde personal trainer met een passie voor krachtontwikkeling en leefstijlcoaching. Hij helpt je resultaten te boeken die je zelf niet voor mogelijk hield.",
  },
];

const testimonials = [
  {
    quote: "Ik wilde afvallen en fitter worden, maar alleen lukte het me niet. Met de begeleiding van mijn personal trainer bij Blue Fit ben ik al 8 kilo kwijt en voel ik me sterker dan ooit.",
    author: "Linda",
    age: 37,
  },
  {
    quote: "Dankzij de 1-op-1 begeleiding kon ik weer veilig sporten na een blessure. Mijn trainer lette op techniek en bouwde alles rustig op. Nu ben ik pijnvrij én sterker.",
    author: "Mark",
    age: 44,
  },
  {
    quote: "Het fijne aan personal training bij Blue Fit is dat er naar het totaalplaatje wordt gekeken: training, voeding én herstel. Daardoor behaal ik nu echt duurzame resultaten.",
    author: "Sophie",
    age: 29,
  },
];

const faq = [
  {
    q: "Hoe vaak moet ik personal training in Lent volgen voor resultaat?",
    a: "Dat hangt af van je doel. Veel Blue Fitters starten met 1 à 2 sessies per week. Samen met jouw personal trainer in Lent stel je een plan op dat bij je leven past.",
  },
  {
    q: "Is personal training in Nijmegen alleen voor gevorderden?",
    a: "Nee, juist beginners hebben veel baat bij personal training. De trainer past de oefeningen volledig aan jouw niveau en ervaring aan.",
  },
  {
    q: "Kan ik personal training combineren met groepslessen in Lent?",
    a: "Zeker. Veel leden combineren 1-op-1 begeleiding met groepslessen of fitness. Zo behaal je sneller resultaat én houd je plezier in sporten.",
  },
  {
    q: "Hoe lang duurt een personal training sessie bij Blue Fit?",
    a: "Gemiddeld 45 tot 60 minuten. Dit wordt afgestemd op jouw doel en persoonlijke voorkeur.",
  },
  {
    q: "Is personal training duur?",
    a: "Je investeert in persoonlijke begeleiding en sneller resultaat. Bovendien bieden we pakketten en duo-trainingen die voordeliger zijn.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function IntensityDots({ min, max }: { min: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: i < min ? "#1768E5" : i < max ? "#93C5FD" : "#CBD5E1" }}
        />
      ))}
    </div>
  );
}

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
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 ml-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PersonalTrainingPage() {
  return (
    <main className="bg-[#F8FAFF] text-slate-900 min-h-screen font-sans overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/B002.jpg"
            alt="Personal training bij Blue Fit"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[#1768E5]/15 mix-blend-multiply" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="grain-pt">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-pt)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-6"
          >
            <Link href="/#aanbod" className="hover:text-white transition-colors duration-150">
              Aanbod
            </Link>
            <span>/</span>
            <span className="text-white">Personal Training</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Personal Training
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Personal Training{" "}
            <span className="text-[#60A5FA]">bij Blue Fit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white/65 leading-[1.7] text-xl max-w-2xl"
          >
            Wil je sneller resultaat, meer motivatie en persoonlijke aandacht? Bij Blue Fit Lent werken we samen met onze personal trainers aan jouw gezondheid, kracht en conditie — allemaal onder het Blue Fit-dak.
          </motion.p>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Personal Training bij Blue Fit
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Wat kun je verwachten
            </h2>
            <p className="text-slate-500 leading-[1.75] mb-5">
              Wil je sneller resultaat, meer motivatie en persoonlijke aandacht? Hiervoor hebben we personal training bij Blue Fit Lent. We kunnen je in contact brengen met onze personal trainers die graag met je aan de slag gaan om deze punten te verbeteren! Ze geven je de begeleiding die je nodig hebt en samen met hen kun je doelgericht werken aan je gezondheid, kracht en conditie. Dit alles doe je onder het dak van Blue Fit.
            </p>
            <p className="text-slate-500 leading-[1.75] mb-6">
              Bij Personal Training draait alles om maatwerk. Onze trainer stelt een programma op dat past bij jouw doelen: afvallen, spieropbouw, conditie verbeteren of fitter worden in het dagelijks leven. Je traint met de nieuwste apparatuur, krijgt technische begeleiding en wordt uitgedaagd op een manier die bij jou past. Daarnaast kijken we naar jouw leefstijl — voeding, slaap en herstel — zodat je het maximale uit jezelf kunt halen.
            </p>

            {/* Note */}
            <div
              className="rounded-2xl p-5 border border-[#1768E5]/20 bg-[#1768E5]/5"
            >
              <p className="text-sm text-slate-600 leading-[1.7]">
                <span className="font-semibold text-slate-800">Let op:</span> De personal trainer is zelfstandig ondernemer en biedt zijn diensten naast je Blue Fit-lidmaatschap aan. Je boekt en betaalt zijn trainingen dus apart, maar hij werkt wél binnen onze faciliteit — handig en vertrouwd!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Benefits */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Voordelen</h3>
              <ul className="space-y-3">
                {[
                  "1-op-1 begeleiding met persoonlijke aandacht",
                  "Trainingsplan volledig afgestemd op jouw doelen",
                  "Sneller en veiliger resultaat",
                  "Extra motivatie door je trainer",
                  "Ook mogelijk in kleine groepjes (duo- of small group training)",
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
                { label: "Doel", value: "Persoonlijk resultaat (afvallen, sterker worden, fitter leven)" },
                { label: "Duur", value: "45–60 minuten per sessie" },
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
              <div
                className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-2"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Intensiteit</span>
                <div className="flex items-center gap-2">
                  <IntensityDots min={1} max={3} />
                  <span className="text-xs text-slate-500">afhankelijk van jouw doel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trainers ─────────────────────────────────────────── */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Maak kennis
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Onze personal trainers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {trainers.map((trainer, i) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={trainer.photo} alt={trainer.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                </div>
                <p className="text-white/70 leading-[1.75] text-sm">{trainer.intro}</p>
                <p className="text-white/30 text-xs italic">
                  Meer info volgt binnenkort — neem contact op via de balie voor een kennismaking.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Ervaringen
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Wat Blue Fitters zeggen
            </h2>
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
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Veelgestelde vragen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Alles over personal training
          </h2>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
            Doe een week gratis mee
          </h2>
          <p className="text-white/75 leading-[1.7] mb-8 text-lg">
            Ervaar zelf wat personal training bij Blue Fit voor jou kan doen. Geen verplichtingen, geen risico.
          </p>
          <Link
            href="/tarieven"
            className="inline-flex items-center gap-2 bg-white text-[#1768E5] px-8 py-4 rounded-full text-sm font-bold
                       transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Claim je gratis proefweek
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
