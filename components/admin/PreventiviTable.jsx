'use client'

import { useState, Fragment } from 'react'

const STATI = [
  { value: 'da_richiamare', label: 'Da richiamare', color: 'bg-red-100 text-red-700' },
  { value: 'in_lavorazione', label: 'In lavorazione', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'completato', label: 'Completato', color: 'bg-green-100 text-green-700' },
]

function getStatoInfo(status) {
  return STATI.find((s) => s.value === status) || STATI[0]
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function PreventiviTable({ initialData }) {
  const [items, setItems] = useState(initialData || [])
  const [updating, setUpdating] = useState(null)
  const [expanded, setExpanded] = useState(null)

  async function updateStatus(id, newStatus) {
    setUpdating(id)
    try {
      await fetch(`/api/preventivi/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      )
    } catch {
      alert('Errore aggiornamento stato')
    } finally {
      setUpdating(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-base font-medium mb-1">Nessuna richiesta ricevuta</p>
        <p className="text-sm">Le richieste dal pannello preventivi appariranno qui.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
            <th className="pb-3 pr-4 font-semibold">Data</th>
            <th className="pb-3 pr-4 font-semibold">Contatto</th>
            <th className="pb-3 pr-4 font-semibold">Servizio</th>
            <th className="pb-3 pr-4 font-semibold">Note</th>
            <th className="pb-3 font-semibold">Stato</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((item) => {
            const stato = getStatoInfo(item.status)
            const isExpanded = expanded === item.id
            const nome = item.contatto_nome || null
            const telefono = item.contatto_telefono || null
            const email = item.contatto_email || null
            const note = item.descrizione || null

            return (
              <Fragment key={item.id}>
                <tr
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                >
                  <td className="py-3 pr-4 text-gray-400 whitespace-nowrap text-xs">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="py-3 pr-4">
                    {nome ? (
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{nome}</p>
                        {telefono && (
                          <a
                            href={`tel:${telefono}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-brand-700 hover:underline text-xs"
                          >
                            {telefono}
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-300 italic text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {item.servizio || '—'}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 max-w-[200px]">
                    {note ? (
                      <span className="line-clamp-1 text-xs">{note}</span>
                    ) : (
                      <span className="text-gray-300 italic text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <select
                      value={item.status}
                      disabled={updating === item.id}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateStatus(item.id, e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer appearance-none ${stato.color} disabled:opacity-60`}
                    >
                      {STATI.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="bg-brand-50">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        {nome && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Nome</p>
                            <p className="text-gray-800">{nome}</p>
                          </div>
                        )}
                        {telefono && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Telefono</p>
                            <a href={`tel:${telefono}`} className="text-brand-700 hover:underline font-medium">{telefono}</a>
                          </div>
                        )}
                        {email && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                            <a href={`mailto:${email}`} className="text-brand-700 hover:underline">{email}</a>
                          </div>
                        )}
                        {note && (
                          <div className="sm:col-span-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Note / Dettagli</p>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{note}</p>
                          </div>
                        )}
                        <div className="sm:col-span-3 pt-2 border-t border-brand-200 flex gap-3">
                          {telefono && (
                            <a
                              href={`https://wa.me/${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Salve ${nome || ''}, la contatto riguardo alla sua richiesta di preventivo per: ${item.servizio}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5c] px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <WhatsAppIcon />
                              Scrivi su WhatsApp
                            </a>
                          )}
                          {telefono && (
                            <a
                              href={`tel:${telefono}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 border border-brand-300 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Chiama
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
