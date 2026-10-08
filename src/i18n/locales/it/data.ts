// Dati del sito (categorie, prodotti, notizie, slide hero, statistiche) in italiano.
// Senza chiave, gli helper di localize.ts restituiscono il testo portoghese originale.
// Gli spazi tra numero e «litri» sono spazi non separabili (\u00a0).

const FRAC_VERTICAL = 'Carta e cartone, Vetro, Imballaggi, Indifferenziato' // REVER ("Embalagens" = imballaggi / plastica e metalli; "Indiferenciados" = indifferenziato / secco residuo)
const FRAC_TWO = 'Carta e cartone, Imballaggi, Indifferenziato, Biorifiuti' // REVER ("Embalagens" = imballaggi / plastica e metalli; "Indiferenciados" = indifferenziato / secco residuo)
const FRAC_FOUR = 'Indifferenziato, Biorifiuti' // REVER ("Indiferenciados" = indifferenziato / secco residuo)

const TWO_DESC = (n: string) =>
  `AMBI TWO ${n} è la soluzione di riferimento per i programmi di raccolta differenziata domiciliare. Si adatta a qualsiasi tipologia di abitazione e di veicolo. Il design robusto e la qualità dei materiali garantiscono una lunga durata anche in condizioni di utilizzo intensivo.`
const TWO_SHORT = (n: string) =>
  `Contenitore da ${n}\u00a0litri per sistemi di raccolta porta a porta. Compatibile con veicoli a carico posteriore.`
const FOUR_DESC = (n: string) =>
  `AMBI FOUR ${n} è un contenitore a carico posteriore di grande capacità del portfolio Ambiconcept. Progettato per condomini, mercati, ristorazione e altri grandi produttori di rifiuti, offre un volume generoso con compatibilità di sollevamento universale.`

const TWO_SPECS = {
  Material: 'PEAD',
  'Sistema de elevação': 'Carico posteriore',
  Frações: FRAC_TWO,
  Personalização: 'Colore, RFID, logo',
}

