'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative bg-blue-hero pt-[110px] md:pt-[80px] pb-10 md:pb-0 overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px),
            linear-gradient(rgba(43,95,143,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,95,143,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: 'center center',
        }}
      />
      {/* Top-right glow */}
      <div className="absolute -top-20 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(144,190,245,0.32) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-[60px] px-6 md:px-10">
        {/* Text */}
        <motion.div
          className="flex-1 text-left mt-0 md:-mt-36"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}
        >
          <img src="/logo.png" alt="The Day Off Club" className="mb-[10px] w-[140px] sm:w-[160px] h-auto object-contain" />
          <p className="font-raleway font-bold text-xs tracking-[3.5px] uppercase text-blue-mid mb-5">
            The Day Off Club
          </p>
          <p className="font-fraunces text-[1.6rem] sm:text-[2.1rem] leading-[1.4] text-blue-dark mb-3">
            We curate intentional experiences that help you slow down, learn, connect, and give back —
          </p>
          <p className="font-fraunces text-[1.3rem] sm:text-[1.7rem] italic font-light leading-[1.4] text-blue-mid">
            so your break feels productive, not guilty.
          </p>
          <p className="font-fraunces text-[0.95rem] sm:text-[1.1rem] font-bold text-blue-dark mt-[18px] tracking-[0.5px]">
            Day Off? Make it count.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-none w-full md:w-[400px] max-w-[400px]"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.68, 0, 1.2] }}
        >
          <Image
            src="/hero_team.jpg"
            alt="The Day Off Club team"
            width={400}
            height={533}
            className="w-full rounded-[20px] border-[5px] border-white object-cover object-top"
            style={{ boxShadow: '0 12px 40px rgba(43,95,143,0.20), 0 0 0 2px #90bef5' }}
            priority
          />
        </motion.div>
      </div>

      {/* Wave */}
      <div className="mt-[-2px] leading-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-[60px]">
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="#fff" />
        </svg>
      </div>
    </section>
  )
}
