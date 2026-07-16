'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Arshpreet Puri',
    role: 'Co-Founder',
    img: '/arshi.webp',
    desc: "Why just scroll weekends away? We dreamed of workshops where you create, unwind, and leave feeling inspired.",
    quote: '"Sometimes, the shortest pause energise you!"',
    style: { objectPosition: 'center 25%' },
  },
  {
    name: 'Vishakha Adtani',
    role: 'Co-Founder',
    img: '/vishakha.webp',
    desc: "Some breaks don't need to be earned. Rest, when it's real, leaves you feeling productive without burning out.",
    quote: '"A real break shouldn\'t feel guilty, it should feel like you."',
    style: { objectPosition: 'center 65%' },
  },
  {
    name: 'Gunjyot Tuli',
    role: 'Co-Founder',
    img: '/gunjyot.webp',
    desc: "To bring strangers together through curiosity and creativity, reminding everyone that it's never too late to try.",
    quote: '"The best part? People leaving feeling wholesome with new friendships and warm memories."',
    style: { objectPosition: 'center 60%' },
  },
]

export default function Founders() {
  return (
    <section className="relative bg-off-white py-10 sm:py-[90px] px-4 sm:px-10 text-center overflow-hidden">
      <motion.p
        className="text-[1.1rem] text-blue-mid mb-4 tracking-[2px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <motion.h2
        className="font-fraunces text-[2.2rem] sm:text-[3.2rem] font-bold text-blue-dark leading-[1.15] mb-3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Meet the Founders
      </motion.h2>


      <div className="flex justify-center gap-[60px] flex-wrap max-w-[900px] mx-auto relative z-10">
        {founders.map((f, i) => {
          const orderClass = i === 0 ? 'order-2 md:order-none' : i === 1 ? 'order-1 md:order-none' : 'order-3 md:order-none';
          return (
            <motion.div
              key={i}
              className={`flex flex-col items-center w-[220px] hover:-translate-y-2 transition-transform duration-300 ${orderClass}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white mb-[18px]"
                style={{ boxShadow: '0 8px 32px rgba(43,95,143,0.18), 0 0 0 3px #90bef5' }}>
                <Image src={f.img} alt={f.name} width={180} height={180} sizes="180px" loading="lazy" className="w-full h-full object-cover" style={f.style} />
              </div>
              <h3 className="font-fraunces text-[1.2rem] font-bold text-blue-dark">{f.name}</h3>
              <p className="font-inter text-xs font-semibold tracking-[1.8px] uppercase text-blue-mid mb-[10px]">{f.role}</p>
              <p className="font-inter text-[0.85rem] text-[#5a7fa8] leading-[1.65] text-center max-w-[220px] mb-[10px]">{f.desc}</p>
              <p className="font-fraunces text-[0.95rem] italic text-blue-DEFAULT leading-[1.55] text-center max-w-[220px] border-t border-blue-light pt-3 mt-1">{f.quote}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  )
}
