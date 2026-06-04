'use client'

import Nav from '@/components/Nav'
import EditorialModule from '@/components/EditorialModule'
import ListingCard from '@/components/ListingCard'
import CoachMark from '@/components/CoachMark'
import { useVariant } from '@/components/VariantContext'
import { listings } from '@/data/listings'

const TRENDING = ['Cabins', 'Beachfront', 'Lakefront', 'Tiny homes', 'Farms', 'Amazing views']

const CATEGORY_ICONS: Record<string, string> = {
  Cabins: '🌲',
  Beachfront: '🏖️',
  Lakefront: '🏞️',
  'Tiny homes': '🏠',
  Farms: '🌾',
  'Amazing views': '🌄',
}

export default function HomePage() {
  const { variant } = useVariant()
  const featuredListings = listings.slice(0, 8)

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero search */}
        <section className="py-8 md:py-10">
          <div className="bg-white border border-[#DDDDDD] rounded-full shadow-md px-4 md:px-6 py-3 flex items-center gap-3 max-w-2xl mx-auto hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex-1 text-sm text-[#222222] font-medium">
              Where are you going?
            </div>
            <div className="hidden md:block w-px h-6 bg-[#DDDDDD]" />
            <div className="hidden md:block text-sm text-[#717171] px-3">Add dates</div>
            <div className="hidden md:block w-px h-6 bg-[#DDDDDD]" />
            <div className="hidden md:block text-sm text-[#717171] px-3">Add guests</div>
            <button
              className="bg-[#E31C5F] text-white rounded-full p-2.5 hover:bg-[#c41854] transition-colors shrink-0"
              aria-label="Search"
            >
              <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white">
                <path d="M13 3a10 10 0 1 0 0 20A10 10 0 0 0 13 3zm-12 10a12 12 0 1 1 21.33 7.68l6.5 6.5-1.42 1.42-6.5-6.5A12 12 0 0 1 1 13z" />
              </svg>
            </button>
          </div>
        </section>

        {/* Trending categories */}
        <section className="pb-6 border-b border-[#DDDDDD]">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {TRENDING.map((cat) => (
              <button
                key={cat}
                className="flex flex-col items-center gap-1.5 text-[#717171] hover:text-[#222222] transition-colors shrink-0 pb-2 border-b-2 border-transparent hover:border-[#717171]"
              >
                <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                <span className="text-xs font-medium whitespace-nowrap">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Variant B — Editorial module */}
        {variant === 'b' && (
          <div>
            <EditorialModule />
          </div>
        )}

        {/* Standard listings grid */}
        <section className="py-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold text-[#222222]">Stays near you</h2>
            <CoachMark
              number={1}
              title="Control — unmodified experience"
              description="No Team Events entry point exists. Corporate planners land here alongside leisure travelers and must use the standard search bar with no group-specific fields, no event-type filtering, and no dedicated listing surface."
              side="bottom"
              forVariant="control"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredListings.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} position={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
