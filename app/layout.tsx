import type { Metadata } from 'next'
import './globals.css'
import { VariantProvider } from '@/components/VariantContext'
import VariantSwitcher from '@/components/VariantSwitcher'

export const metadata: Metadata = {
  title: 'Airbnb Team Events — Prototype',
  description:
    'MVP prototype: Variant A (dedicated nav tab) and Variant B (homepage editorial module) for corporate event planners.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <VariantProvider>
          <VariantSwitcher />
          {children}
        </VariantProvider>
      </body>
    </html>
  )
}
