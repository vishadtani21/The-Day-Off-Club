'use client'
import { motion } from 'framer-motion'

export default function WhatIsSection() {
  return (
    <section className="relative bg-white py-[60px] px-10 text-center overflow-hidden">
      {/* Repeating wavy lines & circles background pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] text-[#2b5f8f]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wavy-circles-pattern-1" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Wavy line 1 */}
            <path d="M10,25 Q25,12 40,25 T70,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
            
            {/* Concentric dashed circles */}
            <circle cx="90" cy="35" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="90" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Wavy line 2 */}
            <path d="M50,85 Q70,72 90,85 T130,85" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />

            {/* Concentric dashed circles 2 */}
            <circle cx="30" cy="85" r="18" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="30" cy="85" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
            
            {/* Floating tiny circles */}
            <circle cx="65" cy="55" r="1.5" fill="currentColor" />
            <circle cx="115" cy="105" r="2" fill="currentColor" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavy-circles-pattern-1)" />
      </svg>

      <motion.h2
        className="font-fraunces text-[3.2rem] font-bold text-blue leading-[1.1] mb-7"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        What is The Day Off Club?
      </motion.h2>
      <motion.div
        className="max-w-[640px] mx-auto text-left relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="font-fraunces text-[1.4rem] font-bold text-blue-dark leading-[1.4] mb-[18px]">
          Taking a break shouldn&apos;t mean doing nothing.
        </p>
        <p className="font-inter text-[0.97rem] text-[#3a5a80] leading-[1.75] mb-4">
          At Day Off Club, we design thoughtfully curated workshops and experiences that let you step away from
          routine—while still growing, connecting, and contributing to something meaningful.
        </p>
        <p className="font-inter text-[0.97rem] text-[#3a5a80] leading-[1.75]">
          Whether it&apos;s a fitness session, a creative workshop, or a social impact activity, every experience is built
          with intention.
        </p>
      </motion.div>
    </section>
  )
}
