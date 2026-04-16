'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { serviziPrincipali, serviziCollaborazione, tuttiServizi } from '@/data/servizi'
import ServiceCardExpand from '@/components/ServiceCardExpand'

/* ─── timeline ────────────────────────────────────────────────── */
const timeline = [
  {
    n: '1',
    title: 'Richiedi il preventivo',
    desc: 'Compila il modulo, chiamaci o scrivici su WhatsApp. Risponderemo entro poche ore, senza impegno.',
    icon: 'doc',
  },
  {
    n: '2',
    title: 'Sopralluogo gratuito',
    desc: 'Quando il lavoro lo richiede, veniamo direttamente da te per valutare la situazione sul posto.',
    icon: 'search',
  },
  {
    n: '3',
    title: 'Preventivo trasparente',
    desc: 'Ricevi un preventivo chiaro e dettagliato. Nessun costo nascosto, nessuna sorpresa.',
    icon: 'check',
  },
  {
    n: '4',
    title: 'Intervento professionale',
    desc: "Il team arriva puntuale con tutta l'attrezzatura necessaria per completare il lavoro a regola d'arte.",
    icon: 'wrench',
  },
  {
    n: '5',
    title: 'Verifica e consegna',
    desc: 'Controlliamo insieme il risultato finale. Non chiudiamo il lavoro finché non sei soddisfatto.',
    icon: 'star',
  },
]

/* ─── recensioni ──────────────────────────────────────────────── */
const recensioni = [
  {
    name: 'Marco R.',
    location: 'Torino',
    service: 'Pulizia verde',
    avatar: 'MR',
    text: 'Bruno segue il mio giardino da oltre un anno e non ho mai avuto il minimo problema. Puntuali, professionali e prezzi più che onesti. Lo consiglio a chiunque.',
    stars: 5,
  },
  {
    name: 'Condominio Via Roma',
    location: 'Torino',
    service: 'Pulizia scale',
    avatar: 'CR',
    text: "Affidiamo la pulizia di tre palazzi a Bruno da anni. Sempre affidabili, rispettosi delle aree comuni e mai un ritardo. Un punto di riferimento per il nostro amministratore.",
    stars: 5,
  },
  {
    name: 'Luca P.',
    location: 'Collegno',
    service: 'Traslochi',
    avatar: 'LP',
    text: 'Trasloco gestito alla perfezione: mobili smontati, imballati con cura e rimontati senza un graffio. Team gentile e disponibile. Grazie mille a tutti!',
    stars: 5,
  },
]

/* ─── avatar colors ───────────────────────────────────────────── */
const avatarColors = ['bg-brand-700', 'bg-emerald-600', 'bg-indigo-600', 'bg-orange-600']

