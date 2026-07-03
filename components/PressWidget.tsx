'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function PressWidget() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Show when user scrolls past 300px (past Hero section)
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
        setOpen(false) // Close the press card if they scroll back up!
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 sm:bottom-7 left-4 sm:left-7 z-[9999] flex flex-col items-start gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute bottom-0 left-0 w-[350px] bg-[#faf8f2] rounded-xl p-6"
                style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(58,37,18,0.15)' }}
                initial={{ opacity: 0, scale: 0.1, rotate: -15, originX: 0, originY: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.1, rotate: -15 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <button onClick={() => setOpen(false)} className="absolute top-[14px] right-4 bg-transparent border-none text-[1.3rem] text-[#a39587] hover:text-[#3a2512] hover:rotate-90 transition-all cursor-pointer leading-none">×</button>
                <div className="flex flex-col items-center text-center mb-3 pt-1.5">
                  <Image src="/toi.avif" alt="Times of India" width={80} height={24} className="h-6 w-auto object-contain mb-1.5" />
                  <div className="font-raleway text-[0.62rem] font-bold tracking-[2px] text-[#8c7e70] uppercase">The Times of India · Featured</div>
                </div>
                <hr className="border-t-[3px] border-double border-[#3a2512] mb-4" />
                <h3 className="font-fraunces text-[1.25rem] font-bold text-[#24180d] leading-[1.35] mb-[10px] text-left">
                  Not just humans, dogs too stretch & wag tails in unique yoga session
                </h3>
                <p className="font-inter text-[0.82rem] text-[#4a3e35] leading-[1.6] mb-[18px] text-left">
                  Nagpur: Yoga mats were rolled out, not only for people but also for their puppies. On Sunday, a cosy cafe turned into a wellness retreat for a dog yoga session.
                </p>
                <a href="https://timesofindia.indiatimes.com/city/nagpur/not-just-humans-dogs-too-stretch-wag-tails-in-unique-yoga-session/articleshow/122801264.cms"
                  target="_blank" rel="noopener"
                  className="block w-full py-[10px] text-center font-raleway font-bold text-[0.78rem] tracking-[1px] uppercase text-[#faf8f2] bg-[#3a2512] rounded-md hover:bg-[#5a3d28] hover:-translate-y-0.5 transition-all no-underline">
                  Read Full Article
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!open && (
              <motion.button
                onClick={() => setOpen(true)}
                className="w-[80px] h-[80px] bg-transparent border-none cursor-pointer flex items-center justify-center p-0 animate-newsFloat hover:scale-110 hover:-translate-y-1 transition-transform"
                aria-label="Press Coverage"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Image src="/newspaper.webp" alt="Press Coverage" width={80} height={80} sizes="80px" className="w-full h-full object-contain" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
