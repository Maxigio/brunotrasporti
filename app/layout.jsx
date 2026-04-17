import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  metadataBase: new URL('https://brunotrasportitorino.it'),
  title: {
    default: 'Bruno Trasporti Torino — Sgomberi, Pulizie e Traslochi',
    template: '%s | Bruno Trasporti Torino',
  },
  description: 'Sgomberi, traslochi, pulizie e noleggio scala a Torino e provincia. Preventivo gratuito, intervento rapido. Chiama o scrivi su WhatsApp.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://brunotrasportitorino.it',
    siteName: 'Bruno Trasporti Torino',
    title: 'Bruno Trasporti Torino — Sgomberi, Pulizie e Traslochi',
    description: 'Sgomberi, traslochi, pulizie e noleggio scala a Torino e provincia. Preventivo gratuito.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
