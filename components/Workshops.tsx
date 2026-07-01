'use client'
import { motion } from 'framer-motion'

const workshops = [
  { tag: 'Our First Workshop', title: 'Puppy Yoga', desc: 'A calming yoga session with rescue puppies. Movement, connection, and open playtime.', reel: 'https://www.instagram.com/reel/DMXrWZPtsBz/?igsh=MWF5OWxmdGUzNXpraA==' },
  { title: 'Pilates & Puppies', desc: 'Low impact Pilates followed by rescue pups roaming freely. Pure chaos, pure joy.', reel: 'https://www.instagram.com/reel/DVOKccvDH7h/?igsh=MWsycXk4MnBoNWJlNA==' },
  { title: 'Tote Bag Painting', desc: 'One hour of creative freedom. Paint your own canvas tote, no experience needed.', reel: 'https://www.instagram.com/reel/DOOEgjBDMUF/?igsh=Mzg4NGowczFzbWVk' },
  { title: 'Art & Icing', desc: 'Two hours of hands-on cake decorating. Learn icing techniques and take home everything you make.', reel: 'https://www.instagram.com/reel/DSxcn__jJH2/?igsh=MW9ta2dibnJxeHo4YQ==' },
  { title: 'Pottery With Puppies', desc: 'Three hours of clay and calm, with rescue puppies wandering through the studio.', reel: 'https://www.instagram.com/reel/DYxEku2ssYD/?igsh=MWtmcGF4N25ocTd3cQ==' },
  { collab: true, title: 'Puppy Yoga × Aryodaya KIA', desc: 'An initiative by Aryodaya KIA — Puppy Yoga by The Day Off Club at Aryodaya KIA Showroom, Ghat Road. 7th June 2026.', reel: 'https://www.instagram.com/reel/DZUJ2pHzvs6/?igsh=angxcjVuMGw3Zmpo' },
  { collab: true, title: 'Project PAWsitivity × Sehej Foundation', desc: 'An MMA warm-up, followed by Puppy Yoga and Canvas Painting — in collaboration with The Sehej Foundation.', reel: 'https://www.instagram.com/reel/DWjIKi6MxQ2/?igsh=MXRxbnV5N3pkdTB4NQ==' },
  { collab: true, title: 'Puppy Yoga × The Happy Hive', desc: 'Puppy Yoga at Chitnavis Centre as part of The Happy Hive Kids Carnival. A joyful afternoon of pups, play, and pure happiness.', reel: 'https://www.instagram.com/reel/DTu4iK0jd2c/?igsh=ZWZyeWo4YW5xd3o2' },
  { collab: true, title: 'Puppy Yoga × Edify School', desc: 'Initiated by Edify School — Puppy Yoga brought to life by The Day Off Club. A special session for young minds and wagging tails.', reel: 'https://www.instagram.com/reel/DYNAnC0NIRO/?igsh=MWk3MnV2ODlkaHFwag==' },
  { collab: true, title: 'Pace, Paws & Plates', desc: 'The Day Off Club × Raftaar Run Club × Traders Cafe. An exclusive all-girls workshop — a 3K/5K run, Puppy Yoga, and Build Your Own Salad.', reel: 'https://www.instagram.com/reel/DZmM0L7tk2Q/?igsh=eDR5anUxM2Y1ZGNm' },
]

export default function Workshops() {
  return (
    <section id="services" className="relative">
      <div
        className="relative py-[40px] sm:py-[60px] px-4 sm:px-10 text-center"
        style={{ backgroundImage: "url('/bluee.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <motion.h2
          className="font-fraunces text-[2.8rem] sm:text-[4.5rem] font-bold text-blue mb-8 sm:mb-10"
          style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Workshops
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px] max-w-[1020px] mx-auto">
          {workshops.map((w, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(43,95,143,0.10)] text-center hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(43,95,143,0.16)] transition-all duration-300"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              {w.tag && (
                <span className="inline-block bg-yellow-300 text-yellow-900 text-[0.6rem] font-bold tracking-wide px-[10px] py-[3px] rounded-full mb-[10px]">
                  {w.tag}
                </span>
              )}
              <h3 className="font-fraunces text-[1.15rem] font-bold text-blue-dark mb-2">{w.title}</h3>
              <p className="text-[0.82rem] text-[#2e5a8a] leading-[1.55] mb-2">{w.desc}</p>
              <a href="#gallery" className="text-[0.78rem] text-blue block mt-2 hover:underline">See Photos →</a>
              <a
                href={w.reel} target="_blank" rel="noopener"
                className="inline-flex items-center gap-1 mt-1.5 text-[0.75rem] font-semibold text-red-600 hover:opacity-75 hover:translate-x-0.5 transition-all"
              >
                Watch Highlights ▶
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
