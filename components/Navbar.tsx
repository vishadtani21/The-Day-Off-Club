'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: 'Workshops' },
    { href: '#gallery',  label: 'Gallery' },
    { href: '#events',   label: 'Upcoming Events' },
    { href: '#faq',      label: 'FAQ' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] flex items-center justify-between px-10 py-3 bg-blue-hero transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_4px_20px_rgba(43,95,143,0.15)]'
            : 'shadow-[0_2px_12px_rgba(43,95,143,0.08)]'
        }`}
      >
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            alt="The Day Off Club"
            width={160}
            height={52}
            sizes="160px"
            className="h-[52px] w-auto object-contain"
            priority
          />
        </div>

        <nav className="hidden md:flex gap-8">
          {links.map(l => (
            <a
              key={l.href} href={l.href}
              className="font-raleway font-bold text-xs tracking-[1.5px] uppercase text-blue hover:text-blue-dark transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://chat.whatsapp.com/E6EpNtevkj3HSSCc88NfUd"
          target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-block bg-blue text-white px-[22px] py-[9px] rounded-full font-raleway font-bold text-xs tracking-[1.5px] uppercase hover:bg-blue-dark hover:-translate-y-0.5 transition-all"
        >
          Join WhatsApp Community
        </a>

        <button
          className="md:hidden text-2xl text-blue"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed top-[60px] left-0 right-0 z-[999] flex flex-col gap-4 px-8 py-5 bg-blue-hero shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          >
            {links.map(l => (
              <a
                key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-bold text-base text-blue tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://chat.whatsapp.com/E6EpNtevkj3HSSCc88NfUd"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="bg-blue text-white px-5 py-[10px] rounded-full text-center font-bold"
            >
              Join WhatsApp Community
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
