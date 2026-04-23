"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  X,
  Zap,
  Heart,
  ClipboardList,
  Dumbbell,
  Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Feature = {
  id: string;
  icon: React.ReactNode;
  accent: string;
  category: string;
  zone: string;
  photo: string;
  title: string;
  body: string;
  bullets: string[] | null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    id: "smart-equipment",
    icon: <Zap className="w-3.5 h-3.5" />,
    accent: "#1768E5",
    category: "Apparatuur",
    zone: "Fitnessruimte",
    photo: "/photos/B043.jpg",
    title: "Slimme Apparatuur",
    body: "Onze slimme apparaten maken training eenvoudiger, gevarieerder en effectiever:",
    bullets: [
      "Zie hoe elk apparaat werkt via korte instructievideo's",
      "Train op verschillende manieren: standaard, excentrisch, isokinetisch of elastisch",
      "Stel het gewicht nauwkeurig af op jouw niveau en doel",
      "Of je nu beginner bent of ervaren sporter — deze technologie helpt je meer uit elke sessie te halen",
    ],
  },
  {
    id: "cardio",
    icon: <Heart className="w-3.5 h-3.5" />,
    accent: "#E53E3E",
    category: "Cardio",
    zone: "Cardiopark",
    photo: "/photos/B020.jpg",
    title: "Cardio met Variatie",
    body: "Hardlopen, fietsen, stair master, crosstrainer, klimmen of roeien — ons cardiopark biedt eindeloze mogelijkheden en meer. Houd je conditie op peil en maak elke training afwisselend.",
    bullets: null,
  },
  {
    id: "persoonlijk-plan",
    icon: <ClipboardList className="w-3.5 h-3.5" />,
    accent: "#0FA3B1",
    category: "Begeleiding",
    zone: "Met trainer",
    photo: "/photos/B012.jpg",
    title: "Persoonlijk Plan, Metingen & Evaluatie",
    body: "Bij inschrijving raden we altijd aan een afspraak te maken met een trainer om een persoonlijk plan op te stellen. Op basis van onze slimme weegschaal en jouw wensen bouwen we stap voor stap een trainingsschema. We leggen elke oefening uit zodat je goed van start gaat. Als je programma klaar is, evalueren we samen je voortgang en passen we zo nodig bij.",
    bullets: null,
  },
  {
    id: "kracht-hyrox",
    icon: <Dumbbell className="w-3.5 h-3.5" />,
    accent: "#7B61FF",
    category: "Kracht",
    zone: "Functionele Zone",
    photo: "/photos/B002.jpg",
    title: "Krachttraining & Hyrox",
    body: "In onze functionele zone vind je vrije gewichten, plaat-machines, kabels, dumbbells, weerstandsbanden en veel meer. Alle ruimte die je nodig hebt om jouw training naar eigen inzicht in te richten. Ook perfect als je wilt trainen voor events zoals Hyrox, waarbij kracht en uithoudingsvermogen samenkomen.",
    bullets: null,
  },
  {
    id: "community",
    icon: <Users className="w-3.5 h-3.5" />,
    accent: "#3BB273",
    category: "Community",
    zone: "Samen sporten",
    photo: "/photos/B036.jpg",
    title: "Blue Fit Gemeenschap",
    body: "Bij Blue Fit train je nooit alleen. Onze community is er om elkaar te motiveren, samen te trainen en successen te vieren. Want sporten is leuker — en makkelijker vol te houden — als je het samen doet.",
    bullets: null,
  },
];

const testimonials = [
  {
    quote: "Geweldige gym, vriendelijk personeel, nieuwste apparatuur! Top ZUMBA groepsles — geweldig tempo. Cardio, krachttraining, Hyrox & groepslessen. Ook PT-opties. Geweldige locatie, 2 uur gratis parkeren.",
    author: "Joy",
  },
  {
    quote: "Vanaf het begin train ik met veel plezier bij Blue Fit. De studio heeft prachtige, professionele apparatuur — en de begeleiding is super behulpzaam. Het team staat altijd klaar met advies, waardoor de sfeer heel vertrouwd en familiaal aanvoelt. Dankzij de training en motivatie van Bas en zijn team ben ik meer dan 15 kilo afgevallen. Ik raad iedereen van harte aan om hier te trainen: je voelt je welkom, ondersteund en krijgt de juiste begeleiding om je doelen te bereiken.",
    author: "Rogier",
  },
  {
    quote: "Fijne toegankelijke sfeer en mensen. Breed aanbod aan leuke groepslessen. De accommodatie ziet er mooi en schoon uit!",
    author: "Nora",
  },
];

