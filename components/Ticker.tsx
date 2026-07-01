const words = [
  'Warm','Community-driven','Creative','Wholesome','Aesthetic','Youthful',
  'Inclusive','Vibrant','Heartfelt','Fun','Intentional','Memorable',
  'Soulful','Welcoming','Playful','Thoughtful','Artistic','Energetic','Feel-good','Genuine',
]

export default function Ticker() {
  const doubled = [...words, ...words]
  return (
    <div className="bg-white overflow-hidden py-[14px] border-t-2 border-b-2 border-blue-light">
      <div className="ticker-track flex gap-7 whitespace-nowrap w-max">
        {doubled.map((w, i) => (
          <span key={i} className="font-inter font-semibold text-[0.95rem] text-blue tracking-[0.5px]">
            {w}
            {i < doubled.length - 1 && (
              <span className="text-blue-mid text-xl mx-2">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
