# Airbnb Team Events — PRD

**Project Title**

Airbnb Team Events: Dedicated Discovery Surface for Corporate Event Planners

One-line description: Test two dedicated discovery surfaces for corporate event planners — a top-nav tab and a homepage editorial module — against a control to determine which entry point best drives search initiation and booking intent.

---

## Problem

**What is the problem?**

Corporate event planners — executive assistants, office managers, HR/People ops leads, and event marketers at companies of 20–200 people — have no dedicated way to discover Airbnb as a solution for team offsites, retreats, workshops, or celebrations. The current platform is optimized for leisure travel: search assumes a single consumer, listings lack corporate-relevant attributes (meeting capacity, AV setup, catering kitchens), and Airbnb's party ban policies actively discourage group bookings without distinguishing between private parties and legitimate corporate use.

As a result, these planners fall back to competitors: Peerspace, Offsite.com, and TeamOut — platforms that exist specifically to capture demand Airbnb cannot currently address.

Quantitatively, this gap is significant:
- 80% of Airbnb bookings are already group trips, yet no dedicated discovery surface exists for corporate groups
- Airbnb's share of business travel grew from 28% (2019) to 44% (2024), confirming corporate demand already exists on the platform
- Large-group bookings (5+ guests) were the fastest-growing segment for 5 consecutive quarters through Q1 2024
- The corporate events startup category (Peerspace, Offsite, TeamOut) raised an estimated $200M+ collectively, signaling a validated, high-willingness-to-pay segment that Airbnb is ceding

Qualitatively, corporate event planners describe their current process as "piecemealing logistics across 5+ platforms." They have a defined budget, headcount, date range, and location in mind — but no way to communicate that intent on Airbnb or surface relevant inventory.

**How does this connect to company goals and strategy?**

Airbnb's current strategic priorities include growing high-value bookings, expanding the Airbnb for Work program, and increasing multi-night stay revenue. Corporate event bookings are structurally superior on all three dimensions: they are multi-night (typically 2–5 nights), involve premium properties (full-house, high-capacity), and generate above-average nightly rates. A single corporate offsite booking for 20 people at $800/night for 3 nights ($2,400 booking value) outperforms the platform average booking (~$400–500 for leisure travel) by 4–5x.

Additionally, Airbnb for Work enrolled 700,000+ companies but never addressed group events — this feature creates a direct expansion path for that dormant B2B asset.

**Why is this problem important?**

If Airbnb does not solve this, the corporate events market will continue consolidating around purpose-built competitors. Airbnb has significant inventory advantages (scale, global coverage, host supply) but is unable to convert them into corporate event revenue without a dedicated discovery surface. The cost of inaction is not just lost revenue — it is ceding a high-LTV customer segment to competitors who, once entrenched, are difficult to displace.

The current handling is insufficient because the problem is not inventory — Airbnb likely has thousands of properties suitable for corporate events today. The problem is signal: planners cannot find them, and properties cannot flag their suitability. This PRD addresses the top of that funnel.

**Goals & Non-goals**

Goals (Phase 1 — this PRD):
- Validate that corporate event intent exists in Airbnb's current user base at a measurable rate
- Surface a dedicated discovery entry point for users with group/event intent
- Establish baseline metrics for downstream conversion to inform Phase 2 and Phase 3

Non-goals:
- Changes to listing pages or host tooling (Phase 2)
- Corporate payment, invoicing, or approval workflows (Phase 3)
- Event management layer, agenda building, or multi-listing coordination (Phase 3)
- Insurance and liability framework for corporate gatherings (separate workstream)
- Real-time booking flow or checkout for the Team events experience

---

## Proposal

**Hypothesis**

By surfacing a dedicated "Team events" entry point — either as a top-nav tab (Variant A) or a homepage editorial module (Variant B) — users with corporate event intent will self-select into the experience, generating an entry point CTR greater than 2% among eligible users and a statistically significant uplift in search initiation compared to control. Comparing Variant A to Variant B will reveal whether corporate event intent is active (users arrive ready to search) or passive (users need editorial priming before engaging).

**How does the proposed solution work?**

*Before:* A corporate event planner visits Airbnb, enters a location and group size (12 guests), and sees a standard Stays results page optimized for leisure. There is no way to filter for meeting space, AV equipment, catering kitchens, or private parking. Listings do not surface event capacity. The planner leaves for Peerspace.

---

**Variant A — Dedicated Nav Tab** *(see mock: Variant A.png)*

"Team events" appears as a top-level nav item with equal visual weight to "Places to stay" and "Experiences." This signals that corporate events are a first-class product, not a filter. Users who land on it get a purpose-built search and browse experience with event-type filtering up front.

*Nav layer:*
- "Team events" tab added to Airbnb's top nav alongside "Places to stay" and "Experiences"
- Always visible to eligible users; clicking it loads /team-events

