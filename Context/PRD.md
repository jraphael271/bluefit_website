# 📘 BlueFit Website PRD

---

## 1. 🧭 Product Overview & Objectives

### 1.1 Objective

Build a modern, cinematic, and responsive website for Blue Fit (Lent), inspired by the Blue Zones philosophy, emphasizing:

- **Bewegen** (Movement)
- **Gezonde voeding** (Nutrition)
- **Purpose** (Zingeving)
- **Community** (Verbinding)

### 1.2 Product Vision

The website acts as a **digital storefront + experience platform** that:

- **Attracts new members** → Primary focus: drive users to *Proefweek* (free trial)
- **Supports existing members** → Clear access via *Inloggen* (external portal)
- **Clearly communicates:**
  - Fitness offerings
  - Group classes
  - External services (PT, Nutrition, Massage)

### 1.3 Target Audience

- General fitness users (functional, cardio, smart equipment)
- Seniors 55+ (Blue Icons)
- Parents with children (Blue Stars)
- Pregnant/postpartum women (Mama Flow)

### 1.4 Architecture Principle

The platform uses a **hybrid routing model**:

- Homepage → SPA-style scroll experience
- Core offerings → dedicated routes
- External systems → handled outside the website

### 1.5 🎨 Design Authority & Flexibility

This PRD defines:
- Structure
- UX
- Components

But **NOT** final UI styling.

| Concern | Rule |
|---|---|
| Structure | Fixed |
| UI | Flexible |

> **Builder Constraints:** Use modern, minimal UI. Keep components modular. Avoid rigid design.

---

## 2. 🎨 Design System & UI Theme

### 2.1 Color Palette *(MANDATORY)*

| Role | Color |
|---|---|
| Primary (CTAs, active states, highlights) | Ocean Blue |
| Background | Pearl White |
| Background (secondary) | Light Sky Blue (`sky-50`, `sky-100`) |
| Text | `sky-950` / dark charcoal (high contrast) |

### 2.2 Typography

- **Font:** Inter / Roboto / Montserrat
- **Scale:** H1 / H2 / H3 / Body / Small

### 2.3 Component Styling

- Rounded corners
- Subtle shadows
- Smooth hover transitions
- Generous spacing

---

## 3. 🧱 Navigation & Routing

### 3.1 Navigation Bar *(MANDATORY)*

**Items:** Home · Aanbod · Tarieven · Over ons · Contact · Inloggen · **Proefweek**

| Item | Behavior |
|---|---|
| Home | Scroll to top |
| Aanbod | Navigate |
| Tarieven | Navigate |
| Over ons | Scroll |
| Contact | Scroll |
| Inloggen | External link |
| **Proefweek** | **External link (PRIMARY CTA)** |

**Requirements:**
- Sticky navbar
- Smooth scroll
- Active state tracking

### 3.2 Routing Map

> ❗ Only these routes exist

```
/
/aanbod
/aanbod/fitness
/aanbod/groepslessen
/aanbod/personal-training
/aanbod/voeding
/aanbod/relax-massage
/aanbod/overig
/tarieven
/tarieven/abonnementen
```

---

## 4. 🏠 Homepage (SPA Structure)

### 4.1 Hero — `<Hero />`

- Uses `<BeamsBackground />`
- **H1:** `Blue Fit: De Blue Zone aan de Waal`
- CTA → Proefweek (external)

### 4.2 Intro — `<Intro />`

- Blue Zone explanation
- Navigation cards:
  - Fitness
  - Groepslessen

### 4.3 Over Ons — `<section id="over-ons">`

- Mission (founded 2025)
- Core values:
  - Bewegen
  - Gezonde voeding
  - Purpose
  - Community

### 4.4 Contact — `<section id="contact">`

| Field | Value |
|---|---|
| Address | Moormannstraat 4, Lent |
| Phone | 0646916076 |
| Email | info@blue-fit.nl |
| KVK | 90705211 |

**Integrations:** Google Maps · Facebook · Instagram

---

## 5. 📄 Aanbod Structure

### 5.1 `/aanbod/fitness`

- Smart equipment
- Functional zone
- Cardio park

### 5.2 `/aanbod/groepslessen`

**`<ClassGrid />`** — Classes:

| Class | Type |
|---|---|
| Ocean Flow | Gentle/Vinyasa yoga |
| Sky High | HIIT |
| Blue Beats | Zumba/dance cardio |
| Mama Flow | Pre/postnatal |
| Blue Stars | Children's dance |
| Blue Icons | Seniors fitness |
| Shred It Blue | HIIT + strength |
| Bootcamp | Outdoor training |
| Spinnergy | Indoor cycling |
| Iron Pump | Strength to music |
| Blue Motion | Modern dance |
| Blue Step & Shape | Step aerobics |

**`<ClassModal />`** — Displays:
- Title
- Intro
- Benefits
- Practical info

**`<ClassSchedule />`**

> ❗ MUST use `<iframe>`
> **Reason:** External schedule system (dynamic)

### 5.3 External Services

**Routes:**
- `/aanbod/personal-training`
- `/aanbod/voeding`
- `/aanbod/relax-massage`

> ❗ **CRITICAL UX REQUIREMENT**
> Must clearly state: *These services are provided by independent entrepreneurs*
>
> **Implementation:** Highlight boxes · Warning UI · Clear disclaimers

---

## 6. 💳 Tarieven

### `/tarieven/abonnementen` — `<PricingTable />`

#### Memberships

| Subscription | Price |
|---|---|
| Blue | €56 / 4 weeks |
| Blue Flex | €63 / 4 weeks |
| Light Blue | €46 / 4 weeks |
| Light Blue Flex | €46 / 4 weeks |

#### Add-ons & Special Subscriptions

| Option | Price |
|---|---|
| Bootcamp | €28 / 4 weeks |
| Blue Icons | €29.50 / 4 weeks |
| Blue Stars | €30 / 4 weeks (€15 for members) |
| Mama Flow | €30 / 4 weeks |
| Day pass | €16.50 |

---

## 7. 🧩 Component Architecture

### Core Components

| Component | Purpose |
|---|---|
| `<BeamsBackground />` | Hero visual background |
| `<NavBar />` | Sticky navigation |
| `<ExternalButton />` | External link CTA |
| `<SmoothScrollLink />` | Anchor scroll navigation |

### Content Components

| Component | Purpose |
|---|---|
| `<FAQAccordion />` | Expandable FAQ sections |
| `<TestimonialSlider />` | Member reviews carousel |
| `<PricingTable />` | Subscription pricing display |

### Class Components

| Component | Purpose |
|---|---|
| `<ClassGrid />` | Grid overview of all group classes |
| `<ClassModal />` | Detailed class info overlay |
| `<ClassSchedule />` | Embedded iframe schedule |

---

## 8. ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | lucide-react |

---

## 9. 📱 UX Requirements

- Mobile-first
- Fast performance
- Smooth scrolling
- Clear visual hierarchy

---

## 10. 📊 Success Metrics

| Metric | Description |
|---|---|
| Proefweek conversions | Primary conversion goal |
| Time on site | Engagement indicator |
| Bounce rate | Content relevance signal |
| Scroll depth | Page engagement tracking |
