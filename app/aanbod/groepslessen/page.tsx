"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Class = {
  id: string;
  name: string;
  type: string;
  tagColor: string;
  photo: string;
  intro: string;
  description: string;
  benefits: string[];
  goal: string;
  duration: string;
  intensity: number; // 1-4
  faq: { q: string; a: string }[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const classes: Class[] = [
  {
    id: "ocean-flow",
    name: "Ocean Flow",
    type: "Yoga",
    tagColor: "#0FA3B1",
    photo: "/photos/B009.jpg",
    intro:
      "Op zoek naar een fijne plek voor yoga in Lent of een toegankelijke yogales in Nijmegen? Dan is Ocean Flow bij Blue Fit iets voor jou.",
    description:
      "Tijdens de Ocean Flow neem je deel aan vloeiende series van houdingen die elkaar opvolgen. De focus ligt op ademhaling, souplesse en bewust bewegen. Onze trainer begeleidt je stap voor stap, waardoor de les geschikt is voor zowel beginners als ervaren yogi's.",
    benefits: [
      "Vermindert stress en bevordert ontspanning",
      "Verbetert flexibiliteit en houding",
      "Versterkt spieren zonder overbelasting",
      "Geschikt voor alle niveaus",
    ],
    goal: "Balans, flexibiliteit & ontspanning",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Heb ik ervaring nodig met yoga?",
        a: "Nee, Ocean Flow bij Blue Fit is geschikt voor alle niveaus. De trainer biedt opties zodat iedereen kan meedoen.",
      },
      {
        q: "Helpt Ocean Flow bij stress?",
        a: "Ja, veel Blue Fitters ervaren minder spanning en meer energie na hun yogales in Lent.",
      },
    ],
  },
  {
    id: "sky-high",
    name: "Sky High",
    type: "HIIT",
    tagColor: "#E53E3E",
    photo: "/photos/B038.jpg",
    intro:
      "Wil je maximale resultaten in korte tijd? Kies Sky High HIIT in Lent bij Blue Fit. Een intensieve les met korte, explosieve intervallen.",
    description:
      "Tijdens Sky High train je in intervallen van hoge intensiteit, afgewisseld met korte rustmomenten. Denk aan burpees, box jumps, sprints en kettlebell swings. Het tempo ligt hoog, de energie van de groep trekt je mee en de afterburn zorgt dat je ook ná de training calorieën blijft verbranden.",
    benefits: [
      "Effectieve training in korte tijd",
      "Boost voor kracht én conditie",
      "Hoge calorieverbranding, ook na de workout",
      "Motiverende groepsdynamiek",
    ],
    goal: "Explosieve kracht & conditie",
    duration: "30 min",
    intensity: 4,
    faq: [
      {
        q: "Hoe lang duurt de Sky High HIIT-les?",
        a: "30 minuten. Kort maar heel effectief.",
      },
      {
        q: "Is HIIT geschikt voor iedereen?",
        a: "Ja, maar het is intensief. Beginners kunnen lichtere variaties doen.",
      },
      {
        q: "Wat zijn de voordelen van HIIT?",
        a: "Je verbrandt veel calorieën, verbetert je conditie en profiteert van het afterburn-effect.",
      },
    ],
  },
  {
    id: "shred-it-blue",
    name: "Shred It Blue",
    type: "Kracht + Cardio",
    tagColor: "#D97706",
    photo: "/photos/B034.jpg",
    intro:
      "Uniek bij Blue, deze eigen ontworpen les is een full-body workout die kracht en cardio combineert voor maximaal resultaat.",
    description:
      "Tijdens Shred It Blue wissel je intensieve krachtoefeningen af met conditionele intervallen op de fiets. Denk aan squats, deadlifts en bicep curls. Je traint samen met andere Blue Fitters in een motiverende groepssfeer. Wil je op een rustiger niveau instappen? We hebben ook de light versie.",
    benefits: [
      "Verbrandt snel calorieën",
      "Verbetert zowel kracht als conditie",
      "Uitdagend en dynamisch",
      "Elke les is anders",
    ],
    goal: "Vetverbranding & conditie",
    duration: "45 min",
    intensity: 3,
    faq: [
      {
        q: "Is Shred It hetzelfde als een HIIT-les?",
        a: "Nee, Shred It Blue is intensief maar heel anders — kracht en uithoudingsvermogen worden gecombineerd voor een full-body workout.",
      },
      {
        q: "Kunnen beginners meedoen aan Shred It?",
        a: "Ja, door gewichten en fietssnelheid aan te passen kun je het altijd lichter of zwaarder maken. We hebben ook altijd de Light versie.",
      },
      {
        q: "Hoeveel calorieën verbrand ik met Shred It Blue?",
        a: "Gemiddeld 500–800 kcal per les, afhankelijk van je inzet.",
      },
    ],
  },
  {
    id: "iron-pump",
    name: "Iron Pump",
    type: "Krachttraining",
    tagColor: "#7B61FF",
    photo: "/photos/B040.jpg",
    intro:
      "Wil je sterker worden en werken aan je spieropbouw? Kies voor Iron Pump bij Blue Fit in Lent, dé groepsles waarin conditionele krachttraining op het ritme van de muziek centraal staat.",
    description:
      "Tijdens Iron Pump train je met stangen en losse gewichten. Je werkt in blokken waarin verschillende spiergroepen aan bod komen: benen, borst, rug, armen en core. Dankzij de groepssfeer en motiverende beats haal je altijd meer uit jezelf.",
    benefits: [
      "Vergroot spierkracht en spiermassa",
      "Techniektraining onder begeleiding",
      "Veilige en gestructureerde krachtuithoudingles",
      "Complete full-body workout",
    ],
    goal: "Spierkracht & core stabiliteit",
    duration: "45 min",
    intensity: 2,
    faq: [
      {
        q: "Heb ik ervaring met krachttraining nodig?",
        a: "Nee, onze trainer legt alles uit en helpt bij correcte techniek. Iedereen kan op eigen niveau trainen.",
      },
      {
        q: "Train je met zware gewichten tijdens Iron Pump?",
        a: "Dat bepaal je zelf. Je begint licht en bouwt op naarmate je sterker wordt.",
      },
      {
        q: "Helpt Iron Pump bij het opbouwen van spiermassa?",
        a: "Ja, dit is dé groepsles in Lent voor spierbouw en krachtuithoudingsvermogen.",
      },
    ],
  },
  {
    id: "spinnergy",
    name: "Spinnergy",
    type: "Indoor Cycling",
    tagColor: "#1768E5",
    photo: "/photos/B020.jpg",
    intro:
      "Op zoek naar een intensieve spinningles of een uitdagende indoor cycling-ervaring? Dan is Spinnergy bij Blue Fit jouw groepsles.",
    description:
      "Tijdens Spinnergy werk je met wisselende tempo's en weerstandsniveaus. Beklimmingen, sprints en steady rides wisselen elkaar af. De muziek en groepssfeer dragen je door de intensieve sessies, zodat je jezelf elke keer weer uitdaagt.",
    benefits: [
      "Verbetert conditie en uithoudingsvermogen",
      "Hoge calorieverbranding",
      "Muziek en groepsenergie geven extra motivatie",
      "Geschikt voor alle niveaus",
    ],
    goal: "Uithoudingsvermogen & calorieverbranding",
    duration: "45 min",
    intensity: 3,
    faq: [
      {
        q: "Moet ik mijn eigen fiets meenemen?",
        a: "Nee, Blue Fit stelt indoor fietsen ter beschikking. Neem sportkleding, een handdoek en water mee.",
      },
      {
        q: "Is spinning geschikt voor beginners?",
        a: "Ja, je stelt je eigen weerstand en snelheid in.",
      },
      {
        q: "Hoe intensief is Spinnergy?",
        a: "Het is een intensieve cardio-les, maar de instelbare weerstand zorgt dat iedereen kan meedoen.",
      },
    ],
  },
  {
    id: "bootcamp",
    name: "Bootcamp",
    type: "Buiten Training",
    tagColor: "#3BB273",
    photo: "/photos/B042.jpg",
    intro:
      "Wil je sporten in de frisse buitenlucht? Met Bootcamp in Lent bij Blue Fit werk je in groepsverband aan kracht, conditie en uithoudingsvermogen.",
    description:
      "Elke Bootcamp is anders. Je doet een mix van hardloopsprints, push-ups, squats, intervaltraining en spelelementen. Onder begeleiding van een trainer ga je aan de slag met je eigen lichaamsgewicht en uitdagende oefeningen.",
    benefits: [
      "Complete full-body workout",
      "Werkt aan zowel kracht als conditie",
      "Extra motivatie vanuit de groep",
      "Sporten in de frisse buitenlucht",
    ],
    goal: "Uithoudingsvermogen & spierkracht",
    duration: "60 min",
    intensity: 3,
    faq: [
      {
        q: "Vindt Bootcamp altijd buiten plaats?",
        a: "Ja, Bootcamp bij Blue Fit is een buitentraining. Alleen bij extreem slecht weer gaan we naar binnen.",
      },
      {
        q: "Is Bootcamp geschikt voor beginners?",
        a: "Zeker. De trainer biedt variaties zodat zowel beginners als gevorderden kunnen meedoen.",
      },
      {
        q: "Wat moet ik meenemen naar Bootcamp?",
        a: "Stevige schoenen, sportkleding die vuil mag worden en een waterfles.",
      },
    ],
  },
  {
    id: "blue-beats",
    name: "Blue Beats",
    type: "Zumba",
    tagColor: "#E879A0",
    photo: "/photos/B018.jpg",
    intro:
      "Hou je van muziek en bewegen? Dan is Blue Beats jouw groepsles! Deze Zumba-les in Lent combineert dans, cardio en fun in één.",
    description:
      "Tijdens Blue Beats volg je ritmische bewegingen en danscombinaties op opzwepende muziek. De les is toegankelijk voor iedereen: je beweegt op je eigen niveau en geniet van het plezier in de groep. Ideaal om fit te worden zonder dat het voelt als sporten.",
    benefits: [
      "Cardio en plezier in één les",
      "Verbetert coördinatie en ritme",
      "Hoge fun-factor, lage drempel",
      "Perfect om samen te doen",
    ],
    goal: "Cardio, coördinatie & plezier",
    duration: "45–50 min",
    intensity: 2,
    faq: [
      {
        q: "Is Blue Beats hetzelfde als Zumba?",
        a: "Ja, het is onze eigen Zumba-les met een Blue Fit-twist.",
      },
      {
        q: "Hoef ik te kunnen dansen om mee te doen?",
        a: "Nee, de les draait om plezier en beweging. Iedereen kan meedoen.",
      },
      {
        q: "Hoeveel calorieën verbrand ik tijdens Blue Beats?",
        a: "Gemiddeld 300–500 kcal per les.",
      },
    ],
  },
  {
    id: "mama-flow",
    name: "Mama Flow",
    type: "Pre/Postnataal",
    tagColor: "#F59E0B",
    photo: "/photos/B007.jpg",
    intro:
      "Wil je tijdens of na je zwangerschap veilig blijven bewegen? Mama Flow in Lent is speciaal ontwikkeld voor (aanstaande) moeders die willen werken aan herstel, mobiliteit en balans.",
    description:
      "De les bestaat uit rustige, veilige yoga oefeningen gericht op bekkenbodem, ademhaling en lichte kracht. Onze ervaren trainer houdt rekening met de fase waarin jij zit, zodat de les altijd aansluit bij jouw lichaam.",
    benefits: [
      "Veilig trainen tijdens en na de zwangerschap",
      "Focus op herstel en balans",
      "Versterkt bekkenbodem en core",
      "Kleinschalige, persoonlijke groepsles",
    ],
    goal: "Bekkenbodem, mobiliteit & herstel",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Vanaf wanneer na de bevalling kan ik meedoen?",
        a: "Doorgaans vanaf 6 weken, maar raadpleeg altijd je arts of verloskundige.",
      },
      {
        q: "Is Mama Flow ook geschikt tijdens de zwangerschap?",
        a: "Ja, de oefeningen worden per trimester aangepast.",
      },
      {
        q: "Mag ik mijn baby meenemen naar Mama Flow?",
        a: "In overleg met de trainer is dat mogelijk.",
      },
    ],
  },
  {
    id: "blue-icons",
    name: "Blue Icons",
    type: "Senioren Fitness",
    tagColor: "#0FA3B1",
    photo: "/photos/B005.jpg",
    intro:
      "Wil je vitaal en in beweging blijven op een manier die past bij jouw leeftijd? Blue Icons is de senioren fitness groepsles in Lent waar je werkt aan kracht, balans en energie, samen met leeftijdsgenoten.",
    description:
      "Tijdens Blue Icons doe je functionele oefeningen gericht op mobiliteit, balans en spierkracht. Alles in een rustig tempo en onder begeleiding van een ervaren trainer.",
    benefits: [
      "Houdt spieren en gewrichten soepel",
      "Verbetert balans en stabiliteit",
      "Vergroot vitaliteit en energie",
      "Sociale en laagdrempelige groepsles",
    ],
    goal: "Soepele beweging, kracht & vitaliteit",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Voor welke leeftijd is Blue Icons bedoeld?",
        a: "De les is gericht op senioren (55+), maar iedereen die zacht wil sporten is welkom.",
      },
      {
        q: "Is seniorenfitness intensief?",
        a: "Nee, de les wordt rustig opgebouwd en is afgestemd op de deelnemers.",
      },
      {
        q: "Moet ik lid zijn om mee te doen?",
        a: "Nee, niet-leden kunnen altijd 2 weken gratis proberen.",
      },
    ],
  },
  {
    id: "blue-motion",
    name: "Blue Motion",
    type: "Modern Dans",
    tagColor: "#A855F7",
    photo: "/photos/B014.jpg",
    intro:
      "Altijd willen dansen of je moderne danstechniek verbeteren? Blue Motion is de groepsles voor iedereen die wil genieten van dans, beweging, expressie en verbinding.",
    description:
      "Tijdens Blue Motion word je begeleid door een ervaren dansdocent. Je leert moderne danstechnieken, werkt aan lichaamscontrole en musicaliteit, en bouwt choreografieën op in een prettige, open sfeer. Geschikt voor zowel beginners als gevorderden.",
    benefits: [
      "Verbetert kracht, flexibiliteit en coördinatie",
      "Vergroot lichaamsbesef en expressie",
      "Creatief en ontspannend tegelijk",
      "Geschikt voor alle leeftijden en niveaus",
    ],
    goal: "Moderne dans & creatieve beweging",
    duration: "45 min",
    intensity: 2,
    faq: [
      {
        q: "Wat is het doel van Blue Motion?",
        a: "Plezier, verbetering van techniek en het ontwikkelen van je expressie.",
      },
      {
        q: "Is moderne dans geschikt voor beginners?",
        a: "Ja, de bewegingen zijn toegankelijk voor iedereen.",
      },
    ],
  },
  {
    id: "blue-stars",
    name: "Blue Stars",
    type: "Kinderdansles",
    tagColor: "#EC4899",
    photo: "/photos/B013.jpg",
    intro:
      "Is jouw kind op zoek naar een leuke en actieve dansles? Blue Stars is speciaal ontwikkeld voor kinderen van 3–10 jaar.",
    description:
      "Tijdens Blue Stars worden kinderen begeleid door enthousiaste en ervaren dansdocenten. Ze leren basisbewegingen van verschillende stijlen waaronder hip-hop, moderne dans, breakdance en ballet. Via spel en dans ontwikkelen ze ritme, coördinatie en zelfvertrouwen.",
    benefits: [
      "Stimuleert motoriek en coördinatie",
      "Bouwt zelfvertrouwen en creativiteit op",
      "Kennismaking met meerdere dansstijlen",
      "Vrolijke, veilige en energieke sfeer",
    ],
    goal: "Dansvreugde & ontwikkeling",
    duration: "45 min",
    intensity: 2,
    faq: [],
  },
  {
    id: "blue-step-shape",
    name: "Blue Step & Shape",
    type: "Step Aerobics",
    tagColor: "#F97316",
    photo: "/photos/B039.jpg",
    intro:
      "Op zoek naar een dynamische les die conditie en kracht combineert? Blue Step & Shape is de step aerobics groepsles in Lent.",
    description:
      "Tijdens de les gebruik je een step om diverse cardio-oefeningen te doen. Tussendoor werk je met dumbells of je eigen lichaamsgewicht aan spierkracht. De muziek geeft extra energie en zorgt voor een leuke, motiverende sfeer.",
    benefits: [
      "Verbrandt calorieën en verbetert conditie",
      "Versterkt en vormt het hele lichaam",
      "Leuke en energieke les",
      "Muziek geeft extra motivatie",
    ],
    goal: "Conditie, coördinatie & shaping",
    duration: "45 min",
    intensity: 2,
    faq: [
      {
        q: "Heb ik ervaring met step aerobics nodig?",
        a: "Nee, de trainer bouwt de combinaties geleidelijk op.",
      },
      {
        q: "Wat train ik tijdens Step & Shape?",
        a: "Conditie en spierkracht. Je verbrandt calorieën en vormt je lichaam.",
      },
      {
        q: "Is Blue Step & Shape zwaar?",
        a: "Het is uitdagend, maar jij bepaalt hoe intensief je meedoet.",
      },
    ],
  },
];

