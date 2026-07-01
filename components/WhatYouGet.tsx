'use client'
import { motion } from 'framer-motion'

const cards = [
  { title: 'Intentional Breaks', desc: 'Step away without feeling unproductive' },
  { title: 'Real Connections', desc: 'Meet like-minded people, not just crowds' },
  { title: 'Meaningful Experiences', desc: 'Every event has purpose behind it' },
  { title: 'Give Back', desc: 'Be part of something bigger than yourself' },
]

export default function WhatYouGet() {
  return (
    <section className="relative bg-white py-10 sm:py-20 px-4 sm:px-10 text-center overflow-hidden">
      {/* Repeating wavy lines & circles background pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] text-[#2b5f8f]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wavy-circles-pattern-2" width="120" height="120" patternUnits="userSpaceOnUse">
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
        <rect width="100%" height="100%" fill="url(#wavy-circles-pattern-2)" />
      </svg>

      <motion.h2
        className="font-fraunces text-[2.2rem] sm:text-[3.2rem] font-bold text-blue mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What You Get?
      </motion.h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1040px] mx-auto relative z-10">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center justify-center text-center p-5 aspect-square rounded-full border border-[rgba(144,190,245,0.4)] bg-[#f4f8fd]/50 hover:bg-[#eef4fb]/80 hover:shadow-[0_8px_24px_rgba(43,95,143,0.06)] hover:-translate-y-1.5 transition-all duration-300"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <h3 className="font-fraunces text-[0.9rem] sm:text-[1.1rem] font-bold text-blue-dark mb-[6px] sm:mb-[10px] leading-[1.3]">{c.title}</h3>
            <p className="font-inter text-[0.74rem] sm:text-[0.88rem] text-[#3a5a80] leading-[1.5] max-w-[140px] sm:max-w-none">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
