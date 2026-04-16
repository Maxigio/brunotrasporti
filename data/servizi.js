// Servizi eseguiti direttamente da Bruno
export const serviziPrincipali = [
  {
    id: 'sgomberi',
    nome: 'Sgomberi',
    descrizione:
      'Sgombero di appartamenti, uffici, cantine, soffitte e locali di qualsiasi dimensione. Selezione materiale e smaltimento inclusi.',
    icona: 'box',
  },
  {
    id: 'trasporti',
    nome: 'Trasporti',
    descrizione: 'Trasporto di merci, materiali e oggetti ingombranti a Torino e provincia. Servizio rapido e affidabile.',
    icona: 'truck',
  },
  {
    id: 'noleggio-scala',
    nome: 'Noleggio Scala',
    descrizione: 'Noleggio di scale professionali per lavori in quota, in sicurezza.',
    icona: 'ladder',
  },
]

// Servizi erogati tramite professionisti in collaborazione con Bruno
export const serviziCollaborazione = [
  {
    id: 'pulizia-verde',
    nome: 'Pulizia del Verde',
    descrizione:
      'Cura e manutenzione di giardini, aree verdi condominiali, siepi e spazi esterni. Interventi periodici o su richiesta.',
    icona: 'tree',
  },
  {
    id: 'pulizia-locali',
    nome: 'Pulizia Locali',
    descrizione:
      'Pulizie professionali per uffici, negozi, locali commerciali e industriali. Sanificazione e igiene garantita.',
    icona: 'building',
  },
  {
    id: 'pulizia-scale',
    nome: 'Pulizia Scale',
    descrizione:
      'Pulizia periodica di scale condominiali, androni, ascensori e aree comuni. Contratti mensili o settimanali.',
    icona: 'stairs',
  },
  {
    id: 'traslochi',
    nome: 'Traslochi',
    descrizione: 'Traslochi di appartamenti, uffici e locali commerciali con cura e puntualità.',
    icona: 'truck',
  },
  {
    id: 'decoratore',
    nome: 'Decoratore',
    descrizione: 'Tinteggiatura, verniciatura e decorazione di interni ed esterni.',
    icona: 'paint',
  },
  {
    id: 'idraulico',
    nome: 'Idraulico',
    descrizione: 'Interventi idraulici, riparazioni guasti, installazione sanitari e impianti.',
    icona: 'water',
  },
  {
    id: 'elettricista',
    nome: 'Elettricista',
    descrizione: 'Impianti elettrici civili e industriali, messa a norma e riparazioni.',
    icona: 'lightning',
  },
  {
    id: 'acquisto-oggetti-antichi',
    nome: 'Acquisto Oggetti Antichi',
    descrizione: 'Valutazione e acquisto di mobili antichi, oggetti da collezione e arredi vintage.',
    icona: 'gem',
  },
  {
    id: 'muratura-completa',
    nome: 'Muratura Completa',
    descrizione: 'Lavori di muratura, demolizioni, ricostruzioni e rifacimento pareti. Interventi civili e commerciali.',
    icona: 'bricks',
  },
]

export const tuttiServizi = [...serviziPrincipali, ...serviziCollaborazione]
