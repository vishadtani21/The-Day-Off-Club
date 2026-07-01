'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { text: "you don't have to earn rest.", from: 'a gentle reminder' },
  { text: 'maybe this is your softer era.', from: 'the universe' },
  { text: 'not every day needs to be productive.', from: 'your nervous system' },
  { text: "rest is not a reward. it's a right.", from: 'day off club' },
  { text: 'slowness is a form of wisdom.', from: 'an old soul' },
  { text: 'you are allowed to just be.', from: 'a quiet afternoon' },
  { text: "your worth isn't measured in output.", from: 'someone who means it' },
  { text: 'doing nothing is also doing something.', from: 'a nap enthusiast' },
  { text: 'this is your sign to slow down.', from: 'the universe, again' },
  { text: 'breathe first. everything else can wait.', from: 'a warm cup of tea' },
  { text: 'joy is also productivity.', from: 'day off club' },
  { text: "you've been carrying a lot. put it down for a bit.", from: 'someone who sees you' },
]

export default function EnvelopeQuote() {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [key, setKey] = useState(0)

  function next() {
    setIdx(i => (i + 1) % QUOTES.length)
    setKey(k => k + 1)
  }

  const q = QUOTES[idx]

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-[320px] bg-[#fffef9] rounded-[18px] px-[26px] py-7 relative"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,.18), 0 0 0 1px rgba(200,223,249,.4)' }}
            initial={{ opacity: 0, y: 18, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.93 }}
            transition={{ duration: 0.35, ease: [0.22, 0.68, 0, 1.2] }}
          >
            {/* Top fold line */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[18px]" style={{ background: 'linear-gradient(90deg,#c8dff9,#90bef5,#c8dff9)' }} />

            <button onClick={() => setOpen(false)} className="absolute top-3 right-[14px] bg-transparent border-none text-[1.1rem] text-blue-light hover:text-blue-DEFAULT hover:rotate-90 transition-all cursor-pointer leading-none">✕</button>

            <p className="font-raleway text-[0.62rem] font-bold tracking-[3px] uppercase text-blue-mid mb-4">✍ a note for you</p>

            <AnimatePresence mode="wait">
              <motion.p
                key={key}
                className="font-fraunces text-[1.25rem] italic font-normal text-blue-dark leading-[1.55] mb-4 min-h-[58px]"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                &ldquo;{q.text}&rdquo;
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`from-${key}`}
                className="font-inter text-[0.75rem] text-blue-mid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                — {q.from}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-5 pt-[14px] border-t border-[#e8f2fb]">
              <button onClick={next} className="font-inter text-[0.72rem] font-bold tracking-[0.8px] uppercase text-blue-DEFAULT bg-transparent border-none cursor-pointer p-0 hover:opacity-60 transition-opacity">
                another note →
              </button>
              <span className="text-base text-blue-light">♡</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        className="w-[52px] h-[52px] rounded-full border-none flex items-center justify-center relative animate-envBob hover:scale-110 cursor-pointer"
        style={{ background: 'linear-gradient(135deg,#2b5f8f,#1a3f6b)', boxShadow: '0 6px 24px rgba(26,63,107,0.45)' }}
        aria-label="Open a note for you"
      >
        {!open && (
          <span className="absolute top-1.5 right-1.5 w-[9px] h-[9px] rounded-full bg-yellow-300 border-2 border-blue-dark animate-envPulse" />
        )}
        <Image src="/envelope.jpg" alt="notes" width={42} height={42} className="w-[42px] h-[42px] object-cover rounded-full" />
      </motion.button>
    </div>
  )
}
