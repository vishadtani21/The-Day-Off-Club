'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WhatIsSection from '@/components/WhatIsSection'
import Workshops from '@/components/Workshops'
import WhatYouGet from '@/components/WhatYouGet'
import PhotoTicker from '@/components/PhotoTicker'
import Founders from '@/components/Founders'
import Events from '@/components/Events'
import FAQ from '@/components/FAQ'
import InstagramCTA from '@/components/InstagramCTA'
import Footer from '@/components/Footer'
import MailModal from '@/components/MailModal'
import PressWidget from '@/components/PressWidget'
import EnvelopeQuote from '@/components/EnvelopeQuote'
import SocialSidebar from '@/components/SocialSidebar'

export default function Home() {
  const [mailOpen, setMailOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <WhatIsSection />
        <SocialSidebar onMailOpen={() => setMailOpen(true)} />
        <Workshops />
        <WhatYouGet />
        <PhotoTicker />
        <Founders />
        <Events />
        <FAQ />
        <InstagramCTA onMailOpen={() => setMailOpen(true)} />
      </main>
      <Footer />

      {/* Floating widgets */}
      <PressWidget />
      <EnvelopeQuote />

      {/* Mail modal */}
      <MailModal open={mailOpen} onClose={() => setMailOpen(false)} />
    </>
  )
}