*/team-events landing page:*
- Extended search bar: Where | When (date range) | Team size | Event type
- Four event type cards: Offsite retreat (2–5 days), Workshop (Day use), Strategy session (1–2 days), Team celebration (Evening event) — each card pre-selects that type in the search bar
- Featured listing grid (8–12 properties) with group capacity badges (e.g., "24 guests"), key amenities (boardroom, catering kitchen, AV setup), and nightly rate

*/team-events/search results page:*
- Search recap bar showing entered parameters (editable)
- Six event-specific filter chips: Meeting space · Catering kitchen · AV setup · Private parking · Flexible cancellation · Entire property
- Listing grid with capacity, top amenities, and price per night
- Map view placeholder

---

**Variant B — Homepage Editorial Module** *(see mock: Variant B.png)*

"Team events" appears as a curated editorial section mid-page on the Airbnb homepage — similar to how Airbnb surfaces "Icons" or seasonal collections. No changes to the nav or search bar. Lower commitment to build; can be A/B tested on a subset and personalized to appear only when large group sizes are detected.

*Homepage module:*
- Section header: "Plan your next team event" with subtitle "Properties suited for offsites, workshops, and company retreats"
- Four event type tiles: Team offsite (Multi-day retreat, 10–40 people), Workshop space (Day-use, meeting-ready), Strategy session (Focused 1–2 day formats), Team celebration (Milestone events)
- Social proof stats bar: 8,000+ event-capable properties · 80% of Airbnb bookings are groups · 160+ countries available
- Primary CTA button: "Find team event spaces" → links to /team-events/search with pre-applied filters

*Search results page (shared with Variant A):*
- Same /team-events/search results page as Variant A (search recap, filter chips, listing grid, map placeholder)

**Metrics**

| Metric Category | Metric Name | Metric Definition | Performance Expectation |
| ----- | ----- | ----- | ----- |
| Success Metric | Entry point CTR | % of eligible users who click the Team events entry point (nav tab in Variant A; editorial module CTA in Variant B) during session | > 2% in at least one variant among eligible users |
| Secondary Metric | Search start rate | % of entry point clickers who submit a search | > 40% in the winning variant |
| Secondary Metric | Listing view rate | % of searchers who click into a listing detail page | > 50% of searchers |
| Secondary Metric | Booking initiation rate | % of listing viewers who click "Book" or "Reserve" | Tracked, no threshold for Phase 1 |
| Secondary Metric | Variant A vs. B CTR delta | Difference in entry point CTR between Variant A and Variant B | Used to determine intent model (active vs. passive); no threshold required |
| Guardrail Metric | Homepage bounce rate | % of homepage sessions that exit without interaction | No increase > 0.5% vs. control |
| Guardrail Metric | Stays booking conversion | Conversion rate for standard Stays bookings | No decrease > 0.3% vs. control |
| Guardrail Metric | Page load time (TTI) | Time to interactive at p75 for homepage and Team events pages | No increase > 50ms vs. control |

**Scope & Requirements**

*Variant A — Nav tab*
- P0: "Team events" tab added to top nav, experiment-gated (control group sees no change)
- P0: Tab links to /team-events landing page; keyboard-navigable; meets WCAG 2.1 AA contrast
- P0: /team-events landing page with four-field search bar (Where, When, Team size, Event type)
- P0: Four event type cards (Offsite retreat, Workshop, Strategy session, Team celebration) that pre-populate Event type on click
- P0: Featured listings grid (8–12 properties); each card shows image, name, location, group capacity, top 2 amenities, nightly rate
- P1: "Group capacity" badge on listing cards (e.g., "Up to 24 guests")

*Variant B — Homepage editorial module*
- P0: Editorial module section inserted mid-page on homepage, experiment-gated
- P0: Section header, four event type tiles, social proof stats bar (8,000+ properties, 80% group bookings, 160+ countries)
- P0: "Find team event spaces" CTA button linking to /team-events/search with pre-applied filters
- P1: Module only shown to eligible users (8+ guest history or 8+ guest entry in current session)

*Shared — Search results page (/team-events/search)*
- P0: Search recap bar showing entered parameters (location, dates, team size, event type); editable
- P0: Six event-specific filter chips: Meeting space, Catering kitchen, AV setup, Private parking, Flexible cancellation, Entire property
- P0: Listing grid with minimum 8 mock results; cards show capacity, amenities, price
- P1: Map view placeholder (labeled "Map coming soon")
- P1: Sort control (Price: low to high, Capacity: high to low)

*Analytics instrumentation (code comments)*
- P0: `team_events_nav_click` — Variant A only; payload: variant, user_id, session_id, timestamp, previous_page
- P0: `team_events_editorial_click` — Variant B only; payload: variant, user_id, session_id, tile_selected
- P0: `team_events_search_start` — both variants; payload: team_size, event_type, location, date_range
- P0: `team_events_listing_view` — both variants; payload: listing_id, position_in_results, filters_applied
- P0: `team_events_filter_applied` — both variants; payload: filter_name, was_search_submitted_after
- P0: `team_events_booking_initiated` — both variants; payload: listing_id, group_size, nightly_rate

