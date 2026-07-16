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
          <div
            key={i}
            className="relative flex-shrink-0 rounded-[10px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.06] transition-all duration-350"
            style={{ width: 165, height: 220 }}
          >
            <Image
              src={`/${src}`}
              alt="Event photo"
              fill
              sizes="165px"
              loading="lazy"
              className="object-cover hover:saturate-110 transition-all duration-350"
            />
          </div>
        ))}
      </div>
    </div>
  )
}


