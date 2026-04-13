import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Bruno Trasporti Torino — Pulizia, cura e affidabilità',
  description:
    'Servizi professionali di pulizia del verde, locali e scale a Torino e provincia. Traslochi, smaltimenti, idraulico, elettricista e molto altro.',
  keywords: 'pulizia torino, pulizia verde, pulizia scale, traslochi torino, smaltimenti torino',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
