'use client'

import { Check, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { serviziDettagli } from '@/data/servizi_dettagli'

// Foto reali per i servizi con immagini disponibili
const servicePhotos = {
  'pulizia-verde':    '/images/gallery/verde-2.jpg',
  'pulizia-scale':    '/images/gallery/scale-1.jpg',
  'pulizia-locali':   '/images/gallery/locali-5.jpg',
  'traslochi':        '/images/gallery/furgone-3.jpg',
  'smaltimenti':      '/images/gallery/furgone-7.jpg',
  'sgombero-cantine': '/images/gallery/furgone-9.jpg',
  'noleggio-scala':   '/images/gallery/furgone-1.jpg',
}

// Gradient fallback per servizi senza foto
const gradients = {
  'pulizia-verde':           'from-emerald-500 to-green-700',
  'pulizia-locali':          'from-blue-500 to-indigo-700',
  'pulizia-scale':           'from-slate-400 to-gray-600',
  'noleggio-scala':          'from-amber-400 to-orange-600',
  'trasporti':               'from-orange-500 to-red-600',
  'traslochi':               'from-orange-500 to-red-600',
  'smaltimenti':             'from-rose-400 to-pink-600',
  'sgomberi':                'from-purple-400 to-violet-700',
  'sgombero-cantine':        'from-purple-400 to-violet-700',
  'decoratore':              'from-pink-400 to-rose-600',
  'idraulico':               'from-cyan-400 to-blue-600',
  'elettricista':            'from-yellow-400 to-amber-500',
  'acquisto-oggetti-antichi':'from-amber-600 to-yellow-700',
  'muratura-completa':       'from-stone-500 to-gray-700',
}

export default function ServiceCardExpand({ servizio, isOpen, onToggle, onRichiediPreventivo }) {
  const dettagli = serviziDettagli[servizio.id]
  const gradient = gradients[servizio.id] || 'from-brand-500 to-brand-700'
  const photo = servicePhotos[servizio.id] || null

  return (
    <div
      className={`rounded-2xl border-2 bg-white overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-brand-500 shadow-xl'
          : 'border-gray-100 shadow-sm hover:border-brand-200 hover:shadow-md'
      }`}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start gap-4 group focus:outline-none"
        aria-expanded={isOpen}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? 'bg-brand-500' : 'bg-brand-100 group-hover:bg-brand-500'
          }`}
        >
          <ServiceIcon
            name={servizio.icona}
            className={`w-6 h-6 transition-colors ${
              isOpen ? 'text-white' : 'text-brand-700 group-hover:text-white'
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-brand-900 text-lg leading-tight">{servizio.nome}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mt-1">{servizio.descrizione}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 mt-1.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable body — grid-template-rows trick for smooth animation */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s ease',
        }}
      >
        <div className="overflow-hidden">
          {/* Banner: foto reale se disponibile, altrimenti gradient */}
          <div className="w-full h-44 relative overflow-hidden">
            {photo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={servizio.nome}
                  className="w-full h-full object-cover"
                />
                {/* Overlay scuro + gradiente per leggibilità */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradient}`}>
                <ServiceIcon
                  name={servizio.icona}
                  className="w-36 h-36 text-white opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            )}
            {/* Label + icona centrata — sempre visibile */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                <ServiceIcon name={servizio.icona} className="w-8 h-8 text-white drop-shadow" />
              </div>
              <span className="text-white text-xs font-semibold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {servizio.nome}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {dettagli?.incluso && (
              <div className="mb-5">
                <p className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-3">
                  Cosa è incluso
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dettagli.incluso.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-brand-600" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            {onRichiediPreventivo ? (
              <button
                onClick={() => onRichiediPreventivo(servizio.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Richiedi preventivo gratuito
                <ArrowRight />
              </button>
            ) : (
              <Link
                href="/#preventivo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Richiedi preventivo gratuito
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── helpers ─────────────────────────────────────────────────── */

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function ServiceIcon({ name, className }) {
  const icons = {
    tree: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 21h14M12 3v18M7.5 8.5C7.5 6 9.6 4 12 4s4.5 2 4.5 4.5c0 1.5-.8 2.8-2 3.6L12 16l-2.5-3.9c-1.2-.8-2-2.1-2-3.6z" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    stairs: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h4v-4h4v-4h4v-4h4V5" />
      </svg>
    ),
    ladder: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v18M16 3v18M8 7h8M8 12h8M8 17h8" />
      </svg>
    ),
    truck: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8zM13 8h4l2 4v4h-6V8z" />
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    box: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    paint: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    water: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    lightning: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gem: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l9 6-9 12L3 9l9-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9h18" />
      </svg>
    ),
    bricks: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18M9 6v6M15 12v6" />
      </svg>
    ),
  }
  return icons[name] || null
}
