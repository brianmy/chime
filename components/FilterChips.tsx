'use client'

import { FILTER_CHIPS, type FilterChip } from '@/data/listings'

interface Props {
  active: FilterChip[]
  onChange: (filters: FilterChip[]) => void
}

export default function FilterChips({ active, onChange }: Props) {
  const toggle = (chip: FilterChip) => {
    // Analytics: team_events_filter_applied
    // Payload: { filter_name: chip, was_search_submitted_after: true }
    if (active.includes(chip)) {
      onChange(active.filter((c) => c !== chip))
    } else {
      onChange([...active, chip])
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTER_CHIPS.map((chip) => {
        const isActive = active.includes(chip)
        return (
          <button
            key={chip}
            onClick={() => toggle(chip)}
            aria-pressed={isActive}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
              isActive
                ? 'bg-[#222222] text-white border-[#222222]'
                : 'bg-white text-[#222222] border-[#DDDDDD] hover:border-[#222222]'
            }`}
          >
            {chip}
          </button>
        )
      })}
      {active.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="text-sm text-[#717171] underline ml-1 hover:text-[#222222] transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
