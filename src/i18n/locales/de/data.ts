// Website-Daten (Kategorien, Produkte, News, Slides, Kennzahlen) auf Deutsch.
// Ohne Schlüssel liefern die Helfer in localize.ts den portugiesischen Originaltext.
// Die Leerzeichen zwischen Zahl und «Liter» sind geschützte Leerzeichen (\u00a0).

const FRAC_VERTICAL = 'Papier & Karton, Glas, Verpackungen, Restabfall' // REVER ("Indiferenciados" = Restabfall)
const FRAC_TWO = 'Papier & Karton, Verpackungen, Restabfall, Bioabfälle' // REVER ("Indiferenciados" = Restabfall)
const FRAC_FOUR = 'Restabfall, Bioabfälle' // REVER ("Indiferenciados" = Restabfall)

const TWO_DESC = (n: string) =>
  `Der AMBI TWO ${n} ist die Referenzlösung für Programme zur Getrenntsammlung bei Haushalten. Er eignet sich für jede Wohnform und jedes Sammelfahrzeug. Das robuste Design und die hochwertigen Materialien gewährleisten eine lange Lebensdauer, selbst bei intensiver Nutzung.`
const TWO_SHORT = (n: string) =>
  `Container mit ${n}\u00a0Litern für Haus-zu-Haus-Sammelsysteme. Kompatibel mit Hecklader-Fahrzeugen.`
const FOUR_DESC = (n: string) =>
  `Der AMBI FOUR ${n} ist ein Container mit großem Fassungsvermögen für die Heckbeladung aus dem Ambiconcept-Portfolio. Entwickelt für Wohnanlagen, Märkte, Gastronomie und andere Großerzeuger, bietet er ein großzügiges Volumen bei universeller Hebekompatibilität.` // REVER (compatibilidade universal de elevação)

const TWO_SPECS = {
  Material: 'PE-HD',
  'Sistema de elevação': 'Heckbeladung',
  Frações: FRAC_TWO,
  Personalização: 'Farbe, RFID, Logo',
}

