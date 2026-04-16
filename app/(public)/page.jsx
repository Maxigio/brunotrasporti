import Link from 'next/link'
import HomeServizi from '@/components/HomeServizi'
import GalleryLightbox from '@/components/GalleryLightbox'

// Selezione curata per la gallery — 12 foto + 2 video che rappresentano i lavori
const galleryItems = [
  { type: 'photo', src: '/images/gallery/verde-3.jpg' },
  { type: 'photo', src: '/images/gallery/furgone-2.jpg' },
  { type: 'video', src: '/videos/video-1.mp4' },
  { type: 'photo', src: '/images/gallery/locali-4.jpg' },
  { type: 'photo', src: '/images/gallery/scale-2.jpg' },
  { type: 'photo', src: '/images/gallery/verde-6.jpg' },
  { type: 'photo', src: '/images/gallery/misc-5.jpg' },
  { type: 'photo', src: '/images/gallery/furgone-8.jpg' },
  { type: 'video', src: '/videos/video-2.mp4' },
  { type: 'photo', src: '/images/gallery/locali-10.jpg' },
  { type: 'photo', src: '/images/gallery/misc-12.jpg' },
  { type: 'photo', src: '/images/gallery/verde-1.jpg' },
  { type: 'photo', src: '/images/gallery/furgone-5.jpg' },
  { type: 'photo', src: '/images/gallery/misc-7.jpg' },
  { type: 'video', src: '/videos/video-sgomberi-traslochi.mp4' },
]

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/brunomalfissi?utm_source=qr&igsh=MXJqZDZjemlsc3dxOQ%3D%3D',
    color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]',
    icon: <InstagramIcon className="w-6 h-6" />,
    cta: 'Seguici',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@brunomalf?_r=1&_t=ZN-95aryquD9Bm',
    color: 'bg-black',
    icon: <TikTokIcon className="w-6 h-6" />,
    cta: 'Guardaci',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-[#1a5c3a] text-white py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-4xl 2xl:max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500 bg-opacity-20 border border-brand-500 border-opacity-40 text-brand-100 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full mb-5 sm:mb-6">
            <span className="w-2 h-2 bg-brand-500 rounded-full inline-block shrink-0"></span>
            Torino e provincia
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold leading-tight text-balance mb-4">
            Bruno Trasporti
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 font-light mb-7 sm:mb-8 text-balance max-w-2xl mx-auto">
            Sgomberi, traslochi, pulizie e molto altro a Torino e provincia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link
              href="#preventivo"
              className="bg-white text-brand-900 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-base sm:text-lg transition"
            >
              Richiedi un preventivo
            </Link>
            <Link
              href="/servizi"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-30 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-base sm:text-lg transition"
            >
              Scopri i servizi
            </Link>
            <a
              href={`https://wa.me/38991894120?text=${encodeURIComponent('Salve Bruno, ho bisogno di un pronto intervento urgente. Sono disponibile a essere ricontattato al più presto.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-base sm:text-lg transition"
            >
              <WhatsAppSvg />
              Pronto intervento
            </a>
          </div>
        </div>
      </section>

      {/* Guarda il nostro lavoro */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wide">Il nostro lavoro</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mt-2 mb-2">Guarda cosa facciamo</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Foto e video dei nostri interventi a Torino e provincia. Clicca per ingrandire.
            </p>
          </div>

          <GalleryLightbox items={galleryItems} />

          {/* Social media */}
          <div className="border-t border-gray-100 pt-10">
            <p className="text-center text-sm text-gray-500 mb-6 font-medium uppercase tracking-wide">
              Seguici per vedere di più
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${s.color} text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition w-full sm:w-auto justify-center`}
                >
                  {s.icon}
                  <span>{s.cta} su {s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeServizi />
    </>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function TikTokIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z" />
    </svg>
  )
}

function WhatsAppSvg() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
