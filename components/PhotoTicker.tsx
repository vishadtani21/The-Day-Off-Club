import Image from 'next/image'

const photos = [
  'WhatsApp Image 2026-05-21 at 10.11.32 PM.webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM.webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (1).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (2).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (3).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (4).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (5).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (6).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (7).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (8).webp',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (9).webp',
]

export default function PhotoTicker() {
  const doubled = [...photos, ...photos]
  return (
    <div id="gallery" className="overflow-hidden py-0 bg-transparent relative">
      <div className="photo-ticker-track flex gap-[10px] w-max py-4">
        {doubled.map((src, i) => (
          <Image
            key={i}
            src={`/${src}`}
            alt="Event photo"
            width={165}
            height={220}
            sizes="(max-width: 768px) 50vw, 165px"
            loading="lazy"
            className="h-[220px] w-auto rounded-[10px] object-cover flex-shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.06] hover:saturate-110 transition-all duration-350"
          />
        ))}
      </div>
    </div>
  )
}

