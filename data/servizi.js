export const serviziPrincipali = [
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
]

export const serviziCollaborazione = [
  {
    id: 'noleggio-scala',
    nome: 'Noleggio Scala',
    descrizione: 'Noleggio di scale professionali per lavori in quota, in sicurezza.',
    icona: 'ladder',
  },
  {
    id: 'traslochi',
    nome: 'Traslochi',
    descrizione: 'Traslochi di appartamenti, uffici e locali commerciali con cura e puntualità.',
    icona: 'truck',
  },
  {
    id: 'smaltimenti',
    nome: 'Smaltimenti',
    descrizione: 'Smaltimento rifiuti ingombranti, speciali e materiali di risulta nel rispetto delle normative.',
    icona: 'trash',
  },
  {
    id: 'sgomberi',
    nome: 'Sgomberi',
    descrizione: 'Sgombero di appartamenti, uffici, cantine, soffitte e locali di qualsiasi dimensione.',
    icona: 'box',
  },
  {
    id: 'sgombero-cantine',
    nome: 'Sgombero Cantine',
    descrizione: 'Sgombero completo di cantine, soffitte, box e locali di deposito.',
    icona: 'box',
  },
  {
    id: 'decoratore',
    nome: 'Decoratore',
    descrizione: 'Tinteggiatura, verniciatura e decorazione di interni ed esterni.',
    icona: 'paint',
  },

  {
    id: 'elettricista',
    nome: 'Elettricista',
    descrizione: 'Impianti elettrici civili e industriali, messa a norma e riparazioni.',
    icona: 'lightning',
  },
]

export const tuttiServizi = [...serviziPrincipali, ...serviziCollaborazione]
