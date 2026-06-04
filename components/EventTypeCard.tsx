'use client'

interface Props {
  icon: string
  label: string
  duration: string
  selected?: boolean
  onClick: () => void
}

export default function EventTypeCard({ icon, label, duration, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left w-full transition-all hover:shadow-md ${
        selected
          ? 'border-[#E31C5F] bg-[#fff0f5]'
          : 'border-[#DDDDDD] bg-white hover:border-[#222222]'
      }`}
      aria-pressed={selected}
    >
      <span className="text-2xl" role="img" aria-label={label}>
        {icon}
      </span>
      <div>
        <p className={`text-sm font-semibold ${selected ? 'text-[#E31C5F]' : 'text-[#222222]'}`}>
          {label}
        </p>
        <p className="text-xs text-[#717171] mt-0.5">{duration}</p>
      </div>
    </button>
  )
}
