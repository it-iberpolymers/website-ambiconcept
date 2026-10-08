// Dados do site (categorias, produtos, notícias, slides, estatísticas) em inglês.
// Só existe en/fr: sem chave, os helpers de localize.ts devolvem o texto português original.

const FRAC_VERTICAL = 'Paper & Cardboard, Glass, Packaging, Residual waste' // REVER ("Indiferenciados")
const FRAC_TWO = 'Paper & Cardboard, Packaging, Residual waste, Biowaste' // REVER ("Indiferenciados")
const FRAC_FOUR = 'Residual waste, Biowaste' // REVER ("Indiferenciados")

const TWO_DESC = (n: string) =>
  `The AMBI TWO ${n} is the reference solution for household separate collection programmes. It adapts to any type of housing and vehicle. The robust design and the quality of the materials ensure a long service life, even under intensive use.`
const TWO_SHORT = (n: string) =>
  `${n} Litre container for door-to-door collection systems. Compatible with rear-loading vehicles.`
const FOUR_DESC = (n: string) =>
  `The AMBI FOUR ${n} is a large-capacity rear-loading container from the Ambiconcept portfolio. Designed for apartment blocks, markets, catering and other high-volume producers, it offers generous volume with universal lifting compatibility.`

const TWO_SPECS = {
  Material: 'HDPE',
  'Sistema de elevação': 'Rear loading',
  Frações: FRAC_TWO,
  Personalização: 'Colour, RFID, logo',
}

