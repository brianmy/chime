'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Variant = 'control' | 'a' | 'b'

interface VariantContextType {
  variant: Variant
  setVariant: (v: Variant) => void
  showCoachMarks: boolean
  setShowCoachMarks: (v: boolean) => void
}

const VariantContext = createContext<VariantContextType>({
  variant: 'control',
  setVariant: () => {},
  showCoachMarks: true,
  setShowCoachMarks: () => {},
})

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Variant>('control')
  const [showCoachMarks, setShowCoachMarks] = useState(true)
  return (
    <VariantContext.Provider value={{ variant, setVariant, showCoachMarks, setShowCoachMarks }}>
      {children}
    </VariantContext.Provider>
  )
}

export function useVariant() {
  return useContext(VariantContext)
}