const generalFaq = [
  {
    q: "Heb ik ervaring nodig om mee te doen aan een groepsles?",
    a: "Nee, onze groepslessen zijn toegankelijk voor alle niveaus. De trainer geeft altijd opties en variaties, zodat je op je eigen tempo kunt meedoen.",
  },
  {
    q: "Hoe schrijf ik me in voor een groepsles?",
    a: "Je meldt je eenvoudig aan via de Blue Fit klantenportaal. Zo weet je zeker dat je plek gereserveerd is.",
  },
  {
    q: "Wat als ik na inschrijving toch niet kan?",
    a: "Geen probleem! Je kunt je afmelden in de app, zodat iemand anders jouw plek kan pakken.",
  },
  {
    q: "Zijn groepslessen inbegrepen bij mijn abonnement?",
    a: "Ja, groepslessen zijn onderdeel van je Blue Fit lidmaatschap. Je kunt dus onbeperkt meedoen.",
  },
  {
    q: "Wat moet ik meenemen naar een groepsles?",
    a: "Sportkleding waarin je vrij kunt bewegen, schone sportschoenen en een handdoek. Een waterfles is handig bij sommige lessen. Matten en materialen zijn aanwezig bij Blue Fit.",
  },
  {
    q: "Hoe intensief zijn de groepslessen?",
    a: "Dat verschilt per les. Bij elke les staat een indicatie van de intensiteit (●○○ / ●●○ / ●●●). Zo kies je gemakkelijk een les die bij jouw niveau past.",
  },
  {
    q: "Kan ik een groepsles eerst uitproberen?",
    a: "Absoluut! Je bent van harte welkom om een gratis proeflies mee te doen en de sfeer zelf te ervaren.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function IntensityDots({ level, max = 4 }: { level: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: i < level ? "#1768E5" : "#CBD5E1",
          }}
        />
      ))}
    </div>
  );
}

