import { WHATSAPP_NUMBER, PHONE_TEL, PHONE_DISPLAY } from '@/lib/constants'

export const metadata = {
  title: 'Contatti — Chiamaci o Scrivi su WhatsApp',
  description: 'Contatta Bruno Trasporti Torino: +39 389 989 4129. Disponibili lunedì-sabato. Preventivo gratuito per sgomberi, pulizie e traslochi a Torino.',
}

export default function ContattiPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Contattaci</h1>
        <p className="text-gray-200 text-lg max-w-xl mx-auto">
          Siamo disponibili dal lunedì al sabato. Chiamaci o scrivi su WhatsApp per un preventivo gratuito.
        </p>
      </section>

      {/* Contatti principali */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Telefono */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex flex-col items-center gap-4 bg-white border-2 border-brand-100 hover:border-brand-500 rounded-2xl p-8 text-center transition-all group"
            >
              <div className="w-14 h-14 bg-brand-100 group-hover:bg-brand-500 rounded-2xl flex items-center justify-center transition-colors">
                <PhoneIcon className="w-7 h-7 text-brand-700 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Chiama ora</p>
                <p className="text-xl font-bold text-brand-900">{PHONE_DISPLAY}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-[#f0fdf4] border-2 border-[#bbf7d0] hover:border-[#25D366] rounded-2xl p-8 text-center transition-all group"
            >
              <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center">
                <WhatsAppIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Scrivi su WhatsApp</p>
                <p className="text-xl font-bold text-gray-800">Messaggio diretto</p>
              </div>
            </a>
          </div>

          {/* Info aggiuntive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard
              icon={<ClockIcon className="w-6 h-6 text-brand-700" />}
              title="Orari"
              text="Lun – Sab: 8:00 – 18:00"
            />
            <InfoCard
              icon={<LocationIcon className="w-6 h-6 text-brand-700" />}
              title="Zona operativa"
              text="Torino e provincia"
            />
            <InfoCard
              icon={<CalendarIcon className="w-6 h-6 text-brand-700" />}
              title="Preventivo"
              text="Gratuito e senza impegno"
            />
          </div>
        </div>
      </section>

      {/* Preventivo da qui */}
      <section className="py-12 px-4 bg-brand-100 text-center">
        <h2 className="text-xl font-bold text-brand-900 mb-2">Vuoi un preventivo guidato?</h2>
        <p className="text-gray-600 mb-4">
          Usa il nostro pannello in homepage per descrivere la tua esigenza — risponderemo al più presto.
        </p>
        <a
          href="/#preventivo"
          className="inline-block bg-brand-700 hover:bg-brand-900 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Vai al pannello preventivi
        </a>
      </section>
    </>
  )
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
      <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <p className="text-gray-500 text-sm mt-0.5">{text}</p>
      </div>
    </div>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
