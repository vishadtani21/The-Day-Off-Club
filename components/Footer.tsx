import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-blue-dark text-blue-light pt-2 pb-9 px-10 text-center flex flex-col items-center gap-3">
      <div className="flex justify-center">
        <Image
          src="/white_logo.webp"
          alt="The Day Off Club"
          width={130}
          height={130}
          className="h-[130px] w-auto object-contain opacity-90"
          loading="lazy"
        />
      </div>
      <p className="text-[0.82rem] opacity-80">Day Off? Make it count.</p>
      <p className="text-[0.82rem] opacity-80">© 2026 The Day Off Club. Slow down. Learn. Connect. Give back.</p>
      <div className="flex gap-6">
        {[['#services', 'Workshops'], ['#gallery', 'Gallery'], ['#faq', 'FAQ']].map(([href, label]) => (
          <a key={href} href={href} className="text-blue-light text-[0.82rem] font-semibold hover:text-white transition-colors no-underline">
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