const faq = [
  {
    q: "Kan ik de apparatuur gebruiken zonder ervaring?",
    a: "Ja, elk apparaat heeft een korte instructievideo en onze trainers staan altijd klaar om je te helpen. Je start veilig en met vertrouwen.",
  },
  {
    q: "Wat houdt een persoonlijk plan in?",
    a: "We willen weten hoe jij leeft, of er blessures of andere beperkingen zijn, en vooral wat jouw doel is. Daarna nemen we metingen. Je krijgt inzicht in je lichaamssamenstelling: gewicht, spiermassa, vetpercentage en vochtbalans. Vervolgens maken we een plan en leggen we dit stap voor stap uit.",
  },
  {
    q: "Zijn er vrije trainingsmogelijkheden naast de machines?",
    a: "Ja, naast de slimme machines hebben we een functionele zone met vrije gewichten, plaat-machines, kabels en een sled, zodat je vrij kunt trainen en variëren.",
  },
  {
    q: "Kan ik trainen voor HYROX of andere events bij Blue Fit?",
    a: "Absoluut! Onze functionele zone en cardio-apparatuur zijn perfect om je voor te bereiden op HYROX of andere sportieve uitdagingen.",
  },
  {
    q: "Wat als ik vragen heb tijdens mijn training?",
    a: "Onze trainers en coaches zijn altijd aanwezig tijdens begeleide uren om je te ondersteunen, je techniek te verbeteren en tips te geven.",
  },
  {
    q: "Kan ik eerst uitproberen?",
    a: "Ja, je kunt een gratis proefweek claimen om de fitnessruimte, apparatuur en sfeer zelf te ervaren.",
  },
  {
    q: "Zijn er douches?",
    a: "Ja, er zijn meerdere douches beschikbaar.",
  },
  {
    q: "Zijn er aparte abonnementen of strippenkaarten?",
    a: "Voor een paar specifieke lessen (Mama Flow, Blue Stars en Blue Icons) zijn er aparte abonnementen, maar in het algemeen zijn er geen aparte abonnementen of strippenkaarten. Er is wel een dagpas.",
  },
  {
    q: "Kan ik hier sporten via Corporate Fitness?",
    a: "Ja, meld je aan via BFNL en we sturen je een welkomstmail zodra we jouw aanmelding hebben ontvangen.",
  },
  {
    q: "Zijn er kluisjes met sloten?",
    a: "Ja, die zijn beschikbaar.",
  },
  {
    q: "Bieden jullie groepslessen op scherm aan?",
    a: "Nee, elke les die we aanbieden is live met een enthousiaste presentator.",
  },
  {
    q: "Hoe log ik in?",
    a: "Via onze website kun je inloggen en toegang krijgen tot ons (web) klantenportal om elke les te boeken, je trainingen te plannen en nog veel meer.",
  },
  {
    q: "Hoe kom ik binnen?",
    a: "Je kunt inloggen via ons klantenportal op je telefoon met jouw QR-code als je lid bent. Let op: houd de QR-code 20 cm van de scanner.",
  },
  {
    q: "Hoe kan ik opzeggen?",
    a: "Je kunt jouw abonnement opzeggen via e-mail. We horen graag de reden, zodat we onszelf kunnen verbeteren. Je abonnement wordt dan opgezegd met een opzegtermijn van 28 dagen, tenzij je een jaarcontract hebt.",
  },
  {
    q: "Wat zijn jullie openingstijden?",
    a: "We zijn 365 dagen per jaar open van 6:00 tot 23:00.",
  },
  {
    q: "Wanneer is er begeleide training?",
    a: "Begeleiding is beschikbaar elke ochtend ma–vr van 8:15–12:00 en 17:00–21:00, en in het weekend van 8:30–12:00.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCard({ feature, onClick }: { feature: Feature; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group text-left w-full bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1768E5]/50"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={feature.photo}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{ backgroundColor: feature.accent }}
        />
        <span
          className="absolute top-3 left-3 text-xs font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: `${feature.accent}CC`, color: "#fff" }}
        >
          {feature.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{feature.title}</h3>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1768E5] transition-colors duration-200 flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-slate-500 text-sm leading-[1.6] line-clamp-3">{feature.body}</p>
        <div
          className="flex items-center gap-1.5 pt-2 border-t border-slate-100 mt-auto text-xs font-medium"
          style={{ color: feature.accent }}
        >
          {feature.icon}
          {feature.zone}
        </div>
      </div>
    </motion.button>
  );
}

