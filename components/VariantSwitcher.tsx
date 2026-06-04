'use client'

import { useEffect, useState } from 'react'
import { useVariant, type Variant } from './VariantContext'

const VARIANTS: { id: Variant; label: string }[] = [
  { id: 'control', label: 'Control' },
  { id: 'a', label: 'Variant A — Nav Tab' },
  { id: 'b', label: 'Variant B — Editorial' },
]

function WelcomeTip({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-[45] flex items-start justify-center pt-[18vh] backdrop-blur-sm bg-black/30"
      onClick={onDismiss}
    >
      <div
        className="bg-white text-[#222222] rounded-2xl shadow-2xl p-6 w-80 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-semibold mb-2">How to use this demo</p>
        <p className="text-[#717171] text-xs leading-relaxed">
          Pick a variant above to switch views, then hover the numbered badges to read the design rationale behind each decision.
        </p>
        <button
          onClick={onDismiss}
          className="mt-4 text-xs font-medium text-[#E31C5F] hover:underline"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default function VariantSwitcher() {
  const { variant, setVariant, showCoachMarks, setShowCoachMarks } = useVariant()
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('demo-tip-seen')) {
      setShowTip(true)
    }
  }, [])

  const dismissTip = () => {
    sessionStorage.setItem('demo-tip-seen', '1')
    setShowTip(false)
  }

  return (
    <>
      {showTip && <WelcomeTip onDismiss={dismissTip} />}
      <div className="relative z-50 bg-[#1a1a1a] text-white py-2 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-sm">
        <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">
          Experiment Demo
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-xs mr-1">Viewing:</span>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => { setVariant(v.id); setShowCoachMarks(true) }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                variant === v.id
                  ? 'bg-[#E31C5F] text-white'
                  : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-400 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
          <span className="w-px h-4 bg-gray-700 mx-1" />
          <button
            onClick={() => setShowCoachMarks(!showCoachMarks)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              showCoachMarks
                ? 'bg-indigo-600 text-white'
                : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-400 hover:text-white'
            }`}
          >
            <span>●</span>
            {showCoachMarks ? 'Hide annotations' : 'Show annotations'}
          </button>
        </div>
      </div>
    </>
  )
}