function ClassCard({
  cls,
  onClick,
}: {
  cls: Class;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group text-left w-full bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1768E5]/50"
      style={{
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={cls.photo}
          alt={cls.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{ backgroundColor: cls.tagColor }}
        />
        {/* type badge sits on the photo */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{
            backgroundColor: `${cls.tagColor}CC`,
            color: "#fff",
          }}
        >
          {cls.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {cls.name}
          </h3>
          <ChevronRight
            className="w-4 h-4 text-slate-300 group-hover:text-[#1768E5] transition-colors duration-200 flex-shrink-0 mt-0.5"
          />
        </div>
        <p className="text-slate-500 text-sm leading-[1.6] line-clamp-2">
          {cls.intro}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {cls.duration}
          </div>
          <IntensityDots level={cls.intensity} />
        </div>
      </div>
    </motion.button>
  );
}

function ClassModal({
  cls,
  onClose,
}: {
  cls: Class;
  onClose: () => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* header photo */}
        <div className="relative h-52 rounded-t-3xl overflow-hidden flex-shrink-0">
          <Image
            src={cls.photo}
            alt={cls.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div
            className="absolute inset-0 opacity-25 mix-blend-multiply"
            style={{ backgroundColor: cls.tagColor }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between gap-4">
              <span
                className="text-xs font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{ backgroundColor: `${cls.tagColor}CC`, color: "#fff" }}
              >
                {cls.type}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm
                           transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {cls.name}
            </h2>
          </div>
        </div>

        {/* intro below photo */}
        <div className="px-8 pt-5 pb-2">
          <p className="text-slate-600 leading-[1.7]">{cls.intro}</p>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* practical info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Target, label: "Doel", value: cls.goal },
              { icon: Clock, label: "Duur", value: cls.duration },
              {
                icon: null,
                label: "Intensiteit",
                value: null,
                dots: cls.intensity,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2"
              >
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </span>
                {item.value ? (
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {item.value}
                  </span>
                ) : (
                  <IntensityDots level={item.dots!} />
                )}
              </div>
            ))}
          </div>

          {/* description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Wat kun je verwachten
            </h4>
            <p className="text-slate-700 leading-[1.75] text-[0.95rem]">
              {cls.description}
            </p>
          </div>

          {/* benefits */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Voordelen
            </h4>
            <ul className="space-y-2.5">
              {cls.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cls.tagColor }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* faq */}
          {cls.faq.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Veelgestelde vragen
              </h4>
              <div className="space-y-2">
                {cls.faq.map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-slate-800
                                 hover:bg-slate-50 transition-colors duration-150 focus-visible:outline-none"
                    >
                      {item.q}
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-slate-600 leading-[1.7]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* cta */}
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

function FaqItem({ q, a }: { q: string; a: string }) {
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

function ClassCarousel({ onSelect }: { onSelect: (cls: Class) => void }) {
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
      {/* Section header + arrows */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Ons aanbod
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-3">
            Kies jouw les
          </h2>
          <p className="text-slate-500 leading-[1.7] max-w-lg">
            Swipe of klik door alle lessen. Tik op een les voor meer
            informatie over inhoud, intensiteit en wat je nodig hebt.
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

      {/* Scrollable track */}
      <div className="max-w-6xl mx-auto px-6">
        <style>{`.groep-track::-webkit-scrollbar { display: none; }`}</style>
        <div
          ref={scrollRef}
          className="groep-track overflow-x-auto"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage:
              "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
          }}
        >
          <div className="flex gap-4 w-max pb-2">
            {[...classes, ...classes].map((cls, i) => (
              <div key={`${cls.id}-${i}`} className="flex-shrink-0 w-[82vw] sm:w-[300px]">
                <ClassCard cls={cls} onClick={() => onSelect(cls)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GroepslessenPage() {
  const [activeClass, setActiveClass] = useState<Class | null>(null);

  return (
    <main className="bg-[#F8FAFF] text-slate-900 min-h-screen font-sans overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/B030.jpg"
            alt="Blue Fit spinning studio"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[#1768E5]/15 mix-blend-multiply" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
            <filter id="g2">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#g2)" />
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
            <span className="text-white">Groepslessen</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[#60A5FA] text-sm font-semibold tracking-[0.15em] uppercase mb-4"
          >
            Groepslessen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Groepslessen{" "}
            <span className="text-[#60A5FA]">bij Blue Fit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white/65 leading-[1.7] text-xl max-w-2xl"
          >
            Samen sporten is niet alleen leuker, het zorgt ook voor verbinding en motivatie. Van ontspannend en mindful tot energiek en uitdagend — voor iedereen iets, passend bij jouw doel.
          </motion.p>
        </div>
      </section>


      {/* ─── Intro ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Groepslessen bij Blue Fit
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-slate-900 mb-6">
              Bij Blue Fit sport je samen
            </h2>
            <p className="text-slate-500 leading-[1.75]">
              Samen sporten is niet alleen leuker, het zorgt ook voor verbinding en motivatie. Dat community-gevoel is kenmerkend voor de Blue Zones. We bieden een breed aanbod aan groepslessen: van ontspannend en mindful tot energiek en uitdagend. Voor iedereen iets, passend bij jouw doel.
            </p>
          </div>
          <div className="md:pt-24">
            <p className="text-slate-500 leading-[1.75]">
              Of je nu wilt ontspannen, kracht wilt opbouwen of flink wilt zweten: er is altijd een les die bij jou past.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Class Carousel ───────────────────────────────────── */}
      <section className="py-16">
        <ClassCarousel onSelect={(cls) => setActiveClass(cls)} />
      </section>


      {/* ─── General FAQ ──────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-[#1768E5] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Veelgestelde vragen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Alles over groepslessen
          </h2>
        </div>
        <div className="divide-y divide-slate-200">
          {generalFaq.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
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
            Ervaar zelf hoe het is om samen te trainen bij Blue Fit. Geen
            verplichtingen, geen risico.
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

      {/* ─── Class Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {activeClass && (
          <ClassModal cls={activeClass} onClose={() => setActiveClass(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
