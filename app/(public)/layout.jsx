import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bruno Trasporti Torino',
  telephone: '+393899894129',
  url: 'https://brunotrasportitorino.it',
  areaServed: ['Torino', 'Moncalieri', 'Collegno', 'Rivoli', 'Nichelino', 'Settimo Torinese', 'Chieri'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servizi',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sgomberi Torino' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Traslochi Torino' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pulizie Torino' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Noleggio Scala Torino' } },
    ],
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '19:00',
  },
}

export default function PublicLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
