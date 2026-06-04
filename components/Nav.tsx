'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useVariant } from './VariantContext'
import CoachMark from './CoachMark'

export default function Nav() {
  const { variant } = useVariant()
  const pathname = usePathname()
  const isTeamEvents = pathname?.startsWith('/team-events')

  const handleNavClick = () => {
    // Analytics: team_events_nav_click
    // Payload: { variant: 'a', user_id, session_id, timestamp, previous_page: pathname }
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <svg viewBox="0 0 32 32" className="h-8 w-8 fill-[#E31C5F]" aria-hidden="true">
            <path d="M16 1C7.716 1 1 7.716 1 16s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 2c7.18 0 13 5.82 13 13S23.18 29 16 29 3 23.18 3 16 8.82 3 16 3zm-.002 5.998c-1.84 0-3.332 1.492-3.332 3.332S14.158 15.66 16 15.66s3.334-1.492 3.334-3.332-1.494-3.33-3.336-3.33zm0 1.666c.92 0 1.668.748 1.668 1.666s-.748 1.666-1.668 1.666-1.666-.748-1.666-1.666.746-1.666 1.666-1.666zm-6.232 5.67c-.394.012-.778.18-1.06.478-1.07 1.122-1.57 2.47-1.53 3.858.04 1.4.618 2.832 1.816 3.932 1.198 1.1 2.96 1.832 5.408 1.832h3.2c2.448 0 4.21-.732 5.408-1.832 1.198-1.1 1.776-2.532 1.816-3.932.04-1.388-.46-2.736-1.53-3.858a1.596 1.596 0 0 0-1.118-.478 1.6 1.6 0 0 0-1.12.478c-.9.944-2.11 1.39-4.456 1.39s-3.554-.446-4.456-1.39a1.598 1.598 0 0 0-1.378-.478zm.06 1.668c.05 0 .102.018.146.056 1.148 1.204 2.726 1.808 5.628 1.808s4.48-.604 5.628-1.808a.044.044 0 0 1 .06 0c.726.762 1.072 1.742 1.042 2.762-.03 1.006-.472 2.07-1.38 2.906-.908.836-2.348 1.392-4.55 1.392h-3.2c-2.202 0-3.642-.556-4.55-1.392-.908-.836-1.35-1.9-1.38-2.906-.03-1.02.316-2 1.042-2.762a.044.044 0 0 1 .014-.056z" />
          </svg>
          <span className="text-[#E31C5F] font-bold text-xl hidden md:block" style={{ fontStyle: 'italic' }}>
            airbnb
          </span>
        </Link>

        {/* Nav tabs */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              !isTeamEvents
                ? 'text-[#222222] bg-[#F7F7F7]'
                : 'text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7]'
            }`}
          >
            Places to stay
          </Link>
          <Link
            href="/"
            className="text-sm font-medium px-4 py-2 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] transition-colors"
          >
            Experiences
          </Link>
          {variant === 'a' && (
            <span className="relative flex items-center gap-1.5">
              <Link
                href="/team-events"
                onClick={handleNavClick}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  isTeamEvents
                    ? 'text-[#E31C5F] bg-[#fff0f5]'
                    : 'text-[#E31C5F] hover:bg-[#fff0f5]'
                }`}
              >
                Team events
              </Link>
              <CoachMark
                number={1}
                title="New first-class nav category"
                description="Equal weight to 'Places to stay' and 'Experiences'. Signals this is a product category, not a filter. Always visible — highest brand signal."
                side="bottom"
                forVariant="a"
              />
            </span>
          )}
        </div>

        {/* User menu */}
        <div className="flex items-center gap-2">
          <button className="hidden md:block text-sm font-medium text-[#222222] px-3 py-2 rounded-full hover:bg-[#F7F7F7] transition-colors">
            Become a Host
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#DDDDDD] hover:shadow-md transition-shadow bg-white">
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#222222]">
              <path d="M2 7h28v2H2zm0 8h28v2H2zm0 8h28v2H2z" />
            </svg>
            <div className="w-7 h-7 bg-[#717171] rounded-full flex items-center justify-center text-white text-xs font-medium">
              U
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
