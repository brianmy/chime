'use client'

import { useState, useMemo } from 'react'
import Nav from '@/components/Nav'
import SearchBar from '@/components/SearchBar'
import EventTypeCard from '@/components/EventTypeCard'
import ListingCard from '@/components/ListingCard'
import CoachMark from '@/components/CoachMark'
import { EVENT_TYPES, listings } from '@/data/listings'

export default function TeamEventsPage() {
  const [selectedEventType, setSelectedEventType] = useState('')

  const featuredListings = useMemo(() => {
    if (!selectedEventType) return listings.slice(0, 9)
    const filtered = listings.filter((l) => l.eventTypes.includes(selectedEventType))
    return filtered.length >= 3 ? filtered : listings.slice(0, 9)
  }, [selectedEventType])

  const handleEventTypeSelect = (label: string) => {
    setSelectedEventType(label === selectedEventType ? '' : label)
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#fff0f5] to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#222222] leading-tight">
              Plan your next team event
            </h1>
            <p className="text-[#717171] mt-3 text-base md:text-lg">
              Offsites, workshops, strategy sessions, and celebrations — all in one place.
            </p>
          </div>

          {/* Extended search bar */}
          <div className="relative">
            <SearchBar initialValues={{ eventType: selectedEventType }} />
            <div className="absolute -top-3 -right-3 flex gap-2">
              <CoachMark
                number={2}
                title="Team-specific search fields"
                description="Two new fields added: Team size (numeric, signals group intent) and Event type (dropdown pre-filters results). Corporate planners can express full intent before seeing a single listing."
                side="bottom"
                forVariant="a"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {/* Event type cards */}
        <section className="py-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-[#222222]">What kind of event are you planning?</h2>
            <CoachMark
              number={3}
              title="Event type self-selection cards"
              description="Four archetypal corporate event types rather than an open text field. Clicking a card pre-populates the Event type field in the search bar above. Helps planners self-identify and improves search relevance — signals Airbnb 'gets' corporate events."
              side="bottom"
              forVariant="a"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EVENT_TYPES.map((et) => (
              <EventTypeCard
                key={et.label}
                icon={et.icon}
                label={et.label}
                duration={et.duration}
                selected={selectedEventType === et.label}
                onClick={() => handleEventTypeSelect(et.label)}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[#DDDDDD] my-2" />

        {/* Featured listings */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#222222]">
                {selectedEventType
                  ? `Top spaces for ${selectedEventType.toLowerCase()}`
                  : 'Featured event spaces'}
              </h2>
              <CoachMark
                number={4}
                title="Group capacity badge on every card"
                description="Each listing card surfaces max guest count as a badge (e.g. 'Up to 24 guests') and shows event-relevant amenities like meeting space, catering kitchen, and AV setup — replacing generic amenity icons with corporate-relevant signals."
                side="bottom"
                forVariant="a"
              />
            </div>
            <span className="text-sm text-[#717171]">
              {featuredListings.length} {selectedEventType ? 'matching' : 'featured'} spaces
            </span>
          </div>
          <div
            key={selectedEventType}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredListings.map((listing, i) => (
              <div
                key={listing.id}
                className="listing-card-enter"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ListingCard listing={listing} position={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <section className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-[#DDDDDD]">
          {[
            {
              icon: '🏠',
              title: '8,000+ event-capable properties',
              body: 'From intimate workshop spaces to sprawling estates for 50+.',
            },
            {
              icon: '✓',
              title: 'Verified group amenities',
              body: 'Meeting rooms, AV setup, catering kitchens — confirmed by hosts.',
            },
            {
              icon: '💬',
              title: 'Dedicated event support',
              body: 'Questions about your booking? Our team is available 24/7.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#222222]">{item.title}</p>
                <p className="text-sm text-[#717171] mt-1">{item.body}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
