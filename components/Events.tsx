'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const SUPABASE_URL = 'https://rxfyqgildzmioeougkdo.supabase.co'
const SUPABASE_KEY = 'sb_publishable_8g5MvDq-6df_IgxWz33MgQ_QgIAOI7F'

// No hardcoded events — all data comes from the admin panel (Supabase)

interface Event {
  id?: string
  title: string
  date: string
  day: string
  time: string
  venue: string
  cause?: string
  tag?: string
  link: string
}

function parseDate(dateStr: string) {
  const norm = dateStr.replace(/,/g, ' ').trim()
  const d = new Date(norm)
  if (!isNaN(d.getTime())) {
    return {
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day:   String(d.getDate()),
      year:  String(d.getFullYear()),
    }
  }
  return { month: '', day: dateStr, year: '' }
}

function TicketCard({ ev, i }: { ev: Event; i: number }) {
  const { month, day, year } = parseDate(ev.date)
  const img =
    ev.tag && (/^https?:\/\//i.test(ev.tag) || /^\//.test(ev.tag) || /^data:image\//i.test(ev.tag)) ? ev.tag : ''

  return (
    <motion.a
      href={ev.link}
      target="_blank"
      rel="noopener"
      className="flex flex-col sm:flex-row items-stretch w-full max-w-[720px] rounded-[14px] border border-[#e4ddd5] no-underline cursor-pointer hover:-translate-y-1 hover:scale-[1.012] transition-all duration-300"
      style={{
        background: '#f9f7f4',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
        overflow: 'visible',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: i * 0.12 }}
    >
      {/* ── Photo ── */}
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={img}
          alt={ev.title}
          width={150}
          height={160}
          sizes="(max-width: 640px) 100vw, 150px"
          className="flex-shrink-0 w-full sm:w-[150px] h-[160px] sm:h-auto object-cover rounded-t-[14px] sm:rounded-l-[14px] sm:rounded-tr-none"
          loading="lazy"
        />
      ) : (
        <div
          className="flex-shrink-0 w-full sm:w-[150px] h-[160px] sm:h-auto rounded-t-[14px] sm:rounded-l-[14px] sm:rounded-tr-none bg-gradient-to-br from-[#8faec8] to-[#2b5f8f]"
        />
      )}

      {/* ── Info ── */}
      <div className="flex-1 p-5 sm:px-6 sm:py-5 text-left flex flex-col justify-center gap-1 min-w-0">
        <div className="font-inter text-[0.76rem] font-medium tracking-[0.2px]" style={{ color: '#8c8480' }}>
          {ev.day} · {ev.time}
        </div>
        <div
          className="font-fraunces text-[1.5rem] font-normal italic leading-[1.22] mt-0.5"
          style={{ color: '#1c1410' }}
        >
          {ev.title}
        </div>
        <div className="font-inter text-[0.73rem] font-medium mt-0.5" style={{ color: '#a09890' }}>
          📍 {ev.venue}
        </div>
        {(ev.cause) && (
          <div className="font-inter text-[0.83rem] leading-[1.58] mt-1.5" style={{ color: '#6a6460' }}>
            {ev.cause}
          </div>
        )}
      </div>

      {/* ── Perforated divider ── */}
      <div
        className="flex-shrink-0 w-full sm:w-7 h-7 sm:h-auto relative flex flex-row sm:flex-col items-center justify-center bg-[#f9f7f4]"
      >
        {/* Top/Left notch */}
        <div
          className="absolute top-1/2 sm:top-[-1px] left-[-12px] sm:left-1/2 -translate-y-1/2 sm:-translate-y-0 sm:-translate-x-1/2 z-10 w-[24px] sm:w-[24px] h-[24px] sm:h-[13px] rounded-r-full sm:rounded-t-none sm:rounded-b-[14px] bg-[#0d2240]"
          style={{ background: 'rgba(13,34,64,0.85)' }}
        />
        {/* Dashed line */}
        <div
          className="absolute left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 top-1/2 sm:top-4 sm:bottom-4 w-auto sm:w-0 h-0 sm:h-auto border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-[#c8c0b8]"
        />
        {/* Bottom/Right notch */}
        <div
          className="absolute top-1/2 sm:bottom-[-1px] right-[-12px] sm:left-1/2 -translate-y-1/2 sm:-translate-y-0 sm:-translate-x-1/2 z-10 w-[24px] sm:w-[24px] h-[24px] sm:h-[13px] rounded-l-full sm:rounded-b-none sm:rounded-t-[14px] bg-[#0d2240]"
          style={{ background: 'rgba(13,34,64,0.85)' }}
        />
      </div>

      {/* ── Date block ── */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 w-full sm:w-[120px] py-4 sm:py-0 sm:h-auto rounded-b-[14px] sm:rounded-r-[14px] sm:rounded-bl-none overflow-hidden"
        style={{ background: '#f9f7f4' }}
      >
        <span className="font-fraunces text-[0.85rem] font-normal italic capitalize tracking-[0.5px]" style={{ color: '#4a6a8a' }}>
          {month}
        </span>
        <span className="font-fraunces text-[2rem] font-bold leading-none my-0.5" style={{ color: '#1c1410' }}>
          {day}
        </span>
        <span className="font-inter text-[0.76rem] font-semibold tracking-[0.5px] uppercase" style={{ color: '#8c8480' }}>
          {year}
        </span>
      </div>
    </motion.a>
  )
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/events?order=created_at.asc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((data: Event[]) => {
        setEvents(data || [])
        setLoading(false)
      })
      .catch(() => {
        setEvents([])
        setLoading(false)
      })
  }, [])

  return (
    <section
      id="events"
      className="relative py-[60px] sm:py-[90px] px-4 sm:px-10 text-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg2.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(13,34,64,0.72)' }} />

      <div className="relative z-10">
        <motion.p
          className="font-raleway font-bold text-[0.7rem] tracking-[4px] uppercase mb-[14px]"
          style={{ color: '#90bef5' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What&apos;s coming up
        </motion.p>

        <motion.h2
          className="font-fraunces text-[2.2rem] sm:text-[3.4rem] font-bold text-white mb-10 sm:mb-14 leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Upcoming{' '}
          <em className="italic not-italic" style={{ color: '#90bef5', fontStyle: 'italic' }}>
            Events
          </em>
        </motion.h2>

        <div className="flex flex-col items-center gap-5">
          {loading ? (
            [1, 2, 3].map(n => (
              <div
                key={n}
                className="w-full max-w-[720px] h-16 rounded-[14px] animate-shimmer"
                style={{ background: 'linear-gradient(90deg,#eef4fb 25%,#dceefa 50%,#eef4fb 75%)', backgroundSize: '200% 100%' }}
              />
            ))
          ) : events.length > 0 ? (
            events.map((ev, i) => <TicketCard key={i} ev={ev} i={i} />)
          ) : (
            <div className="flex flex-col items-center gap-3 py-5 pb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src="/flower.webp"
                alt=""
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-contain animate-gentle-sway"
                loading="lazy"
              />
              <p className="font-fraunces text-[1.8rem] font-semibold text-white">Something special is brewing.</p>
              <p className="font-inter text-[1rem] max-w-[420px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                We&apos;re behind the scenes crafting your next favourite day off. Stay tuned.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
