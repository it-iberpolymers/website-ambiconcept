// Données du site (catégories, produits, actualités, slides, statistiques) en français.
// Seulement en/fr : sans clé, les helpers de localize.ts renvoient le texte portugais d’origine.
// Les espaces dans les nombres et avant « litres » sont insécables (\u00a0).

const FRAC_VERTICAL = 'Papier & Carton, Verre, Emballages, Déchets résiduels' // REVER ("Indiferenciados")
const FRAC_TWO = 'Papier & Carton, Emballages, Déchets résiduels, Biodéchets' // REVER ("Indiferenciados")
const FRAC_FOUR = 'Déchets résiduels, Biodéchets' // REVER ("Indiferenciados")

const TWO_DESC = (n: string) =>
  `L’AMBI TWO ${n} est la solution de référence pour les programmes de collecte sélective à domicile. Il s’adapte à tout type d’habitat et de véhicule. Sa conception robuste et la qualité des matériaux garantissent une longue durée de vie, même en usage intensif.`
const TWO_SHORT = (n: string) =>
  `Conteneur de ${n}\u00a0litres pour les systèmes de collecte porte-à-porte. Compatible avec les véhicules à chargement arrière.`
const FOUR_DESC = (n: string) =>
  `L’AMBI FOUR ${n} est un conteneur à chargement arrière de grande capacité du portefeuille Ambiconcept. Conçu pour les copropriétés, les marchés, la restauration et autres gros producteurs, il offre un volume généreux avec une compatibilité de levage universelle.`

const TWO_SPECS = {
  Material: 'PEHD',
  'Sistema de elevação': 'Chargement arrière',
  Frações: FRAC_TWO,
  Personalização: 'Couleur, RFID, logo',
}

