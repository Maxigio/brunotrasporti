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
  keywords: [
    'sgomberi Torino', 'sgombero appartamento Torino', 'sgombero cantina Torino', 'sgombero garage Torino',
    'traslochi Torino', 'trasloco economico Torino',
    'pulizie Torino', 'pulizia scale condominio Torino', 'pulizia locali Torino', 'pulizia verde Torino',
    'noleggio scala Torino', 'noleggio scala con operatore Torino',
    'Bruno Trasporti Torino', 'preventivo gratuito Torino',
    'sgomberi provincia Torino', 'Moncalieri', 'Collegno', 'Rivoli', 'Nichelino', 'Settimo Torinese',
  ],
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
