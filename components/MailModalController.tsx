'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import MailModal only when it needs to be opened, skipping SSR.
const MailModal = dynamic(() => import('./MailModal'), {
  ssr: false,
})

export default function MailModalController() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('open-mail-modal', handleOpen)
    return () => window.removeEventListener('open-mail-modal', handleOpen)
  }, [])

  return (
    <>
      {open && (
        <MailModal open={open} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
