const photos = [
  'WhatsApp Image 2026-05-21 at 10.11.32 PM.jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM.jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (1).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (2).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (3).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (4).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (5).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (6).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (7).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (8).jpeg',
  'WhatsApp Image 2026-05-21 at 10.11.33 PM (9).jpeg',
]

export default function PhotoTicker() {
  const doubled = [...photos, ...photos]
  return (
    <div id="gallery" className="overflow-hidden py-0 bg-transparent relative">
      <div className="photo-ticker-track flex gap-[10px] w-max py-4">
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={`/${src}`}
            alt="Event photo"
            className="h-[220px] w-auto rounded-[10px] object-cover flex-shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.06] hover:saturate-110 transition-all duration-350"
          />
        ))}
      </div>
    </div>
  )
}
