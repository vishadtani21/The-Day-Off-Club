'use client'
import dynamic from 'next/dynamic'

// Client-only components that require browser APIs or have random client-side state.
// Dynamically imported with ssr: false to skip server rendering entirely.
const PressWidget = dynamic(() => import('./PressWidget'), { ssr: false })
const EnvelopeQuote = dynamic(() => import('./EnvelopeQuote'), { ssr: false })
const MailModalController = dynamic(() => import('./MailModalController'), { ssr: false })

export default function ClientWidgets() {
  return (
    <>
      <PressWidget />
      <EnvelopeQuote />
      <MailModalController />
    </>
  )
}
