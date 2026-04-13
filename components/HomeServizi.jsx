'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { serviziPrincipali } from '@/data/servizi'
import ServiceCardExpand from '@/components/ServiceCardExpand'
import PreventivoWizard from '@/components/PreventivoWizard'

export default function HomeServizi() {
  const [openCard, setOpenCard] = useState(null)
  const [preselected, setPreselected] = useState([])
  const preventivoRef = useRef(null)

  function handleToggle(serviceId) {
    setOpenCard((prev) => (prev === serviceId ? null : serviceId))
  }

  function handleRichiediPreventivo(serviceId) {
    setOpenCard(null)
    setPreselected([serviceId])
    setTimeout(() => {
      preventivoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <>
      {/* Servizi principali preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wide">
              I nostri servizi
            </span>
            <h2 className="text-3xl font-bold text-brand-900 mt-2 text-balance">
              Cosa facciamo per te
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 items-start">
            {serviziPrincipali.map((s) => (
              <ServiceCardExpand
                key={s.id}
                servizio={s}
                isOpen={openCard === s.id}
                onToggle={() => handleToggle(s.id)}
                onRichiediPreventivo={handleRichiediPreventivo}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 transition"
            >
              Vedi tutti i servizi
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Preventivo */}
      <section id="preventivo" ref={preventivoRef} className="py-20 px-4 bg-brand-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-700 font-semibold text-sm uppercase tracking-wide">
              Preventivo gratuito
            </span>
            <h2 className="text-3xl font-bold text-brand-900 mt-2 mb-3 text-balance">
              Di cosa hai bisogno?
            </h2>
            <p className="text-gray-600">
              Seleziona uno o più servizi, rispondi a qualche domanda e Bruno ti contatterà senza impegno.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <PreventivoWizard preselected={preselected} />
          </div>
        </div>
      </section>
    </>
  )
}
