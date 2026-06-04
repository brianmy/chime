# Airbnb Team Events — Prototype

An interactive prototype testing two dedicated discovery surfaces for corporate event planners against a control. Built in Next.js 14.

**Live demo:** https://airbnb-team-events-bmy.vercel.app/

---

## The problem

Corporate event planners — executive assistants, office managers, HR leads, and event marketers at companies of 20–200 people — have no dedicated way to discover Airbnb for team offsites, retreats, workshops, or celebrations. The platform is optimized for leisure: search assumes a single consumer, listings lack group-relevant attributes (meeting capacity, AV setup, catering kitchens), and Airbnb's party ban policies actively discourage group bookings without distinguishing corporate use.

As a result, planners fall back to competitors: Peerspace, Offsite.com, and TeamOut.

The gap is significant:
- 80% of Airbnb bookings are already group trips — no dedicated discovery surface exists for corporate groups
- Airbnb's share of business travel grew from 28% (2019) to 44% (2024)
- Large-group bookings (5+ guests) were the fastest-growing segment for 5 consecutive quarters through Q1 2024
- The corporate events startup category raised an estimated $200M+, signaling a validated segment Airbnb is ceding

The problem is not inventory. Airbnb likely has thousands of suitable properties today. The problem is signal — planners can't find them, and properties can't flag their suitability.

---

## The experiment

A three-arm multivariate test (~100K eligible users, 8-week minimum runtime) comparing two entry points against a control.

**Eligible population:** Users with 8+ guest search history in the past 12 months, Airbnb for Work enrollees, or current sessions with 8+ guest entry (~12–15% of MAU).

### Control (~33%)

No change. Standard Airbnb homepage and nav. Establishes baseline CTR, search start rate, and booking conversion for the eligible population.

### Variant A — Nav Tab (~33%)

"Team events" appears as a top-level nav item alongside "Places to stay" and "Experiences" — equal visual weight, signaling a first-class product category.

Clicking it loads `/team-events`, a purpose-built landing page with:
- Extended search bar: Where · When · Team size · Event type
- Four event type cards (Offsite retreat, Workshop, Strategy session, Team celebration) that pre-populate the Event type field
- Featured listing grid with group capacity badges and event-relevant amenities

Tests **active intent** — does a dedicated nav category drive corporate planners who already know what they want?

### Variant B — Homepage Editorial Module (~33%)

A curated editorial section inserted mid-page on the Airbnb homepage. No nav or search bar changes — zero disruption to the existing UX. Similar to how Airbnb surfaces "Icons" or seasonal collections.

The module includes:
- Four event type tiles linking directly to pre-filtered search results
- Social proof stats: 8,000+ event-capable properties · 80% group bookings · 160+ countries
- "Find team event spaces" CTA → `/team-events/search`

Tests **passive discovery** — can editorial priming surface latent corporate event intent in users who weren't actively searching for it?

---

## Success criteria

| Metric | Definition | Threshold |
|---|---|---|
| Entry point CTR | % of eligible users who click the Team events entry point | > 2% in at least one variant |
| Search start rate | % of entry point clickers who submit a search | > 40% in the winning variant |
| Listing view rate | % of searchers who click into a listing | > 50% of searchers |
| Homepage bounce rate | % of homepage sessions that exit without interaction | No increase > 0.5% vs. control |
| Stays booking conversion | Conversion rate for standard Stays bookings | No decrease > 0.3% vs. control |

**Decision guide:**
- **Variant A CTR > 2%, search start rate > 40%** → Ship Variant A. Active intent confirmed. Begin Phase 2 (listing page enhancements).
- **Variant B wins, Variant A CTR < 2%** → Ship Variant B. Passive discovery model confirmed; nav tab is premature.
- **Both variants CTR < 2%** → Do not ship. Demand signal insufficient; evaluate whether eligibility criteria are too narrow.
- **Any guardrail violated** → Kill the violating variant immediately.

---

## Prototype

This repo is a functional Next.js prototype of all three variants with an experiment demo switcher. It is **not** connected to Airbnb's real listing database — all listing data is mocked.

### Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Use the "Experiment Demo" bar at the top to switch between Control, Variant A, and Variant B. Numbered annotation badges (●) explain each design decision — toggle them with "Hide/Show annotations."

### Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

### Project structure

```
app/
  page.tsx                  # Homepage (Control baseline + Variant B editorial module)
  team-events/
    page.tsx                # Variant A landing page (/team-events)
    search/                 # Shared search results page (/team-events/search)
components/
  Nav.tsx                   # Top nav (Variant A tab)
  EditorialModule.tsx       # Variant B homepage module
  SearchBar.tsx             # Extended search bar (Where/When/Team size/Event type)
  EventTypeCard.tsx         # Event type selection cards
  ListingCard.tsx           # Listing card with capacity badge
  CoachMark.tsx             # Numbered annotation system
  VariantContext.tsx        # Experiment state (variant, showCoachMarks)
  VariantSwitcher.tsx       # Demo switcher bar
data/
  listings.ts               # Mock listing data
```

---

## Roadmap

**Phase 1 (this prototype):** Validate entry point CTR and search initiation. No listing page changes, no booking flow.

**Phase 2** *(contingent on Phase 1 success):* Listing page enhancements — event amenity fields for hosts, capacity badges on standard listing pages, host certification for corporate events.

**Phase 3:** Booking infrastructure — corporate payment/invoicing, multi-listing coordination, approval workflows.
