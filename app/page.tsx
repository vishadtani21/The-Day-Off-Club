import type { Metadata } from 'next'
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

// ── Page-level metadata (overrides root layout defaults for this route) ──────
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.thedayoffclub.in',
  },
}

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Day Off Club',
  url: 'https://www.thedayoffclub.in',
  logo: 'https://www.thedayoffclub.in/logo.webp',
  description:
    'The Day Off Club curates intentional experiences — creative workshops, puppy yoga, pottery and community events in Nagpur that help you slow down, learn, connect, and give back.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'City',
    name: 'Nagpur',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/the.dayoffclub',
    'https://chat.whatsapp.com/E6EpNtevkj3HSSCc88NfUd',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi'],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Day Off Club',
  url: 'https://www.thedayoffclub.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.thedayoffclub.in/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}



const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the age limit for the workshop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no age limit for the workshops, everyone is welcome to join.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I collaborate with The Day Off Club?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Just drop us a dm! We're always excited to work with brands, venues, creators, instructors, and community partners who align with our vision.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are your workshops gender neutral?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! All of our workshops and experiences are open to everyone, regardless of gender. We believe in creating inclusive, welcoming spaces for all.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you organize private or corporate events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we design customized experiences for brands, teams, communities, and special occasions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can attend your events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anyone looking to try something new, meet like minded people, and be part of a welcoming community is welcome.',
      },
    },
  ],
}



export default function Home() {
  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
