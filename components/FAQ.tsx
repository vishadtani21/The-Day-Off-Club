'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'What is the age limit for the workshop?', a: 'There is no age limit for the workshops, everyone is welcome to join.' },
  { q: 'How can I collaborate with The Day Off Club?', a: "Just drop us a dm! We're always excited to work with brands, venues, creators, instructors, and community partners who align with our vision." },
  { q: 'Are your workshops gender neutral?', a: 'Absolutely! All of our workshops and experiences are open to everyone, regardless of gender. We believe in creating inclusive, welcoming spaces for all.' },
  { q: 'Do you organize private or corporate events?', a: 'Yes, we design customized experiences for brands, teams, communities, and special occasions.' },
  { q: 'Who can attend your events?', a: 'Anyone looking to try something new, meet like minded people, and be part of a welcoming community is welcome.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-blue-hero py-[70px] px-10 max-w-[860px] mx-auto my-10 rounded-[28px] text-center">
      <motion.h2
        className="font-fraunces text-[3.2rem] font-bold text-blue-DEFAULT mb-9"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        FAQs
      </motion.h2>
      <div className="flex flex-col gap-[14px] text-left">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(43,95,143,0.08)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <button
              className="w-full bg-transparent border-none px-[22px] py-[18px] font-inter font-bold text-[0.95rem] text-blue-dark flex justify-between items-center hover:bg-blue-light transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-mid text-lg"
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-[22px] pb-[18px] text-[0.88rem] text-[#2e5a8a] leading-[1.6]">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