export default {
  // ---- Categorie ----
  'data.category.carga-traseira.name': 'Carico posteriore',
  'data.category.carga-traseira.description': 'Contenitori di grande capacità per la raccolta con veicoli a carico posteriore.',
  'data.category.carga-vertical.name': 'Carico verticale',
  'data.category.carga-vertical.description': 'Punti di raccolta differenziata di superficie per il conferimento differenziato negli spazi pubblici.',
  'data.category.smart-box.name': 'Smart Box',
  'data.category.smart-box.description': 'Contenitori di superficie e intelligenti per flussi speciali.',
  'data.category.porta-a-porta.name': 'Porta a porta',
  'data.category.porta-a-porta.description': 'Mastelli e contenitori per sistemi di raccolta domiciliare.',
  'data.category.baldes-domesticos.name': 'Bidoncini domestici',
  'data.category.baldes-domesticos.description': 'Bidoncini da cucina e di prossimità per biorifiuti e altri flussi.',
  'data.category.limpeza-urbana.name': 'Igiene urbana',
  'data.category.limpeza-urbana.description': 'Cestini portarifiuti urbani per gli spazi pubblici e le zone balneari.',

  // ---- Prodotti ----
  // AMBI 2.7
  'data.product.ambi-2-7.short_description': 'Contenitore a carico verticale da 2.700\u00a0litri per la raccolta differenziata di\ncarta e cartone, vetro, imballaggi e indifferenziato negli spazi pubblici.', // REVER ("indiferenciados" = indifferenziato)
  'data.product.ambi-2-7.description': 'AMBI 2.7 è la soluzione di riferimento per i punti di raccolta differenziata di superficie in Portogallo. Realizzato in PEAD ad alta resistenza, unisce durabilità urbana ed estetica contemporanea. Disponibile in molteplici frazioni e in colori RAL personalizzati. Compatibile con il ribaltatore per preservare il materiale raccolto.', // REVER (ribaltatore)
  'data.product.ambi-2-7.spec.Capacidade': '2.700\u00a0litri',
  'data.product.ambi-2-7.spec.Material': 'PEAD',
  'data.product.ambi-2-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-7.spec.Personalização': 'Colore RAL, logo, adesivi', // REVER ("adesivagem")

  // AMBI 2.5
  'data.product.ambi-2-5.short_description': 'Contenitore a carico verticale da 2.500\u00a0litri per la raccolta differenziata negli spazi pubblici, ideale per strade più strette o luoghi con minore produzione di rifiuti.',
  'data.product.ambi-2-5.description': 'AMBI 2.5 è un contenitore a carico verticale con capacità di 2.500\u00a0litri, realizzato in PEAD ad alta resistenza. Offre una comprovata durabilità urbana e una compatibilità universale con i ribaltatori a carico verticale, ed è ideale per strade più strette o luoghi con minore produzione di rifiuti. Resiste alle condizioni climatiche avverse e alle sollecitazioni di carico ripetute.', // REVER (ribaltatori)
  'data.product.ambi-2-5.spec.Capacidade': '2.500\u00a0litri',
  'data.product.ambi-2-5.spec.Material': 'PEAD',
  'data.product.ambi-2-5.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-5.spec.Personalização': 'Colore RAL, logo',

  // AMBI TWO
  'data.product.ambi-two-120l.short_description': TWO_SHORT('120'),
  'data.product.ambi-two-120l.description': TWO_DESC('120L'),
  'data.product.ambi-two-120l.spec.Capacidade': '120\u00a0litri',
  'data.product.ambi-two-120l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-120l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-120l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-120l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-140l.short_description': TWO_SHORT('140'),
  'data.product.ambi-two-140l.description': TWO_DESC('140L'),
  'data.product.ambi-two-140l.spec.Capacidade': '140\u00a0litri',
  'data.product.ambi-two-140l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-140l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-140l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-140l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-240l.short_description': TWO_SHORT('240'),
  'data.product.ambi-two-240l.description': TWO_DESC('240L'),
  'data.product.ambi-two-240l.spec.Capacidade': '240\u00a0litri',
  'data.product.ambi-two-240l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-240l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-240l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-240l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-340l.short_description': TWO_SHORT('340'),
  'data.product.ambi-two-340l.description': TWO_DESC('340L'),
  'data.product.ambi-two-340l.spec.Capacidade': '340\u00a0litri',
  'data.product.ambi-two-340l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-340l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-340l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-340l.spec.Personalização': TWO_SPECS.Personalização,

  // AMBI FOUR
  'data.product.ambi-four-800l.short_description': 'Contenitore a carico posteriore da 800\u00a0litri per la raccolta di biorifiuti e altri flussi in luoghi ad alta produzione di rifiuti.',
  'data.product.ambi-four-800l.description': FOUR_DESC('800L'),
  'data.product.ambi-four-800l.spec.Capacidade': '800\u00a0litri',
  'data.product.ambi-four-800l.spec.Material': 'PEAD',
  'data.product.ambi-four-800l.spec.Sistema de elevação': 'Carico posteriore',
  'data.product.ambi-four-800l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-800l.spec.Personalização': 'Colore RAL, RFID',

  'data.product.ambi-four-1100l.short_description': 'Contenitore a carico posteriore da 1.100\u00a0litri per la raccolta di biorifiuti e altri flussi in luoghi ad alta produzione di rifiuti.',
  'data.product.ambi-four-1100l.description': FOUR_DESC('1100L'),
  'data.product.ambi-four-1100l.spec.Capacidade': '1.100\u00a0litri',
  'data.product.ambi-four-1100l.spec.Material': 'PEAD',
  'data.product.ambi-four-1100l.spec.Sistema de elevação': 'Carico posteriore',
  'data.product.ambi-four-1100l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-1100l.spec.Personalização': 'Colore RAL, RFID',

  // AMBI 1.0
  'data.product.ambi-1-0.short_description': 'Smart Box di superficie per la raccolta di biorifiuti e oli alimentari usati. Compatta, sicura e predisposta per gli spazi pubblici.',
  'data.product.ambi-1-0.description': 'AMBI 1.0 è una soluzione intelligente per la raccolta di oli alimentari usati, da installare in superficie. L’apertura controllata impedisce i conferimenti impropri e la struttura in acciaio e PEAD garantisce durabilità e sicurezza. Ideale per condomini, parcheggi e spazi pubblici.',
  'data.product.ambi-1-0.spec.Capacidade': '1.000\u00a0litri',
  'data.product.ambi-1-0.spec.Material': 'Acciaio + PEAD',
  'data.product.ambi-1-0.spec.Instalação': 'In superficie',
  'data.product.ambi-1-0.spec.Acesso': 'Apertura controllata',
  'data.product.ambi-1-0.spec.Fluxo': 'Oli alimentari usati',

  // AMBI URBAN
  'data.product.ambi-urban.short_description': 'Attrezzatura per l’igiene urbana per spazi pubblici ad alta frequentazione. Design integrato che rispetta l’ambiente urbano.',
  'data.product.ambi-urban.description': 'AMBI URBAN è stato progettato per integrarsi armoniosamente nell’arredo urbano di città esigenti. Con una struttura robusta in acciaio verniciato e un contenitore interno estraibile, facilita la pulizia e la manutenzione. Disponibile con fissaggio a palo, a parete o a terra.',
  'data.product.ambi-urban.spec.Capacidade': '80\u00a0litri',
  'data.product.ambi-urban.spec.Material': 'Acciaio verniciato',
  'data.product.ambi-urban.spec.Fixação': 'Palo / Parete / Terra',
  'data.product.ambi-urban.spec.Interior amovível': 'Sì',
  'data.product.ambi-urban.spec.Personalização': 'Colore RAL, logo',

  // AMBI BEACH
  'data.product.ambi-beach.short_description': 'Attrezzatura per l’igiene urbana per le zone balneari — resistente alla corrosione salina, progettata per ambienti costieri impegnativi.',
  'data.product.ambi-beach.description': 'AMBI BEACH è la versione costiera di AMBI URBAN, l’attrezzatura per l’igiene urbana di Ambiconcept. Il trattamento anticorrosione speciale e i materiali selezionati garantiscono durabilità in ambienti salini. Il design consente uno svuotamento e una pulizia agevoli da parte degli operatori dell’igiene urbana.',
  'data.product.ambi-beach.spec.Capacidade': '80\u00a0litri',
  'data.product.ambi-beach.spec.Material': 'Acciaio inox / PEAD',
  'data.product.ambi-beach.spec.Ambiente': 'Costiero / Balneare',
  'data.product.ambi-beach.spec.Tratamento': 'Anticorrosione per ambienti salini', // REVER ("Anticorrosão salino")
  'data.product.ambi-beach.spec.Fixação': 'Terra',

  // AMBI 3.7
  'data.product.ambi-3-7.short_description': 'Contenitore a carico verticale da 3.700\u00a0litri per la raccolta differenziata negli spazi pubblici, ideale per luoghi ad alta produzione di rifiuti.',
  'data.product.ambi-3-7.description': 'AMBI 3.7 è un contenitore a carico verticale con capacità di 3.700\u00a0litri, realizzato in PEAD ad alta resistenza. Offre una comprovata durabilità urbana e una compatibilità universale con i ribaltatori a carico verticale; è il modello di maggiore capacità della gamma, ideale per luoghi ad alta produzione di rifiuti. Resiste alle condizioni climatiche avverse e alle sollecitazioni di carico ripetute.', // REVER (ribaltatori)
  'data.product.ambi-3-7.spec.Capacidade': '3.700\u00a0litri',
  'data.product.ambi-3-7.spec.Material': 'PEAD',
  'data.product.ambi-3-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-3-7.spec.Personalização': 'Colore RAL, logo, adesivi', // REVER ("adesivagem")

  // LOCKEY
  'data.product.lockey-5l.short_description': 'Bidoncino domestico con chiusura di sicurezza per biorifiuti — capacità di 5\u00a0litri, ideale per la cucina e i punti di prossimità.',
  'data.product.lockey-5l.description': 'LOCKEY 5L è la versione compatta del sistema Lockey, sviluppata per l’uso domestico e per i punti di prossimità nei condomini. Il sistema di chiusura integrato impedisce i conferimenti impropri e riduce la contaminazione della frazione di biorifiuti, mantenendo la praticità di un bidoncino da cucina.',
  'data.product.lockey-5l.spec.Capacidade': '5\u00a0litri',
  'data.product.lockey-5l.spec.Material': 'PEAD',
  'data.product.lockey-5l.spec.Sistema de fecho': 'Chiave personalizzata',
  'data.product.lockey-5l.spec.Frações': 'Biorifiuti',
  'data.product.lockey-5l.spec.Personalização': 'Colore, logo',

  'data.product.lockey-7l.short_description': 'Bidoncino domestico con chiusura di sicurezza per biorifiuti — capacità di 7\u00a0litri, ideale per la cucina e i punti di prossimità.',
  'data.product.lockey-7l.description': 'LOCKEY 7L è la versione di maggiore capacità del sistema Lockey, sviluppata per l’uso domestico e per i punti di prossimità nei condomini. Il sistema di chiusura integrato impedisce i conferimenti impropri e riduce la contaminazione della frazione di biorifiuti, mantenendo la praticità di un bidoncino da cucina.',
  'data.product.lockey-7l.spec.Capacidade': '7\u00a0litri',
  'data.product.lockey-7l.spec.Material': 'PEAD',
  'data.product.lockey-7l.spec.Sistema de fecho': 'Chiave personalizzata',
  'data.product.lockey-7l.spec.Frações': 'Biorifiuti',
  'data.product.lockey-7l.spec.Personalização': 'Colore, logo',

  // ---- Notizie ----
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.title': 'Trasformare i rifiuti in valore: il ciclo virtuoso',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.excerpt': 'Scopra come la valorizzazione dei rifiuti può trasformare ciò che veniva scartato in risorse preziose, favorendo l’economia circolare e riducendo l’impatto ambientale.',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.content': 'La valorizzazione dei rifiuti è uno dei pilastri dell’economia circolare. Trasformare ciò che un tempo era considerato spazzatura in materia prima secondaria...',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.category': 'Sostenibilità',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.title': 'Economia circolare: chiudere il ciclo dei materiali',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.excerpt': 'Scopra come l’economia circolare propone un modello di produzione e consumo che mantiene i materiali in uso il più a lungo possibile, riducendo i rifiuti e l’impatto ambientale.',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.content': 'L’economia circolare è un modello sistemico di produzione e consumo che implica condividere, riparare, riutilizzare, rinnovare e riciclare i materiali e i prodotti esistenti il più a lungo possibile. In questo modo il ciclo di vita dei prodotti viene prolungato, mentre i rifiuti sono ridotti al minimo...',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.category': 'Economia circolare',

  // ---- Slide hero ----
  'data.hero.slide-1.title': 'L’infrastruttura per la raccolta differenziata che la Sua città merita.',
  'data.hero.slide-1.subtitle': 'Attrezzature per comuni e operatori RSU. Contenitori a carico posteriore, a carico verticale, porta a porta e per l’igiene urbana. Progettati per resistere alle intemperie in ambiente urbano.',
  'data.hero.slide-1.cta_label': 'Vedi soluzioni',

  // ---- Statistiche ----
  'data.stat.containers_installed.label': 'Contenitori installati',
  'data.stat.municipalities_count.label': 'Comuni aderenti',
} as Record<string, string>
