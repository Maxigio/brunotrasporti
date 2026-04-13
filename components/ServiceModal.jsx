'use client'

import { useEffect } from 'react'
import { X, Check, ArrowRight } from 'lucide-react'
import { serviziDettagli } from '@/data/servizi_dettagli'
import { tuttiServizi } from '@/data/servizi'

export default function ServiceModal({ serviceId, onClose, onRichiediPreventivo }) {
  const servizio = tuttiServizi.find((s) => s.id === serviceId)
  const dettagli = serviziDettagli[serviceId]

  // Chiudi con ESC
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Blocca scroll body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!servizio) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Pannello slide-over */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-brand-900 text-white px-6 py-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 bg-opacity-20 rounded-xl flex items-center justify-center">
              <ServiceIconSvg name={servizio.icona} className="w-5 h-5 text-brand-100" />
            </div>
            <div>
              <p className="text-brand-300 text-xs font-medium uppercase tracking-wide">Servizio</p>
              <h2 className="text-xl font-bold">{servizio.nome}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-brand-300 hover:text-white p-1 transition-colors mt-0.5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenuto scrollabile */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Descrizione */}
          <div>
            <p className="text-gray-600 leading-relaxed">{servizio.descrizione}</p>
          </div>

          {/* Cosa è incluso */}
          {dettagli?.incluso && (
            <div>
              <h3 className="font-semibold text-brand-900 mb-3 text-sm uppercase tracking-wide">
                Cosa è incluso
              </h3>
              <ul className="space-y-2">
                {dettagli.incluso.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-700" strokeWidth={3} />
                    </span>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Card contatto rapido */}
          <div className="bg-brand-100 rounded-2xl p-4">
            <p className="text-brand-900 font-semibold text-sm mb-1">
              Vuoi sapere di più?
            </p>
            <p className="text-brand-700 text-sm mb-3">
              Contattaci su WhatsApp per una risposta immediata.
            </p>
            <a
              href={`https://wa.me/38991894120?text=${encodeURIComponent(`Salve Bruno, vorrei informazioni sul servizio: ${servizio.nome}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              <WhatsAppSvg />
              Chiedi su WhatsApp
            </a>
          </div>
        </div>

        {/* Footer con CTA */}
        <div className="border-t border-gray-100 px-6 py-4 bg-white">
          <button
            onClick={() => onRichiediPreventivo(serviceId)}
            className="w-full flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-900 text-white py-3.5 rounded-xl font-semibold text-base transition"
          >
            Richiedi preventivo gratuito
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  )
}

function ServiceIconSvg({ name, className }) {
  if (name === 'tree') return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8 2 4 6 4 10c0 2.5 1.5 4.7 3.7 5.8L7 20h10l-.7-4.2C18.5 14.7 20 12.5 20 10c0-4-4-8-8-8zm0 0v20" />
    </svg>
  )
  if (name === 'building') return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
  if (name === 'stairs') return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h4v-4h4v-4h4v-4h4V5" />
    </svg>
  )
  return <span className="text-xs">{name}</span>
}

function WhatsAppSvg() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
