'use client'

import { useRouter } from 'next/navigation'
import CoachMark from './CoachMark'

const EVENT_TILES = [
  {
    icon: '🏡',
    title: 'Team offsite',
    subtitle: 'Multi-day retreat · 10–40 people',
    eventType: 'Offsite retreat',
  },
  {
    icon: '💡',
    title: 'Workshop space',
    subtitle: 'Day-use · meeting-ready',
    eventType: 'Workshop',
  },
  {
    icon: '📋',
    title: 'Strategy session',
    subtitle: 'Focused 1–2 day formats',
    eventType: 'Strategy session',
  },
  {
    icon: '🥂',
    title: 'Team celebration',
    subtitle: 'Milestone events',
    eventType: 'Team celebration',
  },
]

const STATS = [
  { value: '8,000+', label: 'event-capable properties' },
  { value: '80%', label: 'of Airbnb bookings are groups' },
  { value: '160+', label: 'countries available' },
]

export default function EditorialModule() {
  const router = useRouter()

  const handleTileClick = (eventType: string) => {
    // Analytics: team_events_editorial_click
    // Payload: { variant: 'b', user_id, session_id, tile_selected: eventType }
    router.push(`/team-events/search?eventType=${encodeURIComponent(eventType)}`)
  }

  const handleCTAClick = () => {
    // Analytics: team_events_editorial_click
    // Payload: { variant: 'b', user_id, session_id, tile_selected: 'cta_button' }
    router.push('/team-events/search')
  }

  return (
    <section className="bg-white border border-[#DDDDDD] rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#222222]">Plan your next team event</h2>
            <CoachMark
              number={1}
              title="Mid-page editorial section"
              description="Inserted between trending categories and the standard listings grid. No nav or search bar changes — zero disruption to existing UX. Can be A/B tested on any user subset and personalized to show only when 8+ guests are entered."
              side="bottom"
              forVariant="b"
            />
          </div>
          <p className="text-sm text-[#717171] mt-1">
            Properties suited for offsites, workshops, and company retreats
          </p>
        </div>
        <button
          onClick={() => router.push('/team-events/search')}
          className="hidden md:block text-sm font-semibold text-[#222222] underline hover:text-[#E31C5F] transition-colors"
        >
          See all
        </button>
      </div>

      {/* Event type tiles */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-semibold text-[#717171] uppercase tracking-wide">Browse by event type</p>
        <CoachMark
          number={2}
          title="Event type tiles as entry points"
          description="Each tile navigates directly to /team-events/search pre-filtered by event type — bypassing the landing page entirely. Variant B skips the search form; it assumes planners already know their event type and just need to browse inventory."
          side="bottom"
          forVariant="b"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {EVENT_TILES.map((tile) => (
          <button
            key={tile.eventType}
            onClick={() => handleTileClick(tile.eventType)}
            className="flex items-center gap-3 p-4 rounded-xl border border-[#DDDDDD] bg-[#F7F7F7] hover:bg-white hover:border-[#222222] hover:shadow-sm text-left transition-all group"
          >
            <span className="text-2xl shrink-0" role="img" aria-label={tile.title}>
              {tile.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#222222] group-hover:text-[#E31C5F] transition-colors">
                {tile.title}
              </p>
              <p className="text-xs text-[#717171] mt-0.5 leading-tight">{tile.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* CTA button */}
      <div className="relative">
        <button
          onClick={handleCTAClick}
          className="w-full bg-[#E31C5F] hover:bg-[#c41854] text-white font-semibold text-base py-3.5 rounded-xl transition-colors"
        >
          Find team event spaces
        </button>
        <span className="absolute -top-2.5 -right-2.5">
          <CoachMark
            number={3}
            title="CTA bypasses the search form"
            description="Unlike Variant A where planners fill in Where/When/Team size/Event type before seeing results, Variant B's CTA drops users directly into /team-events/search with no required inputs. Tests whether editorial priming alone is enough to drive search."
            side="left"
            forVariant="b"
          />
        </span>
      </div>

      {/* Stats */}
      <div className="mt-5 pt-5 border-t border-[#DDDDDD]">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs font-semibold text-[#717171] uppercase tracking-wide">Why Airbnb for team events</p>
          <CoachMark
            number={4}
            title="Social proof stats bar"
            description="Addresses the key objection: 'Is Airbnb really for corporate events?' The stats reframe Airbnb's existing scale in corporate-relevant terms — 80% group bookings, 8,000+ event-capable properties. Builds confidence before the planner even searches."
            side="top"
            forVariant="b"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-base font-bold text-[#222222]">{stat.value}</p>
              <p className="text-xs text-[#717171] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