export default {
  // ---- Kategorien ----
  'data.category.carga-traseira.name': 'Heckbeladung',
  'data.category.carga-traseira.description': 'Container mit großem Fassungsvermögen für die Sammlung mit Hecklader-Fahrzeugen.',
  'data.category.carga-vertical.name': 'Vertikalbefüllung',
  'data.category.carga-vertical.description': 'Oberirdische Wertstoffsammelstellen für den getrennten Einwurf im öffentlichen Raum.',
  'data.category.smart-box.name': 'Smart Box',
  'data.category.smart-box.description': 'Oberirdische und intelligente Container für besondere Abfallströme.',
  'data.category.porta-a-porta.name': 'Haus-zu-Haus-Sammlung',
  'data.category.porta-a-porta.description': 'Eimer und Container für Sammelsysteme in Privathaushalten.',
  'data.category.baldes-domesticos.name': 'Haushaltseimer',
  'data.category.baldes-domesticos.description': 'Eimer für die Küche und für wohnungsnahe Sammelstellen für Bioabfälle und andere Abfallströme.',
  'data.category.limpeza-urbana.name': 'Stadtreinigung',
  'data.category.limpeza-urbana.description': 'Abfalleimer für den öffentlichen Raum und Strandbereiche.',

  // ---- Produkte ----
  // AMBI 2.7
  'data.product.ambi-2-7.short_description': 'Container für Vertikalbefüllung mit 2.700\u00a0Litern für die Getrenntsammlung von\nPapier & Karton, Glas, Verpackungen und Restabfall im öffentlichen Raum.', // REVER ("indiferenciados" = Restabfall)
  'data.product.ambi-2-7.description': 'Der AMBI 2.7 ist die Referenzlösung für oberirdische Wertstoffsammelstellen in Portugal. Gefertigt aus hochfestem PE-HD, verbindet er urbane Langlebigkeit mit zeitgemäßer Ästhetik. Erhältlich für mehrere Fraktionen und in individuellen RAL-Farben. Kompatibel mit einer Kippvorrichtung, um das gesammelte Material zu schonen.', // REVER (volteador)
  'data.product.ambi-2-7.spec.Capacidade': '2.700\u00a0Liter',
  'data.product.ambi-2-7.spec.Material': 'PE-HD',
  'data.product.ambi-2-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-7.spec.Personalização': 'RAL-Farbe, Logo, Beklebung', // REVER ("adesivagem")

  // AMBI 2.5
  'data.product.ambi-2-5.short_description': 'Container für Vertikalbefüllung mit 2.500\u00a0Litern für die Getrenntsammlung im öffentlichen Raum, ideal für engere Straßen oder Standorte mit geringerem Abfallaufkommen.',
  'data.product.ambi-2-5.description': 'Der AMBI 2.5 ist ein Container für Vertikalbefüllung mit einem Fassungsvermögen von 2.500\u00a0Litern, gefertigt aus hochfestem PE-HD. Er bietet bewährte urbane Langlebigkeit und universelle Kompatibilität mit Kippvorrichtungen für Vertikalbefüllung und eignet sich damit ideal für engere Straßen oder Standorte mit geringerem Abfallaufkommen. Er hält widrigen Witterungsbedingungen und wiederholter Belastung stand.',
  'data.product.ambi-2-5.spec.Capacidade': '2.500\u00a0Liter',
  'data.product.ambi-2-5.spec.Material': 'PE-HD',
  'data.product.ambi-2-5.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-5.spec.Personalização': 'RAL-Farbe, Logo',

  // AMBI TWO
  'data.product.ambi-two-120l.short_description': TWO_SHORT('120'),
  'data.product.ambi-two-120l.description': TWO_DESC('120L'),
  'data.product.ambi-two-120l.spec.Capacidade': '120\u00a0Liter',
  'data.product.ambi-two-120l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-120l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-120l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-120l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-140l.short_description': TWO_SHORT('140'),
  'data.product.ambi-two-140l.description': TWO_DESC('140L'),
  'data.product.ambi-two-140l.spec.Capacidade': '140\u00a0Liter',
  'data.product.ambi-two-140l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-140l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-140l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-140l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-240l.short_description': TWO_SHORT('240'),
  'data.product.ambi-two-240l.description': TWO_DESC('240L'),
  'data.product.ambi-two-240l.spec.Capacidade': '240\u00a0Liter',
  'data.product.ambi-two-240l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-240l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-240l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-240l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-340l.short_description': TWO_SHORT('340'),
  'data.product.ambi-two-340l.description': TWO_DESC('340L'),
  'data.product.ambi-two-340l.spec.Capacidade': '340\u00a0Liter',
  'data.product.ambi-two-340l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-340l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-340l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-340l.spec.Personalização': TWO_SPECS.Personalização,

  // AMBI FOUR
  'data.product.ambi-four-800l.short_description': 'Container für Heckbeladung mit 800\u00a0Litern für die Sammlung von Bioabfällen und anderen Abfallströmen an Standorten mit hohem Aufkommen.',
  'data.product.ambi-four-800l.description': FOUR_DESC('800L'),
  'data.product.ambi-four-800l.spec.Capacidade': '800\u00a0Liter',
  'data.product.ambi-four-800l.spec.Material': 'PE-HD',
  'data.product.ambi-four-800l.spec.Sistema de elevação': 'Heckbeladung',
  'data.product.ambi-four-800l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-800l.spec.Personalização': 'RAL-Farbe, RFID',

  'data.product.ambi-four-1100l.short_description': 'Container für Heckbeladung mit 1.100\u00a0Litern für die Sammlung von Bioabfällen und anderen Abfallströmen an Standorten mit hohem Aufkommen.',
  'data.product.ambi-four-1100l.description': FOUR_DESC('1100L'),
  'data.product.ambi-four-1100l.spec.Capacidade': '1.100\u00a0Liter',
  'data.product.ambi-four-1100l.spec.Material': 'PE-HD',
  'data.product.ambi-four-1100l.spec.Sistema de elevação': 'Heckbeladung',
  'data.product.ambi-four-1100l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-1100l.spec.Personalização': 'RAL-Farbe, RFID',

  // AMBI 1.0
  'data.product.ambi-1-0.short_description': 'Oberirdische Smart Box für die Sammlung von Bioabfällen und Altspeiseölen. Kompakt, sicher und für den öffentlichen Raum ausgelegt.',
  'data.product.ambi-1-0.description': 'Der AMBI 1.0 ist eine intelligente Lösung zur Sammlung von Altspeiseölen für die oberirdische Aufstellung. Die kontrollierte Öffnung verhindert unerlaubte Einwürfe, und die Konstruktion aus Stahl und PE-HD gewährleistet Langlebigkeit und Sicherheit. Ideal für Wohnanlagen, Parkplätze und den öffentlichen Raum.',
  'data.product.ambi-1-0.spec.Capacidade': '1.000\u00a0Liter',
  'data.product.ambi-1-0.spec.Material': 'Stahl + PE-HD',
  'data.product.ambi-1-0.spec.Instalação': 'Oberirdisch',
  'data.product.ambi-1-0.spec.Acesso': 'Kontrollierte Öffnung',
  'data.product.ambi-1-0.spec.Fluxo': 'Altspeiseöle',

  // AMBI URBAN
  'data.product.ambi-urban.short_description': 'Ausstattung für die Stadtreinigung in stark frequentierten öffentlichen Räumen. Integriertes Design, das die urbane Umgebung respektiert.',
  'data.product.ambi-urban.description': 'Der AMBI URBAN wurde so konzipiert, dass er sich harmonisch in das Stadtmobiliar anspruchsvoller Städte einfügt. Mit einer robusten Konstruktion aus lackiertem Stahl und einem herausnehmbaren Innenbehälter erleichtert er Reinigung und Wartung. Erhältlich mit Befestigung an Pfosten, Wand oder Boden.',
  'data.product.ambi-urban.spec.Capacidade': '80\u00a0Liter',
  'data.product.ambi-urban.spec.Material': 'Lackierter Stahl',
  'data.product.ambi-urban.spec.Fixação': 'Pfosten / Wand / Boden',
  'data.product.ambi-urban.spec.Interior amovível': 'Ja',
  'data.product.ambi-urban.spec.Personalização': 'RAL-Farbe, Logo',

  // AMBI BEACH
  'data.product.ambi-beach.short_description': 'Ausstattung für die Stadtreinigung in Strandbereichen — beständig gegen Salzkorrosion, ausgelegt für anspruchsvolle Küstenumgebungen.',
  'data.product.ambi-beach.description': 'Der AMBI BEACH ist die Küstenversion des AMBI URBAN, der Ausstattung für die Stadtreinigung von Ambiconcept. Die spezielle Korrosionsschutzbehandlung und die ausgewählten Materialien gewährleisten Langlebigkeit in salzhaltiger Umgebung. Das Design ermöglicht dem Stadtreinigungsteam eine einfache Leerung und Reinigung.',
  'data.product.ambi-beach.spec.Capacidade': '80\u00a0Liter',
  'data.product.ambi-beach.spec.Material': 'Edelstahl / PE-HD',
  'data.product.ambi-beach.spec.Ambiente': 'Küste / Strand',
  'data.product.ambi-beach.spec.Tratamento': 'Korrosionsschutz für salzhaltige Umgebungen', // REVER ("Anticorrosão salino")
  'data.product.ambi-beach.spec.Fixação': 'Boden',

  // AMBI 3.7
  'data.product.ambi-3-7.short_description': 'Container für Vertikalbefüllung mit 3.700\u00a0Litern für die Getrenntsammlung im öffentlichen Raum, ideal für Standorte mit hohem Abfallaufkommen.',
  'data.product.ambi-3-7.description': 'Der AMBI 3.7 ist ein Container für Vertikalbefüllung mit einem Fassungsvermögen von 3.700\u00a0Litern, gefertigt aus hochfestem PE-HD. Er bietet bewährte urbane Langlebigkeit und universelle Kompatibilität mit Kippvorrichtungen für Vertikalbefüllung. Als Modell mit dem größten Fassungsvermögen der Produktreihe ist er ideal für Standorte mit hohem Abfallaufkommen. Er hält widrigen Witterungsbedingungen und wiederholter Belastung stand.',
  'data.product.ambi-3-7.spec.Capacidade': '3.700\u00a0Liter',
  'data.product.ambi-3-7.spec.Material': 'PE-HD',
  'data.product.ambi-3-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-3-7.spec.Personalização': 'RAL-Farbe, Logo, Beklebung', // REVER ("adesivagem")

  // LOCKEY
  'data.product.lockey-5l.short_description': 'Haushaltseimer mit Sicherheitsverschluss für Bioabfälle — Fassungsvermögen 5\u00a0Liter, ideal für die Küche und wohnungsnahe Sammelstellen.',
  'data.product.lockey-5l.description': 'Der LOCKEY 5L ist die kompakte Version des Lockey-Systems, entwickelt für den Haushaltsgebrauch und für wohnungsnahe Sammelstellen in Wohnanlagen. Das integrierte Verschlusssystem verhindert unerlaubte Einwürfe und verringert die Verunreinigung der Bioabfallfraktion, ohne die Praktikabilität eines Küchenabfalleimers einzubüßen.',
  'data.product.lockey-5l.spec.Capacidade': '5\u00a0Liter',
  'data.product.lockey-5l.spec.Material': 'PE-HD',
  'data.product.lockey-5l.spec.Sistema de fecho': 'Individueller Schlüssel',
  'data.product.lockey-5l.spec.Frações': 'Bioabfälle',
  'data.product.lockey-5l.spec.Personalização': 'Farbe, Logo',

  'data.product.lockey-7l.short_description': 'Haushaltseimer mit Sicherheitsverschluss für Bioabfälle — Fassungsvermögen 7\u00a0Liter, ideal für die Küche und wohnungsnahe Sammelstellen.',
  'data.product.lockey-7l.description': 'Der LOCKEY 7L ist die Version des Lockey-Systems mit größerem Fassungsvermögen, entwickelt für den Haushaltsgebrauch und für wohnungsnahe Sammelstellen in Wohnanlagen. Das integrierte Verschlusssystem verhindert unerlaubte Einwürfe und verringert die Verunreinigung der Bioabfallfraktion, ohne die Praktikabilität eines Küchenabfalleimers einzubüßen.',
  'data.product.lockey-7l.spec.Capacidade': '7\u00a0Liter',
  'data.product.lockey-7l.spec.Material': 'PE-HD',
  'data.product.lockey-7l.spec.Sistema de fecho': 'Individueller Schlüssel',
  'data.product.lockey-7l.spec.Frações': 'Bioabfälle',
  'data.product.lockey-7l.spec.Personalização': 'Farbe, Logo',

  // ---- News ----
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.title': 'Abfall in Wert verwandeln: der positive Kreislauf',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.excerpt': 'Erfahren Sie, wie die Verwertung von Abfällen das, was früher entsorgt wurde, in wertvolle Ressourcen verwandeln kann, die Kreislaufwirtschaft vorantreibt und die Umweltbelastung verringert.',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.content': 'Die Verwertung von Abfällen ist eine der Säulen der Kreislaufwirtschaft. Das, was früher als Müll galt, in Sekundärrohstoffe zu verwandeln...',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.category': 'Nachhaltigkeit',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.title': 'Kreislaufwirtschaft: den Materialkreislauf schließen',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.excerpt': 'Erfahren Sie, wie die Kreislaufwirtschaft ein Produktions- und Konsummodell vorschlägt, das Materialien so lange wie möglich im Einsatz hält und dadurch Abfälle und Umweltbelastung verringert.',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.content': 'Die Kreislaufwirtschaft ist ein systemisches Produktions- und Konsummodell, bei dem bestehende Materialien und Produkte so lange wie möglich geteilt, repariert, wiederverwendet, aufgearbeitet und recycelt werden. Auf diese Weise wird der Lebenszyklus der Produkte verlängert, während Abfälle auf ein Minimum reduziert werden...',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.category': 'Kreislaufwirtschaft',

  // ---- Hero-Slides ----
  'data.hero.slide-1.title': 'Die Infrastruktur für die Getrenntsammlung, die Ihre Stadt verdient.',
  'data.hero.slide-1.subtitle': 'Ausrüstung für Gemeinden und Betreiber der Abfallentsorgung. Container für Heckbeladung, Vertikalbefüllung, Haus-zu-Haus-Sammlung und Stadtreinigung. Entwickelt, um Wind und Wetter im Stadtraum standzuhalten.',
  'data.hero.slide-1.cta_label': 'Lösungen ansehen',

  // ---- Kennzahlen ----
  'data.stat.containers_installed.label': 'Installierte Container',
  'data.stat.municipalities_count.label': 'Angeschlossene Gemeinden',
} as Record<string, string>
