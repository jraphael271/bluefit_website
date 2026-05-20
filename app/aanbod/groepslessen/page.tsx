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
      "Zoek je een fijne plek voor yoga in Lent of een toegankelijke yogales in Nijmegen? Dan is de Ocean Flow bij Blue Fit wat voor jou. In deze les werk je op een rustige manier aan flexibiliteit, kracht en ontspanning.",
    description:
      "Tijdens de Ocean Flow neem je deel aan vloeiende series van houdingen die elkaar opvolgen. De focus ligt op ademhaling, souplesse en bewust bewegen. Of je nu in Lent woont of uit de omgeving van Nijmegen komt, bij Blue Fit vind je een veilige plek om te ontspannen en sterker te worden. Onze trainer begeleidt je stap voor stap, waardoor de les geschikt is voor zowel beginners als ervaren yogi's.",
    benefits: [
      "Vermindert stress en bevordert ontspanning",
      "Verbetert flexibiliteit en houding",
      "Versterkt spieren zonder overbelasting",
      "Geschikt voor ieder niveau",
    ],
    goal: "Balans, flexibiliteit & ontspanning",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Moet ik ervaring hebben met yoga in Lent om mee te doen?",
        a: "Nee, Yoga Flow bij Blue Fit in Lent is geschikt voor alle niveaus. De trainer geeft opties zodat iedereen kan meedoen.",
      },
      {
        q: "Helpt Ocean Flow ook tegen stress?",
        a: "Ja, veel Blue Fitters ervaren na hun yogales in Lent minder spanning en meer energie.",
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
      "Wil je in korte tijd maximaal resultaat behalen? Kies voor Sky High HIIT in Lent bij Blue Fit. Een intensieve les met korte, explosieve intervallen die je conditie, kracht en vetverbranding naar een hoger niveau tillen. Je gaat samen met andere Blue Fitters tot het gaatje. Allemaal om je eigen doel te halen.",
    description:
      "Tijdens Sky High train je in intervallen van hoge intensiteit, afgewisseld met korte rustmomenten. Denk aan burpees, box jumps, sprints en kettlebell swings. Het tempo ligt hoog, de energie van de groep trekt je mee en de afterburn zorgt ervoor dat je ook ná de training calorieën blijft verbranden. Een training waar je echt samen tot het gaatje gaat en je doelen behaalt.",
    benefits: [
      "Effectieve training in korte tijd",
      "Boost voor kracht en conditie",
      "Hoge calorieverbranding, ook na afloop",
      "Motiverende groepsdynamiek",
    ],
    goal: "Explosieve kracht & conditie",
    duration: "30 min",
    intensity: 4,
    faq: [
      {
        q: "Hoe lang duurt de HIIT-les Sky High in Lent?",
        a: "30 minuten. Kort, maar zeer effectief.",
      },
      {
        q: "Is HIIT in Nijmegen geschikt voor iedereen?",
        a: "Ja, maar het is intensief. Beginners kunnen lichtere varianten doen.",
      },
      {
        q: "Wat zijn de voordelen van HIIT in Lent?",
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
      "Tijdens Shred It Blue wissel je intensieve krachtoefeningen af met conditionele intervallen op de fiets. Denk aan Squats, Deadlifts en bicep curls. Je traint samen met andere Blue Fitters in een motiverende groepssfeer. Onze trainer zorgt ervoor dat iedereen kan meedoen op zijn of haar eigen niveau. Een perfecte training om jezelf goed uit te dagen. Wil je op een rustiger niveau instappen hebben we ook de Light versie beschikbaar.",
    benefits: [
      "Snel calorieën verbranden",
      "Verbetert zowel kracht als conditie",
      "Uitdagend en dynamisch",
      "Elke les is weer anders",
    ],
    goal: "Vetverbranding & conditie",
    duration: "45 min",
    intensity: 3,
    faq: [
      {
        q: "Is Shred It hetzelfde als een HIIT-les in lent?",
        a: "Nee, Shred It Blue is intensief maar weer totaal anders geen springen, wel worden zowel kracht als uithouding gecombineerd waardoor je een full body workout hebt.",
      },
      {
        q: "Kan ik Shred It in Nijmegen volgen als beginner?",
        a: "Ja, door gewichten aan te passen en het tempo op de fiets kan je het altijd lichter of zwaarder naar jouw niveau trainen, zodat iedereen veilig mee kan doen. We hebben ook altijd nog de Light versie beschikbaar.",
      },
      {
        q: "Hoeveel calorieën verbrand ik met Shred It Blue?",
        a: "Gemiddeld 500–800 kcal per les, afhankelijk van jouw inzet.",
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
      "Wil je sterker worden en werken aan je spieropbouw? Kies voor Iron Pump bij Blue Fit in Lent, dé groepsles waarin conditionele krachttraining op het ritme van de muziek centraal staat. Onder begeleiding van onze trainers werk je veilig, samen met andere Blue Fitters aan je hele lichaam.",
    description:
      "Tijdens Iron Pump train je met stangen en losse gewichten. Je werkt in blokken waarin verschillende spiergroepen aan bod komen: benen, borst, rug, armen en core. Dankzij de groepssfeer en motiverende beats haal je altijd meer uit jezelf. Zodat jij jouw doelen kan overtreffen.",
    benefits: [
      "Verhoogt spierkracht en spiermassa",
      "Techniektraining onder begeleiding",
      "Veilige en gestructureerde duurkrachtles",
      "Complete full-body workout",
    ],
    goal: "Spierkracht & core stability",
    duration: "45 min",
    intensity: 2,
    faq: [
      {
        q: "Moet ik ervaring hebben met krachttraining in Lent om mee te doen?",
        a: "Nee, onze trainer legt alles uit en helpt je met de juiste techniek. Ieder kan op zijn eigen niveau trainen.",
      },
      {
        q: "Werk je met zware gewichten tijdens Iron Pump in Nijmegen?",
        a: "Dat bepaal je zelf. Je start licht en bouwt op naarmate je sterker wordt.",
      },
      {
        q: "Helpt Iron Pump om spiermassa op te bouwen?",
        a: "Ja, dit is dé groepsles in Lent voor spieropbouw en kracht uithoudingsvermogen.",
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
      "Ben je op zoek naar een intensieve spinningles of een uitdagende indoor cycling ervaring? Dan is Spinnergy bij Blue Fit jouw groepsles. Met opzwepende muziek fiets je jezelf samen met andere Blue Fitters fit en vol energie.",
    description:
      "Tijdens Spinnergy werk je met variërende tempo's en weerstandsniveaus. Klimmen, sprinten en steady rides wisselen elkaar af. De muziek en de groepssfeer tillen je door de intensieve sessies heen, waardoor je jezelf elke keer opnieuw uitdaagt. Je zult zien dat het elke week beter gaat en je makkelijker je doelen haalt.",
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
        q: "Heb ik mijn eigen fiets nodig voor Spinnergy in Lent?",
        a: "Nee, Blue Fit zorgt voor indoor fietsen. Je neemt alleen sportkleding, een handdoek en water mee.",
      },
      {
        q: "Is spinning in Nijmegen geschikt voor beginners?",
        a: "Ja, je bepaalt zelf de weerstand en snelheid.",
      },
      {
        q: "Hoe intensief is Spinnergy bij Blue Fit in Lent?",
        a: "Het is een intensieve cardio-les, maar door de aanpasbare weerstand kan iedereen op zijn eigen niveau meedoen.",
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
      "Wil je sporten in de frisse buitenlucht? Met Bootcamp in Lent bij Blue Fit werk je in groepsverband aan kracht, conditie en uithoudingsvermogen. Dé buitentraining voor wie houdt van afwisseling en energie.",
    description:
      "Elke Bootcamp is anders. Je doet een mix van hardloopsprints, push-ups, squats, intervaltraining en spelelementen. Onder begeleiding van een trainer ga je aan de slag met je eigen lichaamsgewicht en uitdagende oefeningen. De groepsdynamiek zorgt voor extra motivatie en de buitenlucht geeft net dat beetje extra power. We dagen je uit om doelen te stellen, deze te halen en weer voor nieuwe te gaan. Zodat je blijft groeien.",
    benefits: [
      "Complete full-body workout",
      "Werkt aan zowel kracht als conditie",
      "Extra motivatie door de groep",
      "Sporten in de buitenlucht",
    ],
    goal: "Uithoudingsvermogen & spierkracht",
    duration: "60 min",
    intensity: 3,
    faq: [
      {
        q: "Gaat Bootcamp in Lent altijd buiten door?",
        a: "Ja, Bootcamp bij Blue Fit is een buitentraining. Alleen bij extreem slecht weer wijken we uit naar binnen.",
      },
      {
        q: "Is Bootcamp in Nijmegen geschikt voor beginners?",
        a: "Zeker. De trainer geeft variaties, zodat zowel beginners als gevorderden kunnen meedoen.",
      },
      {
        q: "Wat moet ik meenemen naar Bootcamp in Lent?",
        a: "Stevige schoenen, sportkleding die vies mag worden en een flesje water.",
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
      "Hou je van muziek en bewegen? Dan is Blue Beats jouw groepsles! Deze Zumba-les in Lent combineert dans, cardio en fun in één. Je traint niet alleen je conditie, maar krijgt er ook een flinke dosis energie en plezier voor terug.",
    description:
      "Tijdens Blue Beats volg je ritmische bewegingen en danscombinaties op opzwepende muziek. De les is toegankelijk voor iedereen: je beweegt op je eigen niveau en geniet vooral van het plezier in de groep. Ideaal om fit te worden zonder dat het voelt als sporten.",
    benefits: [
      "Cardio en fun in één les",
      "Verbetert coördinatie en ritmegevoel",
      "Hoge funfactor, lage drempel",
      "Perfect om samen te doen",
    ],
    goal: "Cardio, coördinatie & fun",
    duration: "45–50 min",
    intensity: 2,
    faq: [
      {
        q: "Is Blue Beats hetzelfde als Zumba in Lent?",
        a: "Ja, het is onze eigen Zumba-les met een Blue Fit twist.",
      },
      {
        q: "Moet ik kunnen dansen om mee te doen aan Zumba in Nijmegen?",
        a: "Nee, de les draait om plezier en bewegen. Iedereen kan instappen.",
      },
      {
        q: "Hoeveel calorieën verbrand ik tijdens Blue Beats in Lent?",
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
      "Wil je tijdens of na je zwangerschap veilig blijven bewegen? Mama Flow in Lent is speciaal ontwikkeld voor (aanstaande) moeders die willen werken aan herstel, mobiliteit en balans in een vertrouwde setting. Je traint in een groep waarin ruimte is voor aandacht, begrip en verbinding — met jezelf én met andere moeders.",
    description:
      "De les bestaat uit rustige, veilige yoga oefeningen gericht op bekkenbodem, ademhaling en lichte kracht. Onze ervaren trainer houdt rekening met de fase waarin jij zit, zodat de les altijd aansluit bij jouw lichaam. Je bouwt kracht op, ontspant en krijgt meer energie – allemaal op een veilige manier.",
    benefits: [
      "Veilige training tijdens en na zwangerschap",
      "Focus op herstel en balans",
      "Versterkt bekkenbodem en core",
      "Kleinschalige, persoonlijke groepsles",
    ],
    goal: "Bekkenbodem, mobiliteit & herstel",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Vanaf wanneer na de bevalling mag ik Mama Flow in Lent volgen?",
        a: "Meestal vanaf 6 weken, maar overleg altijd met je arts of verloskundige.",
      },
      {
        q: "Is Mama Flow in Nijmegen ook geschikt tijdens de zwangerschap?",
        a: "Ja, de oefeningen worden aangepast per trimester.",
      },
      {
        q: "Kan ik mijn baby meenemen naar Mama Flow in Lent?",
        a: "Nee, dit is niet mogelijk.",
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
      "Tijdens Blue Icons doe je functionele oefeningen die gericht zijn op mobiliteit, balans en spierkracht. Alles gebeurt in een rustig tempo en onder begeleiding van een ervaren trainer. De nadruk ligt op gezond bewegen en plezier maken in een sociale, gezellige setting.",
    benefits: [
      "Houdt spieren en gewrichten soepel",
      "Verbetert balans en stabiliteit",
      "Vergroot vitaliteit en energie",
      "Sociale en laagdrempelige groepsles",
    ],
    goal: "Soepel bewegen, kracht & vitaliteit",
    duration: "45 min",
    intensity: 1,
    faq: [
      {
        q: "Voor welke leeftijd is Blue Icons in Lent bedoeld?",
        a: "De les is gericht op senioren (55+), maar iedereen die rustig wil bewegen en kalm wil trainen is welkom.",
      },
      {
        q: "Is senioren fitness in Nijmegen intensief?",
        a: "Nee, de les wordt rustig opgebouwd en afgestemd op de deelnemers.",
      },
      {
        q: "Moet ik lid zijn om mee te doen aan Blue Icons?",
        a: "Nee, ook niet-leden kunnen altijd een gratis 2 weken proberen.",
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
      "Altijd al willen dansen of je moderne danstechniek verbeteren? Blue Motion is dé groepsles voor iedereen die wil genieten van dans, beweging, expressie én verbinding. Je leert vloeiende combinaties, werkt aan kracht, souplesse en coördinatie, en ontdekt hoe je dans kunt gebruiken om jezelf te uiten — in contact met je lichaam én de mensen om je heen.",
    description:
      "Tijdens Blue Motion word je begeleid door een ervaren dansdocent. Je leert moderne danstechnieken, werkt aan lichaamscontrole en muzikaliteit en bouwt choreografieën op in een fijne, open sfeer. De les is geschikt voor zowel beginners als gevorderde dansers — iedereen kan op zijn eigen niveau instappen.",
    benefits: [
      "Verbetert kracht, lenigheid en coördinatie",
      "Vergroot lichaamsbewustzijn en expressie",
      "Creatief en ontspannend tegelijk",
      "Geschikt voor alle leeftijden en niveaus",
    ],
    goal: "Moderne dans & creatieve beweging",
    duration: "45 min",
    intensity: 2,
    faq: [
      {
        q: "Wat is het doel van Blue Motion in Lent?",
        a: "Plezier, techniek verbeteren en je expressie.",
      },
      {
        q: "Is moderne dans in Nijmegen geschikt voor beginners?",
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
      "Zoekt jouw kind een leuke en actieve dansles? Blue Stars is speciaal ontwikkeld voor kinderen van 3 t/m 10 jaar die samen willen bewegen, plezier maken en nieuwe dansstijlen ontdekken. Van stoere hiphopmoves tot elegante balletpassen — elke les is een vrolijk avontuur vol muziek en creativiteit.",
    description:
      "Tijdens Blue Stars krijgen kinderen les van enthousiaste en ervaren dansdocenten. Ze leren basisbewegingen uit verschillende stijlen zoals hiphop, moderne dans, breakdance en ballet. Door spel en dans ontwikkelen ze ritmegevoel, coördinatie en zelfvertrouwen. De lessen zijn speels en veilig, met veel ruimte voor eigen expressie.",
    benefits: [
      "Stimuleert motoriek en coördinatie",
      "Vergroot zelfvertrouwen en creativiteit",
      "Kennismaking met meerdere dansstijlen",
      "Vrolijke, veilige en energieke sfeer",
    ],
    goal: "Dansplezier & ontwikkeling",
    duration: "45 min",
    intensity: 2,
    faq: [],
  },
  {
    id: "box-fit-blue",
    name: "Box Fit Blue",
    type: "Boksen",
    tagColor: "#DC2626",
    photo: "/photos/B043.jpg",
    intro:
      "Wil je werken aan je conditie, kracht én energie kwijt kunnen? Box Fit Blue is dé boxing workout in Lent waarbij boksen, cardio en functionele oefeningen samenkomen. Tijdens deze energieke groepsles train je je hele lichaam op motiverende muziek en verbeter je zowel je fitheid als je kracht.",
    description:
      "Tijdens Box Fit Blue werk je met verschillende bokstechnieken zoals stoten, combinaties en voetenwerk. Dit wordt afgewisseld met cardio- en krachtoefeningen voor een complete full body workout. Je bokst op pads, zakken of in duo's, zonder fysiek contact. De les is uitdagend, motiverend en perfect om stress los te laten. De energie van de groep zorgt ervoor dat je met een voldaan gevoel naar huis gaat.",
    benefits: [
      "Verbetert conditie en uithoudingsvermogen",
      "Versterkt het hele lichaam",
      "Ideaal voor stressrelease en extra energie",
      "Motiverende en energieke groepssfeer",
      "Geschikt voor zowel beginners als gevorderden",
    ],
    goal: "Conditie, kracht & stressrelease",
    duration: "45 min",
    intensity: 3,
    faq: [
      {
        q: "Heb ik ervaring nodig voor Box Fit Blue in Lent?",
        a: "Nee, de les is geschikt voor beginners én gevorderden. De trainer helpt je stap voor stap met de technieken.",
      },
      {
        q: "Wat train ik tijdens Box Fit Blue in Nijmegen?",
        a: "Je werkt aan conditie, kracht, coördinatie en snelheid. Daarnaast is het een perfecte workout om stress los te laten.",
      },
      {
        q: "Is Box Fit Blue in Lent zwaar?",
        a: "De les is intensief, maar je bepaalt zelf hoe hard je meedoet. Daardoor is de workout toegankelijk voor ieder niveau.",
      },
    ],
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
    q: "Moet ik ervaring hebben om mee te doen aan een groepsles?",
    a: "Nee, onze groepslessen zijn toegankelijk voor alle niveaus. De trainer geeft altijd opties en variaties, zodat je op je eigen tempo kunt meedoen.",
  },
  {
    q: "Hoe kan ik me aanmelden voor een groepsles?",
    a: "Je meldt je eenvoudig aan via de Blue fit klantenportaal. Zo weet je zeker dat je plek gereserveerd is.",
  },
  {
    q: "Wat als ik een les niet kan volgen nadat ik me heb aangemeld?",
    a: "Geen probleem! In de app kun je je afmelden, zodat iemand anders je plek kan innemen.",
  },
  {
    q: "Zijn groepslessen inbegrepen in mijn abonnement?",
    a: "Ja, groepslessen zijn onderdeel van je Blue Fit lidmaatschap. Je kunt dus onbeperkt meedoen.",
  },
  {
    q: "Wat moet ik meenemen naar een groepsles?",
    a: "Sportkleding waarin je lekker beweegt, schone sportschoenen en een handdoek. Voor sommige lessen is een flesje water handig. Matjes en materialen zijn aanwezig bij Blue Fit.",
  },
  {
    q: "Hoe intensief zijn de groepslessen?",
    a: "Dat verschilt per les. Bij elke les staat een indicatie van de intensiteit (●○○ / ●●○ / ●●●). Zo kies je gemakkelijk een les die bij jouw niveau past.",
  },
  {
    q: "Kan ik een groepsles eerst uitproberen?",
    a: "Zeker! Je bent welkom om een gratis proefles mee te doen en de sfeer zelf te ervaren.",
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
              Bij Blue Fit sport je samen! Samen sporten is niet alleen leuker, het zorgt ook voor verbinding en motivatie. Precies dat gemeenschapsgevoel dat zo kenmerkend is voor de Blue Zones. Bij ons vind je een breed aanbod aan groepslessen: van ontspannen en mindful tot energiek en uitdagend. Voor ieder wat wils passend bij jouw doel.
            </p>
          </div>
          <div className="md:pt-24">
            <p className="text-slate-500 leading-[1.75]">
              Of je nu wilt ontspannen, kracht opbouwen of lekker zweten: er is altijd een les die bij je past.
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
