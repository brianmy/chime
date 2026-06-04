'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  initialValues?: {
    where?: string
    when?: string
    teamSize?: string
    eventType?: string
  }
  compact?: boolean
}

export default function SearchBar({ initialValues = {}, compact = false }: Props) {
  const router = useRouter()
  const [where, setWhere] = useState(initialValues.where ?? '')
  const [when, setWhen] = useState(initialValues.when ?? '')
  const [teamSize, setTeamSize] = useState(initialValues.teamSize ?? '')
  const [eventType, setEventType] = useState(initialValues.eventType ?? '')

  const handleSearch = () => {
    // Analytics: team_events_search_start
    // Payload: { team_size: teamSize, event_type: eventType, location: where, date_range: when }
    const params = new URLSearchParams()
    if (where) params.set('where', where)
    if (when) params.set('when', when)
    if (teamSize) params.set('teamSize', teamSize)
    if (eventType) params.set('eventType', eventType)
    router.push(`/team-events/search?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-white border border-[#DDDDDD] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-sm text-[#717171]">{where || 'Where'}</span>
        <span className="w-px h-4 bg-[#DDDDDD]" />
        <span className="text-sm text-[#717171]">{when || 'When'}</span>
        <span className="w-px h-4 bg-[#DDDDDD]" />
        <span className="text-sm text-[#717171]">{teamSize ? `${teamSize} people` : 'Team size'}</span>
        <button
          onClick={handleSearch}
          className="ml-2 bg-[#E31C5F] text-white rounded-full p-2 hover:bg-[#c41854] transition-colors"
          aria-label="Search"
        >
          <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-white">
            <path d="M13 3a10 10 0 1 0 0 20A10 10 0 0 0 13 3zm-12 10a12 12 0 1 1 21.33 7.68l6.5 6.5-1.42 1.42-6.5-6.5A12 12 0 0 1 1 13z" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-[#DDDDDD] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#DDDDDD]">
        {/* Where */}
        <div className="px-5 py-4">
          <label className="block text-xs font-semibold text-[#222222] mb-1" htmlFor="search-where">
            Where
          </label>
          <input
            id="search-where"
            type="text"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search destinations"
            className="w-full text-sm text-[#222222] placeholder-[#AAAAAA] outline-none bg-transparent"
          />
        </div>

        {/* When */}
        <div className="px-5 py-4">
          <label className="block text-xs font-semibold text-[#222222] mb-1" htmlFor="search-when">
            When
          </label>
          <input
            id="search-when"
            type="text"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add dates"
            className="w-full text-sm text-[#222222] placeholder-[#AAAAAA] outline-none bg-transparent"
          />
        </div>

        {/* Team size */}
        <div className="px-5 py-4">
          <label className="block text-xs font-semibold text-[#222222] mb-1" htmlFor="search-teamsize">
            Team size
          </label>
          <input
            id="search-teamsize"
            type="number"
            min={8}
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How many people?"
            className="w-full text-sm text-[#222222] placeholder-[#AAAAAA] outline-none bg-transparent"
          />
        </div>

        {/* Event type + search button */}
        <div className="px-5 py-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-[#222222] mb-1" htmlFor="search-eventtype">
              Event type
            </label>
            <select
              id="search-eventtype"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full text-sm text-[#222222] outline-none bg-transparent appearance-none cursor-pointer"
            >
              <option value="">Any event</option>
              <option value="Offsite retreat">Offsite retreat</option>
              <option value="Workshop">Workshop</option>
              <option value="Strategy session">Strategy session</option>
              <option value="Team celebration">Team celebration</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-[#E31C5F] hover:bg-[#c41854] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shrink-0"
            aria-label="Search for team event spaces"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white">
              <path d="M13 3a10 10 0 1 0 0 20A10 10 0 0 0 13 3zm-12 10a12 12 0 1 1 21.33 7.68l6.5 6.5-1.42 1.42-6.5-6.5A12 12 0 0 1 1 13z" />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
