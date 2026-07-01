'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function send() {
    if (!name || !subject || !body) { alert('Please fill in all fields.'); return }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: '59bb7e9e-a1a5-4e11-acb8-432eb6123cfb', subject: `${subject} — from ${name}`, message: body, from_name: name }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setTimeout(() => { setStatus('idle'); setName(''); setSubject(''); setBody(''); onClose() }, 2000)
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
          style={{ background: 'rgba(230,218,210,0.55)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="bg-white w-full max-w-[460px] relative px-9 py-[52px] rounded-sm stamp-mask"
            style={{ boxShadow: '0 24px 64px rgba(58,37,18,0.18)' }}
            initial={{ y: 32, scale: 0.96, rotate: -1 }}
            animate={{ y: 0, scale: 1, rotate: 0 }}
            exit={{ y: 32, scale: 0.96, rotate: -1 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Paperclip */}
            <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-10 h-14 z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
              <svg viewBox="0 0 40 56" fill="none">
                <rect x="10" y="0" width="20" height="36" rx="10" stroke="#bfc0c2" strokeWidth="4" fill="none" />
                <rect x="16" y="6" width="8" height="30" rx="4" stroke="#bfc0c2" strokeWidth="3" fill="none" />
                <rect x="4" y="30" width="32" height="14" rx="5" fill="#bfc0c2" />
              </svg>
            </div>

            <button onClick={onClose} className="absolute top-[18px] right-5 bg-transparent border-none text-[1.4rem] text-[#c4b8ae] hover:text-blue-DEFAULT hover:rotate-90 transition-all cursor-pointer leading-none">×</button>

            <div className="mb-6">
              <h3 className="font-fraunces text-[2rem] font-bold text-[#24180d] leading-[1.2] mb-1.5">Drop us a <em className="italic font-normal text-blue-mid">note!</em></h3>
              <p className="font-inter text-[0.82rem] text-[#8c7e70] leading-[1.5]">We&apos;d love to hear from you — fill in your details below.</p>
            </div>

            {[
              { label: 'Your Name', val: name, set: setName, placeholder: 'e.g. Hailey Bieber', type: 'text' },
              { label: 'Subject', val: subject, set: setSubject, placeholder: 'e.g. Workshop Enquiry', type: 'text' },
            ].map(f => (
              <div key={f.label} className="flex flex-col gap-1.5 mb-3.5">
                <label className="font-inter font-bold text-[0.67rem] tracking-[1.8px] uppercase text-[#b0a29a]">{f.label}</label>
                <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  className="border border-[#e8e0d8] rounded-md px-3 py-[9px] font-inter text-[0.88rem] text-[#3a2512] bg-[#fdfcfa] outline-none focus:border-blue-mid focus:shadow-[0_0_0_3px_rgba(123,90,58,0.10)] transition-all placeholder-[#c8bcb3]" />
              </div>
            ))}
            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="font-inter font-bold text-[0.67rem] tracking-[1.8px] uppercase text-[#b0a29a]">Message</label>
              <textarea rows={4} value={body} onChange={e => setBody(e.target.value)} placeholder="Hi Day Off Club, I'd love to know more about..."
                className="border border-[#e8e0d8] rounded-md px-3 py-[9px] font-inter text-[0.88rem] text-[#3a2512] bg-[#fdfcfa] outline-none focus:border-blue-mid focus:shadow-[0_0_0_3px_rgba(123,90,58,0.10)] transition-all resize-none placeholder-[#c8bcb3]" />
            </div>

            <div className="flex items-center justify-between gap-3 mt-[18px] pt-[14px] border-t border-dashed border-[#e8e0d8]">
              <span className="font-inter text-[0.75rem] text-[#b0a29a] italic truncate">to: the.dayoffclub@gmail.com</span>
              <button onClick={send} disabled={status === 'sending' || status === 'sent'}
                className={`flex-shrink-0 px-[22px] py-[10px] rounded-md font-raleway font-bold text-[0.82rem] tracking-[1px] uppercase text-white transition-all border-none cursor-pointer
                  ${status === 'sent' ? 'bg-[#2e7d52]' : status === 'error' ? 'bg-[#b94040]' : 'bg-blue-DEFAULT hover:bg-blue-dark hover:-translate-y-0.5'}`}>
                {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Sent!' : status === 'error' ? 'Failed — Retry' : 'Send →'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
