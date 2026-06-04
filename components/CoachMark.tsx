'use client'

import { useState } from 'react'
import { useVariant } from './VariantContext'

interface Props {
  number: number
  title: string
  description: string
  /** Which direction the tooltip card opens from the badge */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Only render when this variant is active. Omit to always render. */
  forVariant?: 'a' | 'b' | 'control'
  className?: string
}

const SIDE_CLASSES: Record<NonNullable<Props['side']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export default function CoachMark({
  number,
  title,
  description,
  side = 'bottom',
  forVariant,
  className = '',
}: Props) {
  const { showCoachMarks, variant } = useVariant()
  const [open, setOpen] = useState(false)

  if (forVariant && variant !== forVariant) return null
  if (variant === 'control' && forVariant !== 'control') return null
  if (!showCoachMarks) return null

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Badge */}
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold cursor-default select-none ring-2 ring-white shadow-md"
        tabIndex={0}
        role="button"
        aria-label={`Annotation ${number}: ${title}`}
      >
        {number}
      </span>

      {/* Tooltip card */}
      {open && (
        <span
          className={`absolute z-50 w-60 bg-[#1e1b4b] text-white rounded-xl p-3 shadow-2xl pointer-events-none ${SIDE_CLASSES[side]}`}
          role="tooltip"
        >
          {/* Arrow */}
          <span
            className={`absolute w-2 h-2 bg-[#1e1b4b] rotate-45 ${
              side === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' :
              side === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' :
              side === 'right' ? 'top-1/2 -translate-y-1/2 -left-1' :
              'top-1/2 -translate-y-1/2 -right-1'
            }`}
          />
          <span className="block text-xs font-bold text-indigo-300 mb-1">
            ● Annotation {number}
          </span>
          <span className="block text-sm font-semibold leading-snug mb-1">{title}</span>
          <span className="block text-xs text-indigo-200 leading-relaxed">{description}</span>
        </span>
      )}
    </span>
  )
}
