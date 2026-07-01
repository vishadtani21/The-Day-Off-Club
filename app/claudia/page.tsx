'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rxfyqgildzmioeougkdo.supabase.co'
const SUPABASE_KEY = 'sb_publishable_8g5MvDq-6df_IgxWz33MgQ_QgIAOI7F'
const STORAGE_BUCKET = 'event-photos'
const CORRECT_USER = 'thedayoffclub'
const CORRECT_PASS = 'Claudia@10'
const SESSION_KEY = 'claudia_auth'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

interface Event {
  id: string
  title: string
  day: string
  date: string
  time: string
  venue: string
  link: string
  cause?: string
  tag?: string
  created_at?: string
}

interface FormState {
  title: string; day: string; date: string; time: string; venue: string; link: string; cause: string
}

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function Toast({ msg, type }: { msg: string; type: 'success'|'error'|'' }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl text-[0.83rem] font-semibold text-white z-[9999] flex items-center gap-2 ${type === 'success' ? 'bg-[#1a6b3f]' : 'bg-[#a32222]'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          style={{ boxShadow: '0 8px 26px rgba(0,0,0,0.2)' }}
        >
          {type === 'success' ? '✓' : '✕'} {msg}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [shake, setShake] = useState(false)

  const [events, setEvents] = useState<Event[]>([])
  const [dbStatus, setDbStatus] = useState<'loading'|'ok'|'err'>('loading')
  const [dbMsg, setDbMsg] = useState('Connecting…')

  const [editId, setEditId] = useState('')
  const [form, setForm] = useState<FormState>({ title: '', day: 'Saturday', date: '', time: '', venue: '', link: '', cause: '' })
  const [imgUrl, setImgUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File|null>(null)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)

  const [toast, setToast] = useState({ msg: '', type: '' as 'success'|'error'|'' })
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1') {
      setAuthed(true)
      load()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function showToast(msg: string, type: 'success'|'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 2800)
  }

  async function load() {
    const { data, error } = await sb.from('events').select('*').order('created_at', { ascending: true })
    if (error) { setDbStatus('err'); setDbMsg('Database error — ' + error.message) }
    else { setDbStatus('ok'); setDbMsg('Connected to Supabase ✓'); setEvents(data || []) }
  }

  function doLogin() {
    if (loginId === CORRECT_USER && loginPw === CORRECT_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true); load()
    } else {
      setLoginErr('Incorrect username or password. Try again.')
      setLoginPw('')
      setShake(true); setTimeout(() => setShake(false), 500)
    }
  }

  function doLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false); setLoginId(''); setLoginPw(''); setLoginErr('')
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    if (file.size > 5 * 1024 * 1024) { showToast('Photo must be under 5 MB', 'error'); return }
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function resetPhoto() {
    setSelectedFile(null); setPreview(''); setImgUrl('')
    if (fileRef.current) fileRef.current.value = ''
  }

  async function uploadPhoto(): Promise<string | null> {
    // No file selected — return existing URL or nothing
    if (!selectedFile) return imgUrl || null

    const ext  = selectedFile.name.split('.').pop()?.toLowerCase()
    const path = `events/${Date.now()}.${ext}`

    const { data, error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(path, selectedFile, { upsert: true })

    if (error) {
      console.warn("Storage upload failed, falling back to base64 inline image:", error.message)
      return preview || imgUrl || ''
    }

    // Successfully uploaded — get the public URL
    const { data: pub } = sb.storage.from(STORAGE_BUCKET).getPublicUrl(data.path)
    if (!pub?.publicUrl) {
      console.warn("Could not generate photo URL, falling back to base64 inline image.")
      return preview || imgUrl || ''
    }
    return pub.publicUrl
  }

  function startEdit(ev: Event) {
    setEditId(ev.id)
    setForm({ title: ev.title, day: ev.day, date: ev.date, time: ev.time, venue: ev.venue, link: ev.link, cause: ev.cause || '' })
    const photo = ev.tag && /^https?:\/\//i.test(ev.tag) ? ev.tag : ''
    setImgUrl(photo); setPreview(photo); setSelectedFile(null)
    document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function resetForm() {
    setEditId(''); setForm({ title: '', day: 'Saturday', date: '', time: '', venue: '', link: '', cause: '' })
    resetPhoto()
  }

  async function deleteEvent(id: string, title: string) {
    if (!confirm(`Remove "${title}" from the website?`)) return
    const { error } = await sb.from('events').delete().eq('id', id)
    if (error) { showToast('Delete failed: ' + error.message, 'error'); return }
    showToast('Event removed ✓'); load()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.link) { showToast('Please fill in all required fields', 'error'); return }
    setSaving(true)
    const tag = await uploadPhoto()
    // If upload returned null AND user picked a file, abort (critical error)
    if (tag === null && selectedFile) {
      setSaving(false)
      return
    }
    const payload = { ...form, tag: tag || null }
    const { error } = editId
      ? await sb.from('events').update(payload).eq('id', editId)
      : await sb.from('events').insert(payload)
    setSaving(false)
    if (error) { showToast('Error: ' + error.message, 'error'); return }
    showToast(editId ? 'Event updated ✓' : 'Event added to website ✓')
    resetForm(); load()
  }

  const inp = 'w-full font-inter text-[0.86rem] text-blue-dark bg-off-white border border-blue-light rounded-[10px] px-[13px] py-[10px] outline-none focus:border-blue-mid focus:shadow-[0_0_0_3px_rgba(58,122,191,0.12)] focus:bg-white transition-all'

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg,#d0e8fb 0%,#b4d4f7 50%,#c8dff9 100%)' }}>
        <motion.div
          className={`bg-white rounded-[28px] p-12 w-full max-w-[400px] text-center ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}
          style={{ boxShadow: '0 20px 60px rgba(26,63,107,.18), 0 0 0 1.5px rgba(144,190,245,.4)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/logo.png" alt="The Day Off Club" width={150} height={150} className="h-32 w-auto mx-auto mb-[18px]" />
          <h1 className="font-fraunces text-[1.65rem] font-bold text-blue-dark mb-1">Welcome, <em className="italic font-bold text-blue-mid">Claudia</em></h1>
          <p className="text-[0.82rem] text-[#7a9fc0] mb-8">Enter your credentials to access the admin panel.</p>

          <div className="flex flex-col gap-1.5 text-left mb-3.5">
            <label className="font-raleway font-bold text-[0.68rem] tracking-[1.5px] uppercase text-blue-DEFAULT">Username</label>
            <input className={inp} type="text" placeholder="Enter username" value={loginId} onChange={e => setLoginId(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} autoComplete="username" />
          </div>
          <div className="flex flex-col gap-1.5 text-left mb-3.5">
            <label className="font-raleway font-bold text-[0.68rem] tracking-[1.5px] uppercase text-blue-DEFAULT">Password</label>
            <input className={inp} type="password" placeholder="Enter password" value={loginPw} onChange={e => setLoginPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} autoComplete="current-password" />
          </div>

          <button onClick={doLogin} className="w-full mt-2.5 bg-blue-dark text-white border-none rounded-full py-[14px] font-raleway font-bold text-[0.82rem] tracking-[1.5px] uppercase cursor-pointer hover:bg-blue-DEFAULT hover:-translate-y-0.5 transition-all">
            Enter Panel →
          </button>
          {loginErr && <p className="mt-3.5 text-[0.8rem] font-semibold text-[#a32222]">{loginErr}</p>}
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Topbar */}
      <header className="sticky top-0 z-[100] bg-blue-dark px-10 py-3.5 flex items-center justify-between shadow-[0_2px_16px_rgba(0,0,0,.18)]">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto brightness-0 invert opacity-90" />
          <span className="font-fraunces text-[1.1rem] text-white font-semibold">Events Admin</span>
          <span className="font-raleway text-[0.62rem] font-bold tracking-[2px] uppercase bg-blue-mid text-white px-[10px] py-1 rounded-full">Private</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-blue-light text-[0.78rem] font-semibold no-underline hover:text-white transition-colors">Preview Website ↗</a>
          <button onClick={doLogout} className="bg-transparent border border-[rgba(144,190,245,.4)] text-blue-light rounded-full px-[14px] py-1.5 font-raleway text-[0.68rem] font-bold tracking-[1.5px] uppercase cursor-pointer hover:bg-[rgba(255,255,255,.08)] hover:text-white transition-all">
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-6 py-10 pb-20">
        <div className="mb-9">
          <h1 className="font-fraunces text-[2.4rem] font-bold text-blue-dark">Upcoming <em className="italic font-bold text-blue-mid">Events</em></h1>
          <p className="text-[0.9rem] text-[#5a7fa8] mt-1.5">Add, edit, or remove events — changes sync to the website instantly via Supabase.</p>
        </div>

        {/* DB Status */}
        <div className={`inline-flex items-center gap-[7px] text-[0.75rem] font-semibold px-3 py-1.5 rounded-full mb-6 ${dbStatus === 'ok' ? 'bg-[#e6f9f0] text-[#1a6b3f]' : dbStatus === 'err' ? 'bg-[#fde8e8] text-[#a32222]' : 'bg-[#eef4fb] text-blue-DEFAULT'}`}>
          <span className="w-[7px] h-[7px] rounded-full bg-current" />
          {dbMsg}
        </div>

        {/* Events list */}
        <p className="font-raleway font-bold text-[0.65rem] tracking-[3px] uppercase text-blue-mid mb-3.5">Live on website</p>
        <div className="flex flex-col gap-3 mb-11">
          {events.length === 0 && dbStatus === 'ok' ? (
            <div className="text-center py-11 px-5 bg-white rounded-[14px] border-2 border-dashed border-blue-light text-[#5a7fa8] text-[0.88rem]">
              <div className="text-[2.2rem] mb-2.5">📭</div>No events yet. Add one below!
            </div>
          ) : events.map((ev, i) => (
            <motion.div key={ev.id} className="bg-white rounded-[14px] px-5 py-4 flex items-center gap-4 shadow-[0_2px_12px_rgba(43,95,143,0.09)] border border-[rgba(144,190,245,.3)] hover:shadow-[0_6px_22px_rgba(43,95,143,.14)] transition-shadow"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <div className="w-8 h-8 rounded-full bg-blue-hero text-blue-dark font-fraunces font-bold text-[0.95rem] flex items-center justify-center flex-shrink-0">{i+1}</div>
              <div className="flex-1 min-w-0">
                <div className="font-fraunces font-bold text-[0.95rem] text-blue-dark truncate">{ev.title}</div>
                <div className="text-[0.75rem] text-[#5a7fa8] mt-0.5">{ev.day}, {ev.date} · {ev.venue}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(ev)} className="w-8 h-8 rounded-[9px] bg-blue-hero text-blue-DEFAULT border-none cursor-pointer flex items-center justify-center hover:bg-blue-light hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => deleteEvent(ev.id, ev.title)} className="w-8 h-8 rounded-[9px] bg-[#fde8e8] text-[#c0392b] border-none cursor-pointer flex items-center justify-center hover:bg-[#fbd5d5] hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <p className="font-raleway font-bold text-[0.65rem] tracking-[3px] uppercase text-blue-mid mb-3.5">Add new event</p>
        <div className="form-card bg-white rounded-[22px] px-[38px] py-[34px] shadow-[0_4px_26px_rgba(43,95,143,.10)] border border-[rgba(144,190,245,.3)]">
          <div className="flex items-center justify-between flex-wrap gap-2.5 mb-6 pb-[18px] border-b border-blue-light">
            <h2 className="font-fraunces text-[1.4rem] font-bold text-blue-dark">
              {editId ? <>Editing <em className="font-bold italic text-blue-mid">Event</em></> : <>New <em className="font-bold italic text-blue-mid">Event</em></>}
            </h2>
            {editId && <span className="text-[0.62rem] font-raleway font-bold tracking-[2px] uppercase bg-yellow-100 text-yellow-800 border border-yellow-400 px-[10px] py-1 rounded-full">✏️ Editing</span>}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-[18px]">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Event Name</label>
                <input className={inp} type="text" placeholder="e.g. Puppy Yoga" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required />
              </div>
              {/* Day */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Day</label>
                <select className={inp} value={form.day} onChange={e => setForm(f=>({...f,day:e.target.value}))}>
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Date <span className="font-normal normal-case tracking-normal text-[#9ab5d0] text-[0.7rem]">(e.g. June 14, 2026)</span></label>
                <input className={inp} type="text" placeholder="June 14, 2026" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} required />
              </div>
              {/* Time */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Time</label>
                <input className={inp} type="text" placeholder="10:00 AM – 12:00 PM" value={form.time} onChange={e => setForm(f=>({...f,time:e.target.value}))} required />
              </div>
              {/* Venue */}
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Venue</label>
                <input className={inp} type="text" placeholder="Studio Bloom, Bandra" value={form.venue} onChange={e => setForm(f=>({...f,venue:e.target.value}))} required />
              </div>
              {/* Link */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Registration Link</label>
                <input className={inp} type="url" placeholder="https://…" value={form.link} onChange={e => setForm(f=>({...f,link:e.target.value}))} required />
              </div>
              {/* Desc */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Description <span className="font-normal normal-case tracking-normal text-[#9ab5d0] text-[0.7rem]">(optional)</span></label>
                <textarea className={`${inp} resize-y min-h-[64px]`} rows={3} placeholder="A calming yoga session with rescue puppies…" value={form.cause} onChange={e => setForm(f=>({...f,cause:e.target.value}))} />
              </div>
              {/* Photo */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="font-inter font-semibold text-[0.75rem] tracking-[0.8px] uppercase text-blue-DEFAULT">Photo <span className="font-normal normal-case tracking-normal text-[#9ab5d0] text-[0.7rem]">(optional)</span></label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-blue-light bg-off-white rounded-xl p-6 text-center cursor-pointer hover:border-blue-mid hover:bg-[#eef4fb] transition-all min-h-[100px] flex items-center justify-center"
                >
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                  {preview ? (
                    <div className="flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="max-h-40 max-w-full rounded-[10px] object-cover" />
                      <p className="text-[0.75rem] text-[#5a7fa8]">{selectedFile?.name || 'Existing photo (upload new to replace)'}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a7abf" strokeWidth="1.5" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <p className="text-[0.82rem] text-[#7a9fc0]">Click to choose a photo</p>
                      <p className="text-[0.72rem] text-[#aac3dc] mt-1">JPG, PNG, WEBP — max 5 MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-6 pt-[22px] border-t border-blue-light flex-wrap">
              <button type="submit" disabled={saving}
                className="flex-1 min-w-[150px] bg-blue-dark text-white border-none rounded-full py-[13px] px-6 font-raleway font-bold text-[0.78rem] tracking-[1.5px] uppercase cursor-pointer flex items-center justify-center gap-2 hover:bg-blue-DEFAULT hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {saving ? 'Saving…' : editId ? 'Update Event' : 'Save Event to Website'}
              </button>
              {editId && (
                <button type="button" onClick={resetForm}
                  className="bg-off-white text-blue-DEFAULT border border-blue-light rounded-full py-[13px] px-[22px] font-raleway font-bold text-[0.78rem] tracking-[1.5px] uppercase cursor-pointer hover:bg-blue-light transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </>
  )
}
