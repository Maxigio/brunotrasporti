'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { tuttiServizi } from '@/data/servizi'
import { serviziDettagli } from '@/data/servizi_dettagli'

const WHATSAPP_NUMBER = '38991894120'
const STEP_LABELS = ['Servizi', 'Dettagli']

export default function PreventivoWizard({ preselected = [] }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(preselected)
  const [risposte, setRisposte] = useState({})   // { serviceId: { domandaId: valore } }
  const [note, setNote] = useState('')

  // Aggiorna selezione e torna allo step 0 se arriva una nuova preselection dal modal
  useEffect(() => {
    if (preselected.length > 0) {
      setSelected(preselected)
      setStep(0)
      setRisposte({})
      setNote('')
    }
  }, [preselected])

  function toggleServizio(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  function setRisposta(serviceId, domandaId, valore) {
    setRisposte((prev) => ({
      ...prev,
      [serviceId]: { ...(prev[serviceId] || {}), [domandaId]: valore },
    }))
  }

  function toggleRispostaMultipla(serviceId, domandaId, valore) {
    setRisposte((prev) => {
      const current = prev[serviceId]?.[domandaId] || []
      const updated = current.includes(valore)
        ? current.filter((v) => v !== valore)
        : [...current, valore]
      return { ...prev, [serviceId]: { ...(prev[serviceId] || {}), [domandaId]: updated } }
    })
  }

  function buildWhatsAppUrl() {
    const serviziNomi = selected
      .map((id) => tuttiServizi.find((s) => s.id === id)?.nome)
      .filter(Boolean)

    let msg = `Ciao Bruno, vorrei richiedere un preventivo gratuito.\n\n`
    msg += `Servizi: ${serviziNomi.join(', ')}\n`

    // Dettagli per ogni servizio con risposte
    const conRisposte = selected.filter((id) => Object.keys(risposte[id] || {}).length > 0)
    if (conRisposte.length > 0) {
      conRisposte.forEach((id) => {
        const servizio = tuttiServizi.find((s) => s.id === id)
        const risp = risposte[id] || {}
        const domande = serviziDettagli[id]?.domande || []
        msg += `\n${servizio?.nome}:\n`
        Object.entries(risp).forEach(([domandaId, valore]) => {
          const domanda = domande.find((d) => d.id === domandaId)
          const label = domanda?.label || domandaId
          const val = Array.isArray(valore) ? valore.join(', ') : valore
          if (val) msg += `- ${label}: ${val}\n`
        })
      })
    }

    if (note.trim()) {
      msg += `\nNote: ${note.trim()}\n`
    }

    msg += `\nZona: Torino e provincia`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  const hasAnyQuestions = selected.some((id) => serviziDettagli[id]?.domande?.length > 0)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i < step
                    ? 'bg-brand-500 text-white'
                    : i === step
                    ? 'bg-brand-700 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" strokeWidth={3} /> : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${i === step ? 'text-brand-700' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`w-16 h-0.5 mb-4 mx-1 transition-colors ${i < step ? 'bg-brand-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 0: Selezione servizi */}
      {step === 0 && (
        <div>
          <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide mb-1">
            Quali servizi ti servono?
          </p>
          <p className="text-xs text-gray-400 mb-4">Puoi selezionare più servizi</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
            {tuttiServizi.map((s) => {
              const isActive = selected.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleServizio(s.id)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all border-2 relative ${
                    isActive
                      ? 'bg-brand-700 text-white border-brand-700 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brand-500 hover:text-brand-700'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-1 right-1.5 text-white text-xs">✓</span>
                  )}
                  {s.nome}
                </button>
              )
            })}
          </div>
          {selected.length > 0 && (
            <p className="text-xs text-brand-700 font-medium">
              {selected.length} {selected.length === 1 ? 'servizio selezionato' : 'servizi selezionati'}
            </p>
          )}
        </div>
      )}

      {/* STEP 1: Domande custom + Note */}
      {step === 1 && (
        <div className="space-y-6">
          {hasAnyQuestions && (
            <div className="space-y-8">
              {selected.map((serviceId) => {
                const servizio = tuttiServizi.find((s) => s.id === serviceId)
                const dettagli = serviziDettagli[serviceId]
                if (!dettagli?.domande) return null
                return (
                  <div key={serviceId} className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-500 rounded-full inline-block"></span>
                      {servizio?.nome}
                    </h3>
                    <div className="space-y-5">
                      {dettagli.domande.map((domanda) => {
                        const valoreCorrente = risposte[serviceId]?.[domanda.id]
                        return (
                          <div key={domanda.id}>
                            <p className="text-sm font-semibold text-gray-700 mb-2">{domanda.label}</p>
                            <div className="flex flex-wrap gap-2">
                              {domanda.opzioni.map((opzione) => {
                                const isMultipla = domanda.tipo === 'scelta_multipla'
                                const isSelected = isMultipla
                                  ? (valoreCorrente || []).includes(opzione)
                                  : valoreCorrente === opzione
                                return (
                                  <button
                                    key={opzione}
                                    type="button"
                                    onClick={() =>
                                      isMultipla
                                        ? toggleRispostaMultipla(serviceId, domanda.id, opzione)
                                        : setRisposta(serviceId, domanda.id, opzione)
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${
                                      isSelected
                                        ? 'bg-brand-700 text-white border-brand-700'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-500'
                                    }`}
                                  >
                                    {opzione}
                                  </button>
                                )
                              })}
                            </div>
                            {domanda.tipo === 'scelta_multipla' && (
                              <p className="text-xs text-gray-400 mt-1">Puoi selezionare più opzioni</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Note aggiuntive */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note aggiuntive{' '}
              <span className="text-gray-400 font-normal">(opzionale)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Es. piano, ascensore, urgenza, orari preferiti..."
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none transition"
            />
          </div>

          {!hasAnyQuestions && (
            <p className="text-gray-500 text-sm text-center py-2">
              Nessuna domanda specifica per i servizi selezionati. Aggiungi note se vuoi e invia il messaggio.
            </p>
          )}
        </div>
      )}

      {/* Navigazione */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition ${
            step === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Indietro
        </button>

        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={selected.length === 0}
            className="flex items-center gap-2 bg-brand-700 hover:bg-brand-900 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            Avanti
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
          >
            <WhatsAppSvg />
            Invia su WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}

function WhatsAppSvg() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