export default {
  // ---- Categorias ----
  'data.category.carga-traseira.name': 'Rear Loading',
  'data.category.carga-traseira.description': 'Large-capacity containers for collection by rear-loading vehicles.',
  'data.category.carga-vertical.name': 'Vertical Loading',
  'data.category.carga-vertical.description': 'Surface-level recycling points for separate collection in public spaces.',
  'data.category.smart-box.name': 'Smart Box',
  'data.category.smart-box.description': 'Surface-level and smart containers for special waste streams.',
  'data.category.porta-a-porta.name': 'Door-to-door',
  'data.category.porta-a-porta.description': 'Bins and containers for household collection systems.',
  'data.category.baldes-domesticos.name': 'Household Bins',
  'data.category.baldes-domesticos.description': 'Kitchen and local drop-off bins for biowaste and other streams.',
  'data.category.limpeza-urbana.name': 'Urban Cleaning',
  'data.category.limpeza-urbana.description': 'Urban litter bins for public spaces and beach areas.',

  // ---- Produtos ----
  // AMBI 2.7
  'data.product.ambi-2-7.short_description': 'Vertical-loading container of 2,700 Litres for separate collection of\npaper & cardboard, glass, packaging and residual waste in public spaces.', // REVER ("indiferenciados")
  'data.product.ambi-2-7.description': 'The AMBI 2.7 is the reference solution for surface-level recycling points in Portugal. Made from high-strength HDPE, it combines urban durability with contemporary aesthetics. Available for multiple waste streams and in custom RAL colours. Compatible with a tipping lift to preserve the collected material.',
  'data.product.ambi-2-7.spec.Capacidade': '2,700 Litres',
  'data.product.ambi-2-7.spec.Material': 'HDPE',
  'data.product.ambi-2-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-7.spec.Personalização': 'RAL colour, logo, decals', // REVER ("adesivagem")

  // AMBI 2.5
  'data.product.ambi-2-5.short_description': 'Vertical-loading container of 2,500 Litres for separate collection in public spaces, ideal for narrower streets or locations with lower waste generation.',
  'data.product.ambi-2-5.description': 'The AMBI 2.5 is a vertical-loading container with a capacity of 2,500 Litres, made from high-strength HDPE. It offers proven urban durability and universal compatibility with vertical-loading tipping lifts, making it ideal for narrower streets or locations with lower waste generation. It withstands adverse weather conditions and repeated loading stress.',
  'data.product.ambi-2-5.spec.Capacidade': '2,500 Litres',
  'data.product.ambi-2-5.spec.Material': 'HDPE',
  'data.product.ambi-2-5.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-5.spec.Personalização': 'RAL colour, logo',

  // AMBI TWO
  'data.product.ambi-two-120l.short_description': TWO_SHORT('120'),
  'data.product.ambi-two-120l.description': TWO_DESC('120L'),
  'data.product.ambi-two-120l.spec.Capacidade': '120 Litres',
  'data.product.ambi-two-120l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-120l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-120l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-120l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-140l.short_description': TWO_SHORT('140'),
  'data.product.ambi-two-140l.description': TWO_DESC('140L'),
  'data.product.ambi-two-140l.spec.Capacidade': '140 Litres',
  'data.product.ambi-two-140l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-140l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-140l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-140l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-240l.short_description': TWO_SHORT('240'),
  'data.product.ambi-two-240l.description': TWO_DESC('240L'),
  'data.product.ambi-two-240l.spec.Capacidade': '240 Litres',
  'data.product.ambi-two-240l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-240l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-240l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-240l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-340l.short_description': TWO_SHORT('340'),
  'data.product.ambi-two-340l.description': TWO_DESC('340L'),
  'data.product.ambi-two-340l.spec.Capacidade': '340 Litres',
  'data.product.ambi-two-340l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-340l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-340l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-340l.spec.Personalização': TWO_SPECS.Personalização,

  // AMBI FOUR
  'data.product.ambi-four-800l.short_description': 'Rear-loading container of 800 Litres for the collection of biowaste and other streams in high-volume locations.',
  'data.product.ambi-four-800l.description': FOUR_DESC('800L'),
  'data.product.ambi-four-800l.spec.Capacidade': '800 Litres',
  'data.product.ambi-four-800l.spec.Material': 'HDPE',
  'data.product.ambi-four-800l.spec.Sistema de elevação': 'Rear loading',
  'data.product.ambi-four-800l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-800l.spec.Personalização': 'RAL colour, RFID',

  'data.product.ambi-four-1100l.short_description': 'Rear-loading container of 1,100 Litres for the collection of biowaste and other streams in high-volume locations.',
  'data.product.ambi-four-1100l.description': FOUR_DESC('1100L'),
  'data.product.ambi-four-1100l.spec.Capacidade': '1,100 Litres',
  'data.product.ambi-four-1100l.spec.Material': 'HDPE',
  'data.product.ambi-four-1100l.spec.Sistema de elevação': 'Rear loading',
  'data.product.ambi-four-1100l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-1100l.spec.Personalização': 'RAL colour, RFID',

  // AMBI 1.0
  'data.product.ambi-1-0.short_description': 'Surface-level Smart Box for the collection of biowaste and used cooking oil. Compact, secure and ready for public spaces.',
  'data.product.ambi-1-0.description': 'The AMBI 1.0 is a smart solution for collecting used cooking oil, designed for surface installation. The controlled opening prevents improper deposits, and the steel and HDPE structure ensures durability and safety. Ideal for apartment blocks, car parks and public spaces.',
  'data.product.ambi-1-0.spec.Capacidade': '1,000 Litres',
  'data.product.ambi-1-0.spec.Material': 'Steel + HDPE',
  'data.product.ambi-1-0.spec.Instalação': 'Surface',
  'data.product.ambi-1-0.spec.Acesso': 'Controlled opening',
  'data.product.ambi-1-0.spec.Fluxo': 'Used Cooking Oil',

  // AMBI URBAN
  'data.product.ambi-urban.short_description': 'Urban cleaning equipment for high-traffic public spaces. Integrated design that respects the urban environment.',
  'data.product.ambi-urban.description': 'The AMBI URBAN was designed to blend harmoniously into the street furniture of demanding cities. With a robust painted steel structure and a removable inner bin, it makes cleaning and maintenance easier. Available with pole, wall or ground mounting.',
  'data.product.ambi-urban.spec.Capacidade': '80 Litres',
  'data.product.ambi-urban.spec.Material': 'Painted steel',
  'data.product.ambi-urban.spec.Fixação': 'Pole / Wall / Ground',
  'data.product.ambi-urban.spec.Interior amovível': 'Yes',
  'data.product.ambi-urban.spec.Personalização': 'RAL colour, logo',

  // AMBI BEACH
  'data.product.ambi-beach.short_description': 'Urban cleaning equipment for beach areas — resistant to salt corrosion, designed for demanding coastal environments.',
  'data.product.ambi-beach.description': 'The AMBI BEACH is the coastal version of the AMBI URBAN, Ambiconcept’s urban cleaning equipment. The special anti-corrosion treatment and carefully selected materials ensure durability in salt-laden environments. The design allows easy emptying and cleaning by the urban cleaning team.',
  'data.product.ambi-beach.spec.Capacidade': '80 Litres',
  'data.product.ambi-beach.spec.Material': 'Stainless steel / HDPE',
  'data.product.ambi-beach.spec.Ambiente': 'Coastal / Beach',
  'data.product.ambi-beach.spec.Tratamento': 'Salt-water anti-corrosion', // REVER ("Anticorrosão salino")
  'data.product.ambi-beach.spec.Fixação': 'Ground',

  // AMBI 3.7
  'data.product.ambi-3-7.short_description': 'Vertical-loading container of 3,700 Litres for separate collection in public spaces, ideal for locations with high waste generation.',
  'data.product.ambi-3-7.description': 'The AMBI 3.7 is a vertical-loading container with a capacity of 3,700 Litres, made from high-strength HDPE. It offers proven urban durability and universal compatibility with vertical-loading tipping lifts, and is the highest-capacity model in the range, ideal for locations with high waste generation. It withstands adverse weather conditions and repeated loading stress.',
  'data.product.ambi-3-7.spec.Capacidade': '3,700 Litres',
  'data.product.ambi-3-7.spec.Material': 'HDPE',
  'data.product.ambi-3-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-3-7.spec.Personalização': 'RAL colour, logo, decals', // REVER ("adesivagem")

  // LOCKEY
  'data.product.lockey-5l.short_description': 'Household bin with a security lock for biowaste — 5 Litre capacity, ideal for kitchens and local drop-off points.',
  'data.product.lockey-5l.description': 'The LOCKEY 5L is the compact version of the Lockey system, developed for household use and local drop-off points in apartment blocks. The integrated locking system prevents improper deposits and reduces contamination of the biowaste stream, while keeping the practicality of a kitchen bin.',
  'data.product.lockey-5l.spec.Capacidade': '5 Litres',
  'data.product.lockey-5l.spec.Material': 'HDPE',
  'data.product.lockey-5l.spec.Sistema de fecho': 'Custom key',
  'data.product.lockey-5l.spec.Frações': 'Biowaste',
  'data.product.lockey-5l.spec.Personalização': 'Colour, logo',

  'data.product.lockey-7l.short_description': 'Household bin with a security lock for biowaste — 7 Litre capacity, ideal for kitchens and local drop-off points.',
  'data.product.lockey-7l.description': 'The LOCKEY 7L is the higher-capacity version of the Lockey system, developed for household use and local drop-off points in apartment blocks. The integrated locking system prevents improper deposits and reduces contamination of the biowaste stream, while keeping the practicality of a kitchen bin.',
  'data.product.lockey-7l.spec.Capacidade': '7 Litres',
  'data.product.lockey-7l.spec.Material': 'HDPE',
  'data.product.lockey-7l.spec.Sistema de fecho': 'Custom key',
  'data.product.lockey-7l.spec.Frações': 'Biowaste',
  'data.product.lockey-7l.spec.Personalização': 'Colour, logo',

  // ---- Notícias ----
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.title': 'Turning waste into value: the virtuous cycle',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.excerpt': 'Discover how waste recovery can turn what used to be discarded into valuable resources, boosting the circular economy and reducing environmental impact.',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.content': 'Waste recovery is one of the pillars of the circular economy. Turning what was once considered rubbish into secondary raw material...',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.category': 'Sustainability',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.title': 'Circular economy: closing the materials loop',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.excerpt': 'Discover how the circular economy proposes a model of production and consumption that keeps materials in use for as long as possible, reducing waste and environmental impact.',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.content': 'The circular economy is a systemic model of production and consumption that involves sharing, repairing, reusing, refurbishing and recycling existing materials and products for as long as possible. In this way, the life cycle of products is extended, while waste is reduced to a minimum...',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.category': 'Circular Economy',

  // ---- Slides do herói ----
  'data.hero.slide-1.title': 'The separate collection infrastructure your city deserves.',
  'data.hero.slide-1.subtitle': 'Equipment for municipalities and MSW operators. Rear-loading, vertical-loading, door-to-door and urban cleaning containers. Designed to withstand the urban elements.',
  'data.hero.slide-1.cta_label': 'View Solutions',

  // ---- Estatísticas ----
  'data.stat.containers_installed.label': 'Installed Containers',
  'data.stat.municipalities_count.label': 'Participating Municipalities',
} as Record<string, string>
