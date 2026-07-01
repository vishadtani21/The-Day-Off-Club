'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SocialSidebar({ onMailOpen }: { onMailOpen: () => void }) {
  return (
    <aside className="fixed right-[18px] top-1/2 -translate-y-1/2 z-[900] hidden lg:flex flex-col gap-3">
      <a href="https://chat.whatsapp.com/E6EpNtevkj3HSSCc88NfUd" target="_blank" rel="noopener" aria-label="WhatsApp"
        className="flex items-center justify-center w-[34px] h-[34px] bg-blue-DEFAULT rounded-full text-white hover:bg-blue-dark hover:scale-110 transition-all">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2 22l4.985-1.424A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 0 1-4.071-1.115l-.29-.173-3.002.857.844-3.093-.19-.304A7.946 7.946 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>
      </a>
      <button onClick={onMailOpen} aria-label="Email"
        className="flex items-center justify-center w-[34px] h-[34px] bg-blue-DEFAULT rounded-full text-white hover:bg-blue-dark hover:scale-110 transition-all border-none cursor-pointer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </button>
      <a href="https://instagram.com/the.dayoffclub" target="_blank" rel="noopener" aria-label="Instagram"
        className="flex items-center justify-center w-[34px] h-[34px] bg-blue-DEFAULT rounded-full text-white hover:bg-blue-dark hover:scale-110 transition-all">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </a>
    </aside>
  )
}
