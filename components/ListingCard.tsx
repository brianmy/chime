'use client'

import Image from 'next/image'
import type { Listing } from '@/data/listings'

interface Props {
  listing: Listing
  position?: number
}

const AMENITY_ICONS: Record<string, string> = {
  'Meeting space': '🪑',
  'Catering kitchen': '🍽️',
  'AV setup': '📽️',
  'Private parking': '🚗',
  'Flexible cancellation': '✓',
  'Entire property': '🏠',
}

export default function ListingCard({ listing, position = 0 }: Props) {
  const handleClick = () => {
    // Analytics: team_events_listing_view
    // Payload: { listing_id: listing.id, position_in_results: position, filters_applied: [] }
  }

  const topAmenities = listing.amenities.slice(0, 3)

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
      role="article"
      aria-label={listing.name}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F7F7F7] mb-3">
        <Image
          src={`https://picsum.photos/seed/${listing.id}/800/600`}
          alt={listing.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Capacity badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#222222] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          Up to {listing.capacity} guests
        </div>
        {/* Save button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          aria-label="Save listing"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 32 32" className="h-4 w-4 fill-none stroke-[#222222] stroke-2">
            <path d="M16 28s-14-9.16-14-17a8 8 0 0 1 14-5.33A8 8 0 0 1 30 11c0 7.84-14 17-14 17z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#222222] leading-tight line-clamp-1">
            {listing.name}
          </h3>
          <span className="flex items-center gap-0.5 text-xs text-[#222222] shrink-0">
            <svg viewBox="0 0 32 32" className="h-3 w-3 fill-[#222222]">
              <path d="M15.094 1.58l-4.124 8.345-9.21 1.338 6.666 6.495-1.573 9.168L15.094 22.24l8.24 4.687-1.573-9.168 6.666-6.495-9.21-1.338z" />
            </svg>
            {listing.rating}
          </span>
        </div>
        <p className="text-xs text-[#717171]">{listing.location}</p>
        <p className="text-xs text-[#717171]">{listing.beds} beds</p>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1 pt-1">
          {topAmenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 text-xs text-[#717171] bg-[#F7F7F7] px-2 py-0.5 rounded-full"
            >
              <span className="text-[10px]">{AMENITY_ICONS[a]}</span>
              {a}
            </span>
          ))}
        </div>

        <p className="text-sm pt-0.5">
          <span className="font-semibold text-[#222222]">${listing.price.toLocaleString()}</span>
          <span className="text-[#717171]"> / night</span>
        </p>
      </div>
    </div>
  )
}
