'use client'

import { useState } from 'react'
import { tuttiServizi } from '@/data/servizi'
import { WHATSAPP_NUMBER } from '@/lib/constants'

export default function PreventivoPanel() {
  const [selected, setSelected] = useState([])   // ← array, multi-select
  const [descrizione, setDescrizione] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function toggleServizio(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (selected.length === 0) {
      setError('Seleziona almeno un servizio prima di procedere.')
      return
    }
    setError('')
    setLoading(true)

    const serviziNomi = selected
      .map((id) => tuttiServizi.find((s) => s.id === id)?.nome)
      .filter(Boolean)
      .join(', ')

    try {
      const res = await fetch('/api/preventivi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servizio: serviziNomi, descrizione }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Errore ${res.status}`)
      }

      setSuccess(true)
    } catch (err) {
      setError(`Errore: ${err.message}. Puoi contattarci direttamente su WhatsApp.`)
    } finally {
      setLoading(false)
    }
  }

  function buildWhatsAppUrl() {
    const serviziNomi = selected
      .map((id) => tuttiServizi.find((s) => s.id === id)?.nome)
      .filter(Boolean)
      .join(', ')
    const text = `Salve Bruno, ho bisogno di un preventivo per: *${serviziNomi || 'servizio non specificato'}*.\n\nDettagli: ${descrizione || 'Non specificati'}.\n\nZona: Torino e provincia.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  function reset() {
    setSelected([])
    setDescrizione('')
    setSuccess(false)
    setError('')
  }

  if (success) {
    return (
      <div className="bg-brand-100 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2">Richiesta inviata!</h3>
        <p className="text-gray-600 mb-6">
          Bruno ha ricevuto la tua richiesta e ti contatterà al più presto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Scrivici anche su WhatsApp
          </a>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl border-2 border-brand-700 text-brand-700 font-semibold hover:bg-brand-700 hover:text-white transition"
          >
            Nuova richiesta
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {/* Step 1 — Selezione servizi (multi-select) */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide mb-1">
          1. Di cosa hai bisogno?
        </p>
        <p className="text-xs text-gray-400 mb-3">Puoi selezionare più servizi</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                  <span className="absolute top-1 right-1.5 text-white text-xs leading-none">✓</span>
                )}
                {s.nome}
              </button>
            )
          })}
        </div>
        {selected.length > 0 && (
          <p className="text-xs text-brand-700 font-medium mt-2">
            {selected.length} {selected.length === 1 ? 'servizio selezionato' : 'servizi selezionati'}
          </p>
        )}
        {error && selected.length === 0 && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Step 2 — Descrizione */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-brand-700 uppercase tracking-wide mb-2">
          2. Descrivi brevemente la situazione{' '}
          <span className="text-gray-400 font-normal normal-case">(opzionale)</span>
        </label>
        <textarea
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          rows={3}
          placeholder="Es. Giardino condominiale di 200 mq che necessita di taglio erba mensile..."
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-500 resize-none transition"
        />
      </div>

      {/* Errore generico */}
      {error && selected.length > 0 && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-900 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition disabled:opacity-60"
      >
        {loading ? (
          <>
            <SpinnerIcon className="w-5 h-5 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <SendIcon className="w-5 h-5" />
            Richiedi preventivo gratuito
          </>
        )}
      </button>
    </form>
  )
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SendIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
