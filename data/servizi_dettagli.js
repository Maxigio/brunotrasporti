// Dati estesi per modal e wizard
export const serviziDettagli = {
  'pulizia-verde': {
    incluso: [
      'Taglio erba e sfalcio prati',
      'Potatura siepi e arbusti',
      'Raccolta foglie e detriti',
      'Pulizia vialetti e bordure',
      'Smaltimento materiale verde',
    ],
    domande: [
      {
        id: 'tipo_spazio',
        label: 'Tipo di spazio',
        tipo: 'scelta',
        opzioni: ['Giardino privato', 'Area condominiale', 'Spazio aziendale', 'Parco/Area pubblica'],
      },
      {
        id: 'dimensione',
        label: 'Dimensione stimata',
        tipo: 'scelta',
        opzioni: ['Meno di 50 mq', '50–200 mq', '200–500 mq', 'Più di 500 mq'],
      },
      {
        id: 'frequenza',
        label: 'Frequenza desiderata',
        tipo: 'scelta',
        opzioni: ['Una tantum', 'Mensile', 'Bi-settimanale', 'Settimanale'],
      },
    ],
  },
  'pulizia-locali': {
    incluso: [
      'Pulizia pavimenti e superfici',
      'Igienizzazione servizi igienici',
      'Pulizia vetri e vetrine',
      'Svuotamento cestini',
      'Sanificazione ambienti',
    ],
    domande: [
      {
        id: 'tipo_locale',
        label: 'Tipo di locale',
        tipo: 'scelta',
        opzioni: ['Ufficio', 'Negozio / Showroom', 'Magazzino', 'Locale ristorazione', 'Altro'],
      },
      {
        id: 'dimensione',
        label: 'Dimensione',
        tipo: 'scelta',
        opzioni: ['Meno di 50 mq', '50–150 mq', '150–500 mq', 'Più di 500 mq'],
      },
      {
        id: 'frequenza',
        label: 'Frequenza',
        tipo: 'scelta',
        opzioni: ['Una tantum', 'Settimanale', 'Bi-settimanale', 'Mensile'],
      },
    ],
  },
  'pulizia-scale': {
    incluso: [
      'Lavaggio gradini e pianerottoli',
      'Pulizia ringhiere e corrimano',
      'Pulizia androni e ingressi',
      'Pulizia vetri interni',
      'Smaltimento rifiuti abbandonati',
    ],
    domande: [
      {
        id: 'piani',
        label: 'Numero di piani',
        tipo: 'scelta',
        opzioni: ['2–3 piani', '4–6 piani', '7–10 piani', 'Più di 10 piani'],
      },
      {
        id: 'frequenza',
        label: 'Frequenza',
        tipo: 'scelta',
        opzioni: ['Settimanale', 'Bi-settimanale', 'Mensile'],
      },
    ],
  },
  'noleggio-scala': {
    incluso: [
      'Scale professionali certificate',
      'Varie altezze disponibili',
      'Consegna e ritiro inclusi',
      'Supporto tecnico',
    ],
    domande: [
      {
        id: 'altezza',
        label: 'Altezza necessaria',
        tipo: 'scelta',
        opzioni: ['Fino a 3 m', '3–6 m', '6–10 m', 'Più di 10 m'],
      },
      {
        id: 'durata',
        label: 'Durata noleggio',
        tipo: 'scelta',
        opzioni: ['Mezza giornata', '1 giorno', '2–3 giorni', 'Più di 3 giorni'],
      },
    ],
  },
  'traslochi': {
    incluso: [
      'Smontaggio e rimontaggio mobili',
      'Imballaggio professionale',
      'Trasporto con mezzo attrezzato',
      'Gestione piani difficili',
      'Assicurazione inclusa',
    ],
    domande: [
      {
        id: 'dimensione_apt',
        label: 'Dimensione abitazione',
        tipo: 'scelta',
        opzioni: ['Monolocale', '2 locali', '3 locali', '4+ locali / Ufficio'],
      },
      {
        id: 'piano_partenza',
        label: 'Piano di partenza',
        tipo: 'scelta',
        opzioni: ['Piano terra', '1°–3°', '4°–6°', '7° o superiore'],
      },
      {
        id: 'ascensore',
        label: 'Ascensore disponibile?',
        tipo: 'scelta',
        opzioni: ['Sì', 'No'],
      },
    ],
  },
  'smaltimenti': {
    incluso: [
      'Ritiro a domicilio',
      'Smaltimento conforme alla normativa',
      'Elettrodomestici e RAEE',
      'Mobili e ingombranti',
      'Materiali edili',
    ],
    domande: [
      {
        id: 'tipo_materiale',
        label: 'Tipo di materiale',
        tipo: 'scelta_multipla',
        opzioni: ['Mobili / Arredi', 'Elettrodomestici', 'Materiali edili', 'Vario / Misto'],
      },
      {
        id: 'quantita',
        label: 'Quantità stimata',
        tipo: 'scelta',
        opzioni: ['Pochi pezzi', 'Un locale', 'Più locali', 'Intero appartamento'],
      },
    ],
  },
  'trasporti': {
    incluso: [
      'Trasporto merci e materiali',
      'Oggetti ingombranti e mobili',
      'Carico e scarico inclusi',
      'Mezzo attrezzato',
      'Copertura Torino e provincia',
    ],
    domande: [
      {
        id: 'tipo_carico',
        label: 'Cosa devi trasportare?',
        tipo: 'scelta',
        opzioni: ['Mobili / Arredi', 'Materiali edili', 'Merci varie', 'Altro'],
      },
      {
        id: 'distanza',
        label: 'Distanza di trasporto',
        tipo: 'scelta',
        opzioni: ['Stesso comune', 'Provincia di Torino', 'Fuori provincia'],
      },
    ],
  },
  'sgomberi': {
    incluso: [
      'Svuotamento completo dello spazio',
      'Selezione materiale recuperabile o da donare',
      'Smaltimento rifiuti ingombranti',
      'Trasporto a discarica autorizzata',
      'Pulizia finale dello spazio',
    ],
    domande: [
      {
        id: 'tipo_spazio',
        label: 'Tipo di spazio da sgomberare',
        tipo: 'scelta',
        opzioni: ['Appartamento', 'Cantina / Soffitta', 'Ufficio / Negozio', 'Box / Garage'],
      },
      {
        id: 'dimensione',
        label: 'Dimensione approssimativa',
        tipo: 'scelta',
        opzioni: ['Piccola (< 30 mq)', 'Media (30–80 mq)', 'Grande (> 80 mq)'],
      },
    ],
  },
  'decoratore': {
    incluso: [
      'Tinteggiatura interni ed esterni',
      'Verniciatura infissi e serramenti',
      'Carta da parati e rivestimenti',
      'Stucco e cartongesso',
      'Sopralluogo gratuito',
    ],
    domande: [
      {
        id: 'tipo_lavoro',
        label: 'Tipo di lavoro',
        tipo: 'scelta',
        opzioni: ['Tinteggiatura interna', 'Tinteggiatura esterna', 'Verniciatura infissi', 'Carta da parati'],
      },
      {
        id: 'dimensione',
        label: 'Superfici da trattare',
        tipo: 'scelta',
        opzioni: ['1 stanza', '2–3 stanze', 'Intero appartamento', 'Facciata esterna'],
      },
    ],
  },
  'idraulico': {
    incluso: [
      'Riparazione perdite e guasti',
      'Installazione sanitari',
      'Impianti idrosanitari',
      'Pronto intervento',
      'Messa a norma impianti',
    ],
    domande: [
      {
        id: 'tipo_intervento',
        label: 'Tipo di intervento',
        tipo: 'scelta',
        opzioni: ['Guasto / Perdita', 'Installazione sanitari', 'Nuovo impianto', 'Manutenzione'],
      },
      {
        id: 'urgenza',
        label: 'Urgenza',
        tipo: 'scelta',
        opzioni: ['Urgente (oggi)', 'Entro 2–3 giorni', 'Programmabile'],
      },
    ],
  },
  'elettricista': {
    incluso: [
      'Impianti civili e industriali',
      'Messa a norma CEI',
      'Installazione quadri elettrici',
      'Certificazione impianti',
      'Pronto intervento',
    ],
    domande: [
      {
        id: 'tipo_intervento',
        label: 'Tipo di intervento',
        tipo: 'scelta',
        opzioni: ['Guasto / Pronto intervento', 'Messa a norma impianto', 'Nuovo impianto', 'Installazione apparecchi'],
      },
      {
        id: 'contesto',
        label: 'Contesto',
        tipo: 'scelta',
        opzioni: ['Appartamento', 'Ufficio / Negozio', 'Condominio', 'Capannone / Industria'],
      },
    ],
  },
  'acquisto-oggetti-antichi': {
    incluso: [
      'Valutazione gratuita a domicilio',
      'Acquisto mobili antichi e d\'epoca',
      'Acquisto oggetti da collezione',
      'Acquisto arredi e complementi vintage',
      'Ritiro diretto a casa tua',
    ],
    domande: [
      {
        id: 'tipo_oggetto',
        label: 'Tipo di oggetto',
        tipo: 'scelta_multipla',
        opzioni: ['Mobili antichi', 'Quadri / Opere d\'arte', 'Oggetti da collezione', 'Argenteria / Porcellane', 'Altro'],
      },
      {
        id: 'quantita',
        label: 'Quantità approssimativa',
        tipo: 'scelta',
        opzioni: ['1–2 pezzi', '3–10 pezzi', 'Più di 10 pezzi', 'Intera abitazione'],
      },
    ],
  },
  'muratura-completa': {
    incluso: [
      'Demolizioni e rimozioni',
      'Costruzione e ricostruzione pareti',
      'Rifacimento intonaci',
      'Posa pavimenti e rivestimenti',
      'Sopralluogo e preventivo gratuiti',
    ],
    domande: [
      {
        id: 'tipo_lavoro',
        label: 'Tipo di lavoro',
        tipo: 'scelta',
        opzioni: ['Demolizione', 'Costruzione pareti', 'Intonacatura', 'Posa pavimenti / rivestimenti'],
      },
      {
        id: 'contesto',
        label: 'Contesto',
        tipo: 'scelta',
        opzioni: ['Appartamento', 'Ufficio / Negozio', 'Esterno / Facciata', 'Altro'],
      },
    ],
  },
}
