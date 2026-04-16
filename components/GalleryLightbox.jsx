'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export default function GalleryLightbox({ items }) {
  const [open, setOpen] = useState(null)
  const touchStartX = useRef(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(() => setOpen((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setOpen((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    if (open === null) return
    function onKey(e) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const item = open !== null ? items[open] : null

  return (
    <>
      {/* Masonry gallery */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mb-12">
        {items.map((it, i) => (
          <div
            key={i}
            onClick={() => setOpen(i)}
            className="break-inside-avoid mb-3 rounded-2xl overflow-hidden group cursor-pointer relative bg-gray-100"
          >
            {it.type === 'photo' ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.src}
                  alt="Lavoro Bruno Trasporti Torino"
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIcon />
                </div>
              </>
            ) : (
              <div className="relative">
                <video
                  src={it.src}
                  className="w-full h-auto block"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && item && (
        <div
          className="fixed inset-0 bg-black/92 z-[200] flex items-center justify-center p-4 sm:p-6"
          onClick={close}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
            touchStartX.current = null
          }}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'photo' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt="Lavoro Bruno Trasporti Torino"
                className="max-w-full max-h-[82vh] rounded-2xl object-contain shadow-2xl"
              />
            ) : (
              <video
                key={item.src}
                src={item.src}
                className="max-w-full max-h-[82vh] rounded-2xl shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            )}

            {/* Close */}
            <button
              onClick={close}
              aria-label="Chiudi"
              className="absolute -top-3 -right-3 sm:top-2 sm:right-2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition shrink-0"
            >
              <XIcon />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Precedente"
              className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition shrink-0"
            >
              <ChevronLeftIcon />
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Successiva"
              className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition shrink-0"
            >
              <ChevronRightIcon />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {open + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ZoomIcon() {
  return (
    <svg className="w-8 h-8 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zM11 8v6M8 11h6" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
