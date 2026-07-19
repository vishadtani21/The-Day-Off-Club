import Image from 'next/image'

const photos = [
  'WhatsApp Image 2026-07-20 at 12.51.38 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.38 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.39 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.39 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.39 AM (2).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.40 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.40 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.40 AM (2).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.40 AM (3).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.41 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.41 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.41 AM (2).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.42 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.42 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.42 AM (2).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.42 AM (3).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.43 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.43 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.43 AM (2).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.43 AM (3).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.44 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.44 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.45 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.45 AM (1).jpeg',
  'WhatsApp Image 2026-07-20 at 12.51.46 AM.jpeg',
  'WhatsApp Image 2026-07-20 at 12.52.06 AM.jpeg',
  'WhatsApp Image 2026-05-22 at 11.16.07 AM.webp',
  'WhatsApp Image 2026-05-22 at 11.16.07 AM (1).webp',
  'WhatsApp Image 2026-05-22 at 11.16.07 AM (2).webp',
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