export default function ServiziContent() {
  const [openCard, setOpenCard] = useState(null)
  const [form, setForm] = useState({ servizio: '', nome: '', telefono: '', note: '' })
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const formRef = useRef(null)

  function handleToggle(id) {
    setOpenCard((prev) => (prev === id ? null : id))
  }

  function handleRichiediPreventivo(serviceId) {
    setOpenCard(null)
    setForm((prev) => ({ ...prev, servizio: serviceId }))
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')
    const servizioNome =
      tuttiServizi.find((s) => s.id === form.servizio)?.nome || form.servizio

    try {
      const res = await fetch('/api/preventivi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servizio: servizioNome,
          descrizione: form.note,
          contatto_nome: form.nome,
          contatto_telefono: form.telefono,
        }),
      })
      if (!res.ok) throw new Error()
      setFormSuccess(true)
    } catch {
      setFormError('Errore durante l\'invio. Riprova o contattaci direttamente.')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-[#1a5c3a] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500 bg-opacity-20 border border-brand-500 border-opacity-40 text-brand-100 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-500 rounded-full inline-block shrink-0" />
            12 servizi disponibili · Torino e provincia
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold leading-tight text-balance mb-4">
            I Nostri <span className="text-white opacity-80">Servizi</span>
          </h1>
          <p className="text-xl text-gray-200 font-light mb-8 max-w-2xl mx-auto text-balance">
            Dalla cura del verde alle pulizie professionali, traslochi e molto altro — tutto ciò di cui
            hai bisogno, con un unico interlocutore di fiducia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#preventivo-rapido"
              className="bg-white text-brand-900 hover:bg-gray-100 px-7 py-3 rounded-xl font-semibold transition"
            >
              Richiedi preventivo
            </a>
            <a
              href={`https://wa.me/38991894120?text=${encodeURIComponent('Salve Bruno, vorrei informazioni sui vostri servizi.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white px-7 py-3 rounded-xl font-semibold transition"
            >
              <WhatsAppSvg />
              Scrivi su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Servizi Principali ───────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wide">
              Direttamente da Bruno
            </span>
            <h2 className="text-2xl font-bold text-brand-900 mt-1">Servizi Diretti</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-lg">
              Sgomberi, smaltimenti, traslochi e noleggio scala: lavori gestiti personalmente da Bruno.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
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
        </div>
      </section>

      {/* ── Servizi in Collaborazione ────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
          <div className="mb-2">
            <span className="text-gray-500 font-semibold text-sm uppercase tracking-wide">
              In partnership
            </span>
            <h2 className="text-2xl font-bold text-brand-900 mt-1">Servizi in Collaborazione</h2>
          </div>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">
            Grazie a una rete di professionisti qualificati con cui Bruno ha accordi di collaborazione
            diretti, puoi gestire tutto con un unico interlocutore.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {serviziCollaborazione.map((s) => (
              <ServiceCardExpand
                key={s.id}
                servizio={s}
                isOpen={openCard === s.id}
                onToggle={() => handleToggle(s.id)}
                onRichiediPreventivo={handleRichiediPreventivo}
              />
            ))}
          </div>
          <MediaSlider />
        </div>
      </section>

      {/* ── Timeline: Come Lavoriamo ─────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wide">
              Il nostro metodo
            </span>
            <h2 className="text-3xl font-bold text-brand-900 mt-2 text-balance">
              Dal preventivo al lavoro finito
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Un processo semplice e trasparente — sai sempre a che punto siamo.
            </p>
          </div>

          {/* Timeline — vertical on mobile, horizontal on lg */}
          <div className="relative">
            {/* Horizontal connector (lg+) */}
            <div className="hidden lg:block absolute top-9 left-0 right-0 h-0.5 bg-gray-200 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-4 relative z-10">
              {timeline.map((step, i) => (
                <div key={i} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-3 pb-2 lg:pb-0">
                  {/* Circle column — stretches on mobile to host the connector line */}
                  <div className="flex flex-col items-center self-stretch lg:self-auto shrink-0 lg:w-auto">
                    <div className="w-[72px] h-[72px] rounded-full bg-brand-900 text-white flex items-center justify-center text-2xl font-black border-4 border-white shadow-md shrink-0">
                      {step.n}
                    </div>
                    {/* Vertical connector (mobile only, not on last step) */}
                    {i < timeline.length - 1 && (
                      <div className="lg:hidden flex-1 w-0.5 bg-gray-200 mt-3 mb-1 min-h-[32px]" />
                    )}
                  </div>
                  {/* Text */}
                  <div className="lg:text-center pt-3 lg:pt-0">
                    <p className="font-bold text-brand-900 text-base leading-tight">{step.title}</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recensioni ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-300 font-semibold text-sm uppercase tracking-wide">
              Cosa dicono i clienti
            </span>
            <h2 className="text-3xl font-bold mt-2 text-balance">
              La fiducia che si guadagna giorno per giorno
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recensioni.map((r, i) => (
              <div
                key={i}
                className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10 transition-all"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-200 text-sm leading-relaxed mb-5">"{r.text}"</p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">
                      {r.location} · {r.service}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Preventivo Rapido ────────────────────────────────── */}
      <section id="preventivo-rapido" ref={formRef} className="py-20 px-4 bg-brand-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-700 font-semibold text-sm uppercase tracking-wide">
              Preventivo gratuito
            </span>
            <h2 className="text-3xl font-bold text-brand-900 mt-2 mb-2 text-balance">
              Parlaci della tua esigenza
            </h2>
            <p className="text-gray-600 text-sm">
              Lascia i tuoi dati e il servizio che ti interessa — Bruno ti richiama entro il giorno.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            {formSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-1">Richiesta inviata!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Bruno ti contatterà al numero <strong>{form.telefono}</strong> il prima possibile.
                </p>
                <button
                  onClick={() => { setFormSuccess(false); setForm({ servizio: '', nome: '', telefono: '', note: '' }) }}
                  className="text-sm text-brand-700 hover:text-brand-900 font-semibold underline underline-offset-2 transition"
                >
                  Invia un'altra richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Servizio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servizio di interesse
                  </label>
                  <select
                    value={form.servizio}
                    onChange={(e) => setForm((p) => ({ ...p, servizio: e.target.value }))}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition bg-white text-gray-700"
                  >
                    <option value="">Seleziona un servizio…</option>
                    <optgroup label="Servizi diretti">
                      {serviziPrincipali.map((s) => (
                        <option key={s.id} value={s.id}>{s.nome}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Servizi in collaborazione">
                      {serviziCollaborazione.map((s) => (
                        <option key={s.id} value={s.id}>{s.nome}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Nome + Telefono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.nome}
                      onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                      placeholder="Mario Rossi"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefono <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                      placeholder="+39 333 123 4567"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition"
                    />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note <span className="text-gray-400 font-normal">(opzionale)</span>
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                    rows={3}
                    placeholder="Descrivi brevemente la tua esigenza…"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none transition"
                  />
                </div>

                {formError && <p className="text-red-500 text-sm">{formError}</p>}

                <button
                  type="submit"
                  disabled={formLoading || !form.nome || !form.telefono}
                  className="w-full bg-brand-700 hover:bg-brand-900 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <SpinnerIcon />
                      Invio in corso…
                    </>
                  ) : (
                    'Invia richiesta'
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Preferisci chiamare?{' '}
                  <a href="tel:+38991894120" className="text-brand-700 font-medium hover:underline">
                    +389 918 94 120
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── icon helpers ────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

/* ─── media slider ────────────────────────────────────────────── */
const sliderSlides = [
  {
    type: 'video',
    src: '/videos/video-sgomberi-traslochi.mp4',
    label: 'Sgomberi e Traslochi',
    caption: 'Svuotiamo e traslociamo ogni tipo di spazio, dalle cantine agli appartamenti.',
  },
  {
    type: 'image',
    src: '/images/gallery/furgone-2.jpg',
    label: 'I nostri mezzi',
    caption: 'Flotta di furgoni attrezzati per ogni tipo di intervento sul territorio.',
  },
  {
    type: 'image',
    src: '/images/gallery/furgone-8.jpg',
    label: 'Trasporto professionale',
    caption: 'Carico, trasporto e scarico gestiti con cura e precisione.',
  },
  {
    type: 'image',
    src: '/images/gallery/misc-5.jpg',
    label: 'Interventi sul territorio',
    caption: 'Operiamo a Torino e provincia con rapidità e affidabilità.',
  },
]

function MediaSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const touchStartX = useRef(null)

  const goTo = useCallback(
    (index) => {
      if (transitioning) return
      setTransitioning(true)
      setCurrent(index)
      setTimeout(() => setTransitioning(false), 350)
    },
    [transitioning]
  )

  const prev = useCallback(() => goTo((current - 1 + sliderSlides.length) % sliderSlides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % sliderSlides.length), [current, goTo])

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const slide = sliderSlides[current]

  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <span className="text-gray-500 font-semibold text-sm uppercase tracking-wide">Il nostro lavoro</span>
        <h3 className="text-xl font-bold text-brand-900 mt-1">Vedi i nostri interventi</h3>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden shadow-lg bg-brand-900 select-none"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
          touchStartX.current = null
        }}
      >
        {/* Media */}
        <div
          className="w-full aspect-video transition-opacity duration-300"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          {slide.type === 'video' ? (
            <video
              key={slide.src}
              src={slide.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 pointer-events-none">
          <p className="text-white font-semibold text-sm sm:text-base leading-snug">{slide.label}</p>
          <p className="text-gray-300 text-xs sm:text-sm mt-0.5 hidden sm:block">{slide.caption}</p>
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Slide precedente"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Slide successiva"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide counter */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {current + 1} / {sliderSlides.length}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {sliderSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Vai alla slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-brand-700 w-6 h-2.5'
                : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-4 justify-center">
        {sliderSlides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 ${
              i === current ? 'border-brand-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            {s.type === 'video' ? (
              <div className="w-full h-full bg-brand-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