export default {
  // ---- Catégories ----
  'data.category.carga-traseira.name': 'Chargement arrière',
  'data.category.carga-traseira.description': 'Conteneurs de grande capacité pour la collecte par des véhicules à chargement arrière.',
  'data.category.carga-vertical.name': 'Chargement vertical',
  'data.category.carga-vertical.description': 'Points d’apport volontaire en surface pour le dépôt sélectif dans l’espace public.',
  'data.category.smart-box.name': 'Smart Box',
  'data.category.smart-box.description': 'Conteneurs de surface et intelligents pour les flux spéciaux.',
  'data.category.porta-a-porta.name': 'Porte-à-porte',
  'data.category.porta-a-porta.description': 'Seaux et conteneurs pour les systèmes de collecte à domicile.',
  'data.category.baldes-domesticos.name': 'Seaux domestiques',
  'data.category.baldes-domesticos.description': 'Seaux de cuisine et de proximité pour les biodéchets et autres flux.',
  'data.category.limpeza-urbana.name': 'Propreté urbaine',
  'data.category.limpeza-urbana.description': 'Corbeilles de rue pour l’espace public et les zones balnéaires.',

  // ---- Produits ----
  // AMBI 2.7
  'data.product.ambi-2-7.short_description': 'Conteneur à chargement vertical de 2\u00a0700\u00a0litres pour la collecte sélective du\npapier & carton, du verre, des emballages et des déchets résiduels dans l’espace public.', // REVER ("indiferenciados")
  'data.product.ambi-2-7.description': 'L’AMBI 2.7 est la solution de référence pour les points d’apport volontaire en surface au Portugal. Conçu en PEHD haute résistance, il allie durabilité urbaine et esthétique contemporaine. Disponible pour plusieurs fractions et en couleurs RAL personnalisées. Compatible avec un basculeur afin de préserver le matériau collecté.', // REVER ("fractions")
  'data.product.ambi-2-7.spec.Capacidade': '2\u00a0700\u00a0litres',
  'data.product.ambi-2-7.spec.Material': 'PEHD',
  'data.product.ambi-2-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-7.spec.Personalização': 'Couleur RAL, logo, marquage adhésif', // REVER ("adesivagem")

  // AMBI 2.5
  'data.product.ambi-2-5.short_description': 'Conteneur à chargement vertical de 2\u00a0500\u00a0litres pour la collecte sélective dans l’espace public, idéal pour les rues plus étroites ou les lieux à plus faible production de déchets.',
  'data.product.ambi-2-5.description': 'L’AMBI 2.5 est un conteneur à chargement vertical d’une capacité de 2\u00a0500\u00a0litres, fabriqué en PEHD haute résistance. Il offre une durabilité urbaine éprouvée et une compatibilité universelle avec les basculeurs à chargement vertical, ce qui le rend idéal pour les rues plus étroites ou les lieux à plus faible production de déchets. Il résiste aux conditions climatiques difficiles et aux sollicitations répétées de chargement.',
  'data.product.ambi-2-5.spec.Capacidade': '2\u00a0500\u00a0litres',
  'data.product.ambi-2-5.spec.Material': 'PEHD',
  'data.product.ambi-2-5.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-5.spec.Personalização': 'Couleur RAL, logo',

  // AMBI TWO
  'data.product.ambi-two-120l.short_description': TWO_SHORT('120'),
  'data.product.ambi-two-120l.description': TWO_DESC('120L'),
  'data.product.ambi-two-120l.spec.Capacidade': '120\u00a0litres',
  'data.product.ambi-two-120l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-120l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-120l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-120l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-140l.short_description': TWO_SHORT('140'),
  'data.product.ambi-two-140l.description': TWO_DESC('140L'),
  'data.product.ambi-two-140l.spec.Capacidade': '140\u00a0litres',
  'data.product.ambi-two-140l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-140l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-140l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-140l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-240l.short_description': TWO_SHORT('240'),
  'data.product.ambi-two-240l.description': TWO_DESC('240L'),
  'data.product.ambi-two-240l.spec.Capacidade': '240\u00a0litres',
  'data.product.ambi-two-240l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-240l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-240l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-240l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-340l.short_description': TWO_SHORT('340'),
  'data.product.ambi-two-340l.description': TWO_DESC('340L'),
  'data.product.ambi-two-340l.spec.Capacidade': '340\u00a0litres',
  'data.product.ambi-two-340l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-340l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-340l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-340l.spec.Personalização': TWO_SPECS.Personalização,

  // AMBI FOUR
  'data.product.ambi-four-800l.short_description': 'Conteneur à chargement arrière de 800\u00a0litres pour la collecte de biodéchets et d’autres flux dans les lieux à forte production.',
  'data.product.ambi-four-800l.description': FOUR_DESC('800L'),
  'data.product.ambi-four-800l.spec.Capacidade': '800\u00a0litres',
  'data.product.ambi-four-800l.spec.Material': 'PEHD',
  'data.product.ambi-four-800l.spec.Sistema de elevação': 'Chargement arrière',
  'data.product.ambi-four-800l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-800l.spec.Personalização': 'Couleur RAL, RFID',

  'data.product.ambi-four-1100l.short_description': 'Conteneur à chargement arrière de 1\u00a0100\u00a0litres pour la collecte de biodéchets et d’autres flux dans les lieux à forte production.',
  'data.product.ambi-four-1100l.description': FOUR_DESC('1100L'),
  'data.product.ambi-four-1100l.spec.Capacidade': '1\u00a0100\u00a0litres',
  'data.product.ambi-four-1100l.spec.Material': 'PEHD',
  'data.product.ambi-four-1100l.spec.Sistema de elevação': 'Chargement arrière',
  'data.product.ambi-four-1100l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-1100l.spec.Personalização': 'Couleur RAL, RFID',

  // AMBI 1.0
  'data.product.ambi-1-0.short_description': 'Smart Box de surface pour la collecte de biodéchets et d’huiles alimentaires usagées. Compacte, sûre et adaptée à l’espace public.',
  'data.product.ambi-1-0.description': 'L’AMBI 1.0 est une solution intelligente de collecte des huiles alimentaires usagées pour une installation en surface. L’ouverture contrôlée empêche les dépôts indésirables, et la structure en acier et PEHD garantit durabilité et sécurité. Idéale pour les copropriétés, les parkings et l’espace public.',
  'data.product.ambi-1-0.spec.Capacidade': '1\u00a0000\u00a0litres',
  'data.product.ambi-1-0.spec.Material': 'Acier + PEHD',
  'data.product.ambi-1-0.spec.Instalação': 'En surface',
  'data.product.ambi-1-0.spec.Acesso': 'Ouverture contrôlée',
  'data.product.ambi-1-0.spec.Fluxo': 'Huiles alimentaires usagées',

  // AMBI URBAN
  'data.product.ambi-urban.short_description': 'Équipement de propreté urbaine pour l’espace public à forte fréquentation. Design intégré qui respecte l’environnement urbain.',
  'data.product.ambi-urban.description': 'L’AMBI URBAN a été conçue pour s’intégrer harmonieusement au mobilier urbain des villes exigeantes. Avec une structure robuste en acier peint et un bac intérieur amovible, elle facilite le nettoyage et l’entretien. Disponible avec fixation sur poteau, murale ou au sol.',
  'data.product.ambi-urban.spec.Capacidade': '80\u00a0litres',
  'data.product.ambi-urban.spec.Material': 'Acier peint',
  'data.product.ambi-urban.spec.Fixação': 'Poteau / Mural / Sol',
  'data.product.ambi-urban.spec.Interior amovível': 'Oui',
  'data.product.ambi-urban.spec.Personalização': 'Couleur RAL, logo',

  // AMBI BEACH
  'data.product.ambi-beach.short_description': 'Équipement de propreté urbaine pour les zones balnéaires — résistant à la corrosion saline, conçu pour les environnements côtiers exigeants.',
  'data.product.ambi-beach.description': 'L’AMBI BEACH est la version côtière de l’AMBI URBAN, l’équipement de propreté urbaine d’Ambiconcept. Le traitement anticorrosion spécial et les matériaux sélectionnés garantissent la durabilité en milieu salin. Sa conception permet à l’équipe de propreté urbaine de la vider et de la nettoyer facilement.',
  'data.product.ambi-beach.spec.Capacidade': '80\u00a0litres',
  'data.product.ambi-beach.spec.Material': 'Acier inoxydable / PEHD',
  'data.product.ambi-beach.spec.Ambiente': 'Littoral / Balnéaire',
  'data.product.ambi-beach.spec.Tratamento': 'Anticorrosion en milieu salin', // REVER ("Anticorrosão salino")
  'data.product.ambi-beach.spec.Fixação': 'Sol',

  // AMBI 3.7
  'data.product.ambi-3-7.short_description': 'Conteneur à chargement vertical de 3\u00a0700\u00a0litres pour la collecte sélective dans l’espace public, idéal pour les lieux à forte production de déchets.',
  'data.product.ambi-3-7.description': 'L’AMBI 3.7 est un conteneur à chargement vertical d’une capacité de 3\u00a0700\u00a0litres, fabriqué en PEHD haute résistance. Il offre une durabilité urbaine éprouvée et une compatibilité universelle avec les basculeurs à chargement vertical ; c’est le modèle de plus grande capacité de la gamme, idéal pour les lieux à forte production de déchets. Il résiste aux conditions climatiques difficiles et aux sollicitations répétées de chargement.',
  'data.product.ambi-3-7.spec.Capacidade': '3\u00a0700\u00a0litres',
  'data.product.ambi-3-7.spec.Material': 'PEHD',
  'data.product.ambi-3-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-3-7.spec.Personalização': 'Couleur RAL, logo, marquage adhésif', // REVER ("adesivagem")

  // LOCKEY
  'data.product.lockey-5l.short_description': 'Seau domestique à fermeture sécurisée pour biodéchets — capacité de 5\u00a0litres, idéal pour la cuisine et les points de proximité.',
  'data.product.lockey-5l.description': 'Le LOCKEY 5L est la version compacte du système Lockey, conçue pour l’usage domestique et les points de proximité en copropriété. Le système de fermeture intégré empêche les dépôts indésirables et réduit la contamination de la fraction de biodéchets, tout en gardant la praticité d’un seau de cuisine.',
  'data.product.lockey-5l.spec.Capacidade': '5\u00a0litres',
  'data.product.lockey-5l.spec.Material': 'PEHD',
  'data.product.lockey-5l.spec.Sistema de fecho': 'Clé personnalisée',
  'data.product.lockey-5l.spec.Frações': 'Biodéchets',
  'data.product.lockey-5l.spec.Personalização': 'Couleur, logo',

  'data.product.lockey-7l.short_description': 'Seau domestique à fermeture sécurisée pour biodéchets — capacité de 7\u00a0litres, idéal pour la cuisine et les points de proximité.',
  'data.product.lockey-7l.description': 'Le LOCKEY 7L est la version de plus grande capacité du système Lockey, conçue pour l’usage domestique et les points de proximité en copropriété. Le système de fermeture intégré empêche les dépôts indésirables et réduit la contamination de la fraction de biodéchets, tout en gardant la praticité d’un seau de cuisine.',
  'data.product.lockey-7l.spec.Capacidade': '7\u00a0litres',
  'data.product.lockey-7l.spec.Material': 'PEHD',
  'data.product.lockey-7l.spec.Sistema de fecho': 'Clé personnalisée',
  'data.product.lockey-7l.spec.Frações': 'Biodéchets',
  'data.product.lockey-7l.spec.Personalização': 'Couleur, logo',

  // ---- Actualités ----
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.title': 'Transformer les déchets en valeur : le cercle vertueux',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.excerpt': 'Découvrez comment la valorisation des déchets peut transformer ce qui était jeté en ressources précieuses, en stimulant l’économie circulaire et en réduisant l’impact environnemental.',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.content': 'La valorisation des déchets est l’un des piliers de l’économie circulaire. Transformer ce qui était autrefois considéré comme des ordures en matière première secondaire...',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.category': 'Développement durable',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.title': 'Économie circulaire : boucler le cycle des matériaux',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.excerpt': 'Découvrez comment l’économie circulaire propose un modèle de production et de consommation qui maintient les matériaux en usage le plus longtemps possible, en réduisant les déchets et l’impact environnemental.',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.content': 'L’économie circulaire est un modèle systémique de production et de consommation qui consiste à partager, réparer, réutiliser, rénover et recycler les matériaux et produits existants le plus longtemps possible. Ainsi, le cycle de vie des produits est prolongé, tandis que les déchets sont réduits au minimum...',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.category': 'Économie circulaire',

  // ---- Slides du héros ----
  'data.hero.slide-1.title': 'L’infrastructure de collecte sélective que votre ville mérite.',
  'data.hero.slide-1.subtitle': 'Équipements pour les municipalités et les opérateurs de collecte des déchets. Conteneurs à chargement arrière, chargement vertical, porte-à-porte et propreté urbaine. Conçus pour résister aux intempéries urbaines.',
  'data.hero.slide-1.cta_label': 'Voir les solutions',

  // ---- Statistiques ----
  'data.stat.containers_installed.label': 'Conteneurs installés',
  'data.stat.municipalities_count.label': 'Municipalités adhérentes',
} as Record<string, string>