*Out of scope for MVP*
- Real listing database integration (use mock data)
- Real booking/checkout flow ("Book" button is disabled or links to placeholder)
- Corporate payment, invoicing, approval workflows
- Listing page enhancements (Phase 2)
- Zero-state/empty results handling (return minimum 8 mock results)
- Budget-per-night search field (Phase 2)

**Alternate Proposals**

| Option | Description | Why Ruled Out |
| ----- | ----- | ----- |
| **C — Search mode toggle** | Add a "Team events" mode toggle within the existing Stays/Experiences search pill. Extends a native pattern; medium build effort; keeps corporate events within the existing search paradigm. | Subordinates the feature within Stays rather than signaling a new product category. Harder to measure independently from standard search. Lower brand signal. Included as a consideration for Phase 2 if Variants A and B both underperform. |
| **A — Dedicated nav tab only (no homepage module)** | Run a two-arm test (Control vs. nav tab) without the homepage editorial module. | We lose the ability to understand whether intent is active or passive. The A vs. B comparison is the most strategically valuable output of this experiment — ruling it out reduces learning. |
| **D — Airbnb for Work expansion** | Expand the existing B2B Airbnb for Work program to include group event bookings. | Lower data volume, longer sales cycles, and no D2C demand signal. B2B expansion is a Phase 3 follow-up once D2C demand is validated. |

---

## Plan

**Experiment Overview**

*See design mocks: Variant A.png (nav tab), Variant B.png (homepage editorial module)*

| | Control (~33%) | Variant A — Nav Tab (~33%) | Variant B — Homepage Editorial (~33%) |
| ----- | ----- | ----- | ----- |
| **Navigation** | No change. Standard Airbnb top nav. | "Team events" tab added alongside "Places to stay" and "Experiences." | No change to nav. |
| **Homepage** | No change. | No change. | "Plan your next team event" editorial module inserted mid-page with four event type tiles, social proof stats, and "Find team event spaces" CTA. |
| **Entry point** | None | /team-events landing page (search bar + event type cards + listings grid) | /team-events/search pre-filtered by event intent |
| **Search experience** | Standard Stays search | Extended search: Where, When, Team size, Event type | Standard search; users bypass search and land directly in filtered results |
| **Results page** | Standard Stays results | /team-events/search (filter chips, capacity-tagged cards) | Same /team-events/search results page |
| **Signal type** | Baseline | Active intent — user navigates to a new product category | Passive discovery — user responds to editorial placement |
| **Eligible population** | Users with 8+ guest search history in past 12 months, Airbnb for Work enrollees, or current sessions with 8+ guest entry (~12–15% of MAU) | Same | Same |
| **Sample size** | ~33,000 users | ~33,000 users | ~33,000 users (~100K total) |
| **Duration** | Minimum 8 weeks. No early stopping unless guardrail violations. | Same | Same |

**Experiment Success Criteria & Decision Guide**

| Metric Outcome | Decision |
| ----- | ----- |
| Variant A CTR > 2% AND search start rate > 40% | **Ship Variant A.** Active intent model confirmed. Corporate planners will navigate to a dedicated category. Begin Phase 2 (listing page enhancements). |
| Variant B CTR > 2% AND search start rate > 40%, Variant A CTR < 2% | **Ship Variant B.** Passive discovery model confirmed. Corporate planners need editorial priming. Nav tab is premature; homepage module is the right Phase 1 surface. |
| Both Variant A and B CTR > 2%, Variant A search start rate significantly higher | **Ship Variant A.** Nav tab drives higher-quality intent. Homepage module can remain as a secondary awareness driver. |
| Both Variant A and B CTR > 2%, Variant B search start rate significantly higher | **Surprising result.** Run qualitative research to understand why editorial module drives more searches. Consider hybrid: editorial module + nav tab together. |
| Both variants CTR < 2% | **Do not ship either variant.** Demand signal is insufficient in the current eligible population. Evaluate whether eligibility criteria were too narrow (e.g., expand to 5+ guest history) or whether Airbnb's user base lacks corporate event intent at meaningful scale. |
| Either variant CTR > 2% but search start rate < 40% | **Do not ship.** Users are curious but not converting to search. Likely: landing page UX friction or unclear event type framing. Design iteration needed before re-test. |
| Any guardrail violated (homepage bounce rate, Stays conversion, TTI) | **Kill the violating variant immediately.** Investigate segmentation — if harm is concentrated in leisure users, tighten eligibility to Airbnb for Work enrollees only and re-run. |

**Follow-up phases contingent on Variant A success:**

- **Phase 2**: Listing page enhancements — event amenity data fields for hosts, capacity badges on standard listing pages, host certification for corporate events
- **Phase 3**: Booking infrastructure — corporate payment/invoicing, multi-listing coordination, approval workflows, event agenda layer

---

*PRD version: 1.1 — Updated to three-arm multivariate experiment design (Control / Variant A nav tab / Variant B homepage editorial module). Design mocks: Variant A.png, Variant B.png. Pending review by Engineering, Design, and Data.*
