import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WhatIsSection from '@/components/WhatIsSection'
import Workshops from '@/components/Workshops'
import WhatYouGet from '@/components/WhatYouGet'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'
import LazyViewportSection from '@/components/LazyViewportSection'
import ClientWidgets from '@/components/ClientWidgets'

// Dynamically import below-the-fold components
const PhotoTicker = dynamic(() => import('@/components/PhotoTicker'))
const Founders = dynamic(() => import('@/components/Founders'))
const Events = dynamic(() => import('@/components/Events'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const InstagramCTA = dynamic(() => import('@/components/InstagramCTA'))

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <WhatIsSection />
        <SocialSidebar />
        <Workshops />
        <WhatYouGet />
        
        {/* Gallery Section */}
        <LazyViewportSection placeholderHeight="240px">
          <PhotoTicker />
        </LazyViewportSection>

        {/* Founders Profiles */}
        <LazyViewportSection placeholderHeight="400px">
          <Founders />
        </LazyViewportSection>

        {/* Supabase Dynamic Events */}
        <LazyViewportSection placeholderHeight="350px">
          <Events />
        </LazyViewportSection>

        {/* Collapsible FAQ */}
        <LazyViewportSection placeholderHeight="300px">
          <FAQ />
        </LazyViewportSection>

        {/* Instagram Call-to-Action */}
        <LazyViewportSection placeholderHeight="250px">
          <InstagramCTA />
        </LazyViewportSection>
      </main>
      
      <Footer />

      {/* Client-only floating widgets & modal controllers */}
      <ClientWidgets />
    </>
  )
}

