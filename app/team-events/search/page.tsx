'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import FilterChips from '@/components/FilterChips'
import ListingCard from '@/components/ListingCard'
import CoachMark from '@/components/CoachMark'
import { listings, type FilterChip } from '@/data/listings'
import Link from 'next/link'

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const where = searchParams.get('where') ?? ''
  const when = searchParams.get('when') ?? ''
  const teamSize = searchParams.get('teamSize') ?? ''
  const eventType = searchParams.get('eventType') ?? ''

  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([])
  const [showMap, setShowMap] = useState(false)

  const filtered = useMemo(() => {
    let results = listings

    // Filter by team size if provided
    if (teamSize) {
      const size = parseInt(teamSize, 10)
      if (!isNaN(size)) results = results.filter((l) => l.capacity >= size)
    }

    // Filter by event type if provided
    if (eventType) {
      results = results.filter((l) =>
        l.eventTypes.some((et) => et.toLowerCase().includes(eventType.toLowerCase()))
      )
    }

    // Filter by selected filter chips
    if (activeFilters.length > 0) {
      results = results.filter((l) =>
        activeFilters.every((f) => l.amenities.includes(f))
      )
    }

    // Always return at least 8 results (fallback to full list if over-filtered)
    return results.length >= 8 ? results : listings.slice(0, 8)
  }, [teamSize, eventType, activeFilters])

  const handleEditSearch = () => {
    router.push(
      `/team-events?where=${encodeURIComponent(where)}&when=${encodeURIComponent(when)}&teamSize=${encodeURIComponent(teamSize)}&eventType=${encodeURIComponent(eventType)}`
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Search recap bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#DDDDDD] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
          <CoachMark
            number={4}
            title="Editable search recap bar"
            description="Shows all entered params at a glance (location, dates, team size, event type). Click anywhere on the bar to go back and edit. Keeps planners oriented and removes back-button friction — critical for a multi-step search flow."
            side="bottom"
          />
          <button
            onClick={handleEditSearch}
            className="flex items-center gap-3 bg-white border border-[#DDDDDD] rounded-full px-4 py-2 hover:shadow-md transition-shadow text-left min-w-0"
            aria-label="Edit search"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#717171] shrink-0">
              <path d="M13 3a10 10 0 1 0 0 20A10 10 0 0 0 13 3zm-12 10a12 12 0 1 1 21.33 7.68l6.5 6.5-1.42 1.42-6.5-6.5A12 12 0 0 1 1 13z" />
            </svg>
            <div className="flex items-center gap-2 text-sm font-medium text-[#222222] truncate">
              <span>{where || 'Anywhere'}</span>
              {when && (
                <>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>{when}</span>
                </>
              )}
              {teamSize && (
                <>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>{teamSize} people</span>
                </>
              )}
              {eventType && (
                <>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>{eventType}</span>
                </>
              )}
            </div>
          </button>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 text-sm font-medium text-[#222222] px-4 py-2 rounded-full border border-[#DDDDDD] hover:bg-[#F7F7F7] transition-colors shrink-0"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#222222]">
              <path d="M20.586 23.414L16 18.828l-4.586 4.586L10 22l6-6 6 6zM11.414 8.586L16 13.172l4.586-4.586L22 10l-6 6-6-6z" />
            </svg>
            {showMap ? 'Hide map' : 'Show map'}
          </button>
        </div>

        {/* Filter chips */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 border-t border-[#DDDDDD]">
          <div className="flex items-center gap-3">
            <FilterChips active={activeFilters} onChange={setActiveFilters} />
            <CoachMark
              number={5}
              title="6 event-specific filter chips"
              description="Replace the standard Airbnb amenity sidebar with additive chips tuned for corporate planners: Meeting space, Catering kitchen, AV setup, Private parking, Flexible cancellation, Entire property. Each mirrors what a planner checks before booking an offsite."
              side="bottom"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Map placeholder */}
        {showMap && (
          <div className="mb-8 h-64 md:h-80 bg-[#F7F7F7] rounded-2xl flex items-center justify-center border border-[#DDDDDD]">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm font-medium text-[#717171] mt-2">Map view coming in Phase 2</p>
            </div>
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#222222]">
                {filtered.length} team event {filtered.length === 1 ? 'space' : 'spaces'}
                {where ? ` near ${where}` : ''}
              </h1>
              <CoachMark
                number={6}
                title="Capacity-tagged listing cards"
                description="Every card surfaces group capacity ('Up to 24 guests') as a top-left badge and shows the top 3 event-relevant amenities as chips below the price. Corporate planners can evaluate suitability at a glance without opening the listing."
                side="bottom"
              />
            </div>
            {activeFilters.length > 0 && (
              <p className="text-sm text-[#717171] mt-1">
                Filtered by: {activeFilters.join(', ')}
              </p>
            )}
          </div>
          <select
            className="text-sm font-medium text-[#222222] border border-[#DDDDDD] rounded-full px-4 py-2 bg-white cursor-pointer outline-none hover:border-[#222222] transition-colors"
            defaultValue="recommended"
            aria-label="Sort results"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="capacity">Capacity: High to low</option>
          </select>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} position={i} />
          ))}
        </div>

        {/* Book CTA note */}
        <div className="mt-12 p-6 bg-[#F7F7F7] rounded-2xl text-center">
          <p className="text-sm font-semibold text-[#222222]">Ready to book?</p>
          <p className="text-sm text-[#717171] mt-1 mb-4">
            Full checkout flow available in Phase 2. Contact the host directly to inquire.
          </p>
          <button
            className="text-sm font-semibold text-[#222222] border border-[#DDDDDD] px-5 py-2.5 rounded-full bg-white hover:border-[#222222] hover:shadow-sm transition-all"
            onClick={() => {
              // Analytics: team_events_booking_initiated
              // Payload: { listing_id, group_size: teamSize, nightly_rate }
              alert('Checkout coming in Phase 2. This is a prototype!')
            }}
          >
            Continue to checkout (prototype)
          </button>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/team-events"
            className="text-sm text-[#717171] hover:text-[#222222] underline transition-colors"
          >
            ← Back to Team events
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex flex-col">
          <div className="h-16 border-b border-[#DDDDDD] bg-white" />
          <div className="h-[72px] border-b border-[#DDDDDD] bg-white" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-xl bg-[#F7F7F7] mb-3" />
                  <div className="h-4 bg-[#F7F7F7] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#F7F7F7] rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