function FeatureModal({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="relative h-52 rounded-t-3xl overflow-hidden flex-shrink-0">
          <Image src={feature.photo} alt={feature.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div
            className="absolute inset-0 opacity-25 mix-blend-multiply"
            style={{ backgroundColor: feature.accent }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between gap-4">
              <span
                className="text-xs font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{ backgroundColor: `${feature.accent}CC`, color: "#fff" }}
              >
                {feature.category}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                           transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{feature.title}</h2>
          </div>
        </div>

        <div className="px-8 pt-6 pb-2">
          <p className="text-slate-600 leading-[1.75]">{feature.body}</p>
        </div>

        <div className="px-8 py-6 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Zone", value: feature.zone },
              { label: "Categorie", value: feature.category },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4 flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>

          {feature.bullets && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Wat kun je verwachten
              </h4>
              <ul className="space-y-2.5">
                {feature.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: feature.accent }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/tarieven"
            className="flex items-center justify-center gap-2 bg-[#1768E5] text-white px-6 py-4 rounded-xl text-sm font-semibold w-full
                       transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1768E5]/60"
          >
            Probeer gratis een week
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeatureCarousel({ onSelect }: { onSelect: (f: Feature) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const STEP = 316;
  const SPEED = 0.2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let last: number | null = null;

    const tick = (now: number) => {
      if (!pausedRef.current) {
        if (last !== null) el.scrollLeft += SPEED * (now - last);
        last = now;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
          last = null;
        }
      } else {
        last = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scroll = (dir: "left" | "right") => {
    pausedRef.current = true;
    scrollRef.current?.scrollBy({ left: dir === "right" ? STEP : -STEP, behavior: "smooth" });
    setTimeout(() => { pausedRef.current = false; }, 600);
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Wat we bieden
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-3">
            Alles voor jouw training
          </h2>
          <p className="text-slate-500 leading-[1.7] max-w-lg">
            Swipe of klik door alle onderdelen. Tik op een kaart voor meer informatie.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Vorige"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500
                       hover:border-[#1768E5] hover:text-[#1768E5] transition-colors duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1768E5]/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Volgende"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500
                       hover:border-[#1768E5] hover:text-[#1768E5] transition-colors duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1768E5]/50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <style>{`.fitness-track::-webkit-scrollbar { display: none; }`}</style>
        <div
          ref={scrollRef}
          className="fitness-track overflow-x-auto"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
          }}
        >
          <div className="flex gap-4 w-max pb-2">
            {[...features, ...features].map((feature, i) => (
              <div key={`${feature.id}-${i}`} className="flex-shrink-0 w-[82vw] sm:w-[300px]">
                <FeatureCard feature={feature} onClick={() => onSelect(feature)} />
              </div>
            ))}
          </div>
        </div>
      </div>
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

export default function FitnessPage() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  return (
    <main className="bg-[#F8FAFF] text-slate-900 min-h-screen font-sans overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/B043.jpg"
            alt="Blue Fit fitness ruimte"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[#1768E5]/15 mix-blend-multiply" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="grain-fitness">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-fitness)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-6"
          >
            <Link href="/aanbod" className="hover:text-white transition-colors duration-150">
              Aanbod
            </Link>
            <span>/</span>
            <span className="text-white">Fitness</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Fitness
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Fitness bij{" "}
            <span className="text-[#60A5FA]">Blue Fit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white/65 leading-[1.7] text-xl max-w-2xl"
          >
            Duurzame beweging, plezier en werken aan een sterk en gezond lichaam —
            met slimme technologie, persoonlijke begeleiding en een community die je blijft motiveren.
          </motion.p>
        </div>
      </section>

      {/* ─── Intro ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Fitness bij Blue Fit
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Meer dan alleen bewegen
            </h2>
            <p className="text-slate-500 leading-[1.75]">
              Bij Blue Fit in Lent geloven we dat fitness meer is dan alleen sporten. Het gaat om duurzame beweging, plezier en werken aan een sterk en gezond lichaam. Onze fitnessruimte is volledig uitgerust met slimme technologie voor kracht en cardio. Onze trainers zijn er om te luisteren, te begeleiden en te motiveren. We blijven je uitdagen om doelen te stellen en te bereiken zodat je blijft groeien — fysiek en mentaal. Zo vindt iedereen een manier van trainen die aansluit bij zijn of haar doelen.
            </p>
          </div>
          <div className="md:pt-24">
            <p className="text-slate-500 leading-[1.75]">
              En we doen het samen. Bij Blue Fit is sporten geen solo-activiteit — het is iets wat je deelt. Onze community van Blue Fitters motiveert elkaar, behaalt samen resultaten en geniet van het plezier van sporten in groepsverband.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Carousel ─────────────────────────────────────────── */}
      <section className="pb-24">
        <FeatureCarousel onSelect={(f) => setActiveFeature(f)} />
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-24">
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
                <p className="text-white font-semibold text-sm">— {t.author}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-10 leading-[1.7]">
            Jouw verhaal staat hier binnenkort ook. Word een Blue Fitter en ervaar het zelf! Al een Blue Fitter? Ga naar Google en laat een review achter. Dat wordt gewaardeerd!
          </p>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Veelgestelde vragen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Alles over fitness bij Blue Fit
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
            Kom zelf ervaren hoe fitness bij Blue Fit voelt. Claim je gratis proefweek en ontdek de voordelen van onze unieke aanpak.
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

      {/* ─── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeFeature && (
          <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}
