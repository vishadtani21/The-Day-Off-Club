'use client'
import { motion } from 'framer-motion'

export default function InstagramCTA({ onMailOpen }: { onMailOpen: () => void }) {
  return (
    <>
      <section
        className="relative py-20 px-10 text-center overflow-hidden"
        style={{ backgroundImage: "url('/bg2.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-[rgba(26,63,107,0.55)] pointer-events-none" />
        <div className="relative z-10">
          <motion.h2
            className="font-fraunces text-[3rem] font-bold text-white mb-[14px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Check Out Our Instagram
          </motion.h2>
          <motion.p
            className="text-base text-blue-light mb-7 max-w-[480px] mx-auto leading-[1.6]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Follow us on Instagram for updates, behind-the-scenes moments, and all things Day Off Club.
          </motion.p>
          <motion.a
            href="https://instagram.com/the.dayoffclub"
            target="_blank"
            rel="noopener"
            className="inline-block bg-blue-light text-blue-dark px-9 py-[14px] rounded-full font-inter font-bold text-[0.9rem] tracking-[1.5px] uppercase hover:bg-white hover:-translate-y-0.5 transition-all"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            @the.dayoffclub
          </motion.a>
          <p className="mt-6 mb-0 text-[0.88rem] text-white/75">
            Have a question?{' '}
            <button onClick={onMailOpen} className="text-white underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer">
              Drop us a mail
            </button>
          </p>
        </div>
      </section>

      {/* Wave divider */}
      <div className="leading-none bg-transparent relative z-10 w-full h-[60px] mt-[-60px] pointer-events-none">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-full">
          <path d="M0,30 C150,55 350,5 600,30 C850,55 1050,5 1200,30 L1200,60 L0,60 Z" fill="#1a3f6b" />
        </svg>
      </div>
    </>
  )
}
