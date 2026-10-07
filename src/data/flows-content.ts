import { storageUrl } from '@/data/local'

export interface FlowHighlight {
  title: string
  description: string
}

export interface FlowImpactStat {
  icon: 'bin' | 'tree' | 'recycle'
  target: number
  prefix?: string
  suffix?: string
  label: string
  description: string
}

export interface FlowSdgItem {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17
  color: string
  label: string
  title: string
  description: string
}

export interface FlowProductHighlight {
  name: string
  description: string
  image: string
  imageAlt: string
  ctaHref: string
}

export interface FlowContent {
  slug: string
  eyebrow: string
  headline: string
  tagline: string
  intro: string
  image: string
  imageAlt: string
  highlights: FlowHighlight[]
  seoTitle: string
  seoDescription: string
  // Secção de produtos em destaque, logo por baixo do banner — opcional.
  productsHeading?: string
  productsBody?: string
  productsHighlights?: FlowProductHighlight[]
  // Imagem só da secção de introdução (cutout, fundo transparente) — quando
  // diferente da foto de cena do banner. Sem isto, a introdução usa `image`.
  introImage?: string
  introImageAlt?: string
  // Secção de introdução "rica" (título próprio + destaque em evidência com
  // ícones) — opcional; sem isto, a página mostra a introdução simples.
  introHeading?: string
  introCtaLabel?: string
  introCtaHref?: string
  featuredHighlight?: FlowHighlight
  // Secção secundária (texto à esquerda, imagem à direita) — opcional.
  secondaryHeading?: string
  secondaryBody?: string
  secondaryImage?: string
  secondaryImageAlt?: string
  // Secção de impacto (título + texto + 3 estatísticas, fundo de imagem) —
  // opcional; substitui a secção "Vantagens" genérica quando presente.
  impactHeading?: string
  impactBody?: string
  impactBackground?: string
  impactStats?: FlowImpactStat[]
  // Secção dos Objetivos de Desenvolvimento Sustentável (ODS/SDG) — opcional.
  // sdgBody suporta **negrito** (markdown simples).
  sdgHeading?: string
  sdgBody?: string
  sdgItems?: FlowSdgItem[]
}

export const flowsContent: FlowContent[] = [
  {
    slug: 'vidro',
    eyebrow: 'Fluxo de Resíduos',
    headline: 'Vidro',
    tagline: 'Soluções de recolha seletiva de vidro para espaço público\ne recolha porta-a-porta.',
    intro:
      'A Ambiconcept disponibiliza equipamento para a recolha seletiva de vidro em qualquer contexto — desde ecopontos de carga vertical para espaço público (AMBI 2.5 e AMBI 2.7), compatíveis com volteador para descarga em altura, até contentores de carga traseira para recolha porta-a-porta (AMBI TWO 120L e 140L). Todas as soluções são fabricadas em PEAD de alta resistência, preparadas para uso intensivo e condições climáticas adversas.',
    image: '/assets/home-vidro.jpg',
    imageAlt: 'Recolha seletiva de vidro com equipamento Ambiconcept',
    highlights: [
      {
        title: 'Compatibilidade Universal',
        description:
          'Ecopontos compatíveis com os principais sistemas de volteador para descarga em altura.',
      },
      {
        title: 'Elevada Capacidade',
        description:
          'Desde 120 Litros em contexto porta-a-porta até 2.700 Litros em ecopontos de superfície.',
      },
      {
        title: 'Resistência ao Impacto',
        description:
          'Corpo em PEAD de alta densidade, preparado para o peso e o impacto próprios da recolha de vidro.',
      },
      {
        title: 'Dois Modelos de Recolha',
        description:
          'Ecopontos para espaço público ou contentores individuais para recolha porta-a-porta, conforme o programa municipal.',
      },
    ],
    seoTitle: 'Recolha Seletiva de Vidro — Equipamento Ambiconcept',
    seoDescription:
      'Contentores e ecopontos para recolha seletiva de vidro. AMBI 2.5, AMBI 2.7 e AMBI TWO — soluções para municípios e operadores RSU em Portugal.',
  },
  {
    slug: 'oleos-alimentares-usados',
    eyebrow: 'Fluxo de Resíduos',
    headline: 'Óleos Alimentares Usados',
    tagline: 'Recolha segura de óleos alimentares usados, do ponto de descarte doméstico até à reciclagem.',
    intro:
      'Os Óleos Alimentares Usados são um resíduo de alto valor acrescentado que pode ser transformado em biodiesel. A sua recolha é ainda fundamental na preservação de leitos de água e da biodiversidade, uma vez que o seu despejo indevido provoca um grande nível de contaminação de solos e cursos de água.',
    image: '/assets/fluxo-oleos-alimentares.png',
    imageAlt: 'Contentor AMBI 1.0 para recolha de óleos alimentares usados — Ambiconcept',
    introImage: '/assets/AMBI1.0-oau-tampa-aberta.png',
    introImageAlt: 'Contentor AMBI 1.0 na variante Óleos Alimentares Usados, com tampa aberta — Ambiconcept',
    introHeading: 'Uma Forma Inteligente de Recolha',
    introCtaLabel: 'Ver Produto',
    introCtaHref: '/produtos/smart-box/ambi-1-0',
    featuredHighlight: {
      title: 'Controlo de acesso',
      description:
        'O fecho eletrónico com abertura por RFID condicionada a cada utilizador, através de um cartão de aproximação.',
    },
    secondaryHeading: 'Operação e Limpeza Fácil',
    secondaryBody:
      'A substituição do contentor interior por um contentor vazio facilita a operação, tornando mais fácil e higiénica o transporte de resíduos.',
    secondaryImage: '/assets/AMBI1.0-oau-porta-aberta.png',
    secondaryImageAlt: 'Contentor AMBI 1.0 com a porta frontal aberta, mostrando o contentor interior — Ambiconcept',
    impactHeading: 'Maior Consciência Ambiental',
    impactBackground: '/assets/Oleos-Alimentares-Usados.png',
    impactBody:
      'O sistema PaP está mais perto dos cidadãos. A separação de resíduos é feita em casa, pelos munícipes nos contentores específicos que são recolhidos pelos serviços municipais em dias específicos, diretamente à porta de casa. Um sistema que já se revelou mais eficaz para aumentar a reciclagem em direção às metas estabelecidas pela UE.',
    impactStats: [
      {
        icon: 'bin',
        target: 60,
        suffix: 'M',
        label: '60 Milhões de litros\nde OAU são produzidos\nanualmente em Portugal',
        description:
          'A produção deste tipo de resíduos está maioritariamente associada ao canal HORECA, que gera 69% deste resíduo, seguido do setor doméstico com 25% e o setor industrial com 6%. A taxa de recolha no canal HORECA está nos 46%.',
      },
      {
        icon: 'tree',
        target: 1,
        suffix: 'L',
        label: '1 Litro de óleo é suficiente para poluir 1 Milhão de litros de água',
        description:
          'A recolha de OAU é fundamental para evitar a contaminação da água e do solo e preservar ecossistemas aquáticos e a biodiversidade do planeta. A correta gestão destes resíduos trás também uma redução de custos de manutenção dos sistemas de saneamento público.',
      },
      {
        icon: 'recycle',
        target: 5000,
        label: 'Pontos de Recolha de OAU para valorização em Portugal',
        description:
          'A recolha e valorização dedicada dos biorresíduos faz parte dos objetivos e metas ambientais europeias e tem um impacto claro e imediato em alguns dos Objetivos de Desenvolvimento Sustentável (ODS) para 2030.',
      },
    ],
    sdgHeading: 'Impacto Ambiental Positivo',
    sdgBody:
      'Os **Objetivos de Desenvolvimento Sustentável** constituem as diretrizes necessárias para fazer face à emergência climática, à perda galopante de biodiversidade e às desigualdades e assimetrias sociais. Apresentam por outro lado, uma oportunidade de apoiar um crescimento sustentável, regenerativo e inclusivo. As soluções AMBICONCEPT contribuem para fazermos este caminho juntos.',
    sdgItems: [
      {
        number: 7,
        color: '#fcc30b',
        label: 'Energias Renováveis e Acessíveis',
        title: 'Energias renováveis e acessíveis',
        description:
          'A transformação de óleo alimentar usado em biodiesel pode ser uma fonte de energia renovável, diminuindo a dependência de combustíveis fósseis.',
      },
      {
        number: 11,
        color: '#fd9d24',
        label: 'Cidades e Comunidades Sustentáveis',
        title: 'Cidades e comunidades sustentáveis',
        description:
          'A gestão adequada de resíduos, incluindo óleos alimentares usados, é essencial para manter cidades e comunidades mais limpas e sustentáveis.',
      },
      {
        number: 12,
        color: '#bf8b2e',
        label: 'Produção e Consumo Sustentáveis',
        title: 'Produção e consumos sustentáveis',
        description:
          'A reciclagem de OAU\'s contribui para a redução do desperdício e para a promoção de padrões de consumo e produção mais sustentáveis.',
      },
      {
        number: 13,
        color: '#3f7e44',
        label: 'Ação Climática',
        title: 'Ação climática',
        description:
          'Ao reduzir a quantidade de óleo alimentar descartado incorretamente contribuímos para reduzir a poluição ambiental e as alterações climáticas.',
      },
      {
        number: 14,
        color: '#0a97d9',
        label: 'Proteger a Vida Marinha',
        title: 'Proteger a vida marinha',
        description:
          'A recolha e reciclagem de óleos alimentares usados contribui para a redução da contaminação de solos e ecossistemas aquáticos.',
      },
      {
        number: 15,
        color: '#56c02b',
        label: 'Proteger a Vida Terrestre',
        title: 'Proteger a Vida Terrestre',
        description:
          'Reduzir a contaminação e transformar resíduos em novos produtos é uma forma de contribuir para a proteção de ecossistemas e da biodiversidade.',
      },
    ],
    highlights: [
      {
        title: 'Abertura Controlada',
        description:
          'Impede depósitos indevidos e garante a qualidade do óleo recolhido.',
      },
      {
        title: 'Instalação de Superfície',
        description:
          'Sem obras — fácil de instalar em condomínios, parques de estacionamento e espaço público.',
      },
      {
        title: 'Estrutura Resistente',
        description:
          'Aço e PEAD, duráveis e seguros mesmo em instalação exterior e uso intensivo.',
      },
      {
        title: 'Elevada Capacidade',
        description:
          '1.000 Litros, adequados a pontos de recolha de maior fluxo.',
      },
    ],
    seoTitle: 'Recolha de Óleos Alimentares Usados — Equipamento Ambiconcept',
    seoDescription:
      'AMBI 1.0 — Smart Box para recolha segura de óleos alimentares usados em condomínios e espaço público. Soluções para municípios em Portugal.',
  },
  {
    slug: 'biorresiduos',
    eyebrow: 'Fluxo de Resíduos',
    headline: 'Biorresíduos',
    tagline: 'A separação dos biorresíduos começa dentro de casa.',
    intro:
      'A Ambiconcept disponibiliza uma gama completa de equipamento para a recolha de biorresíduos — desde os baldes domésticos Lockey, para a cozinha, até aos contentores AMBI TWO e AMBI FOUR para recolha porta-a-porta e em condomínio. Todas as soluções foram desenhadas para reduzir a contaminação da fração orgânica e facilitar a separação na origem.',
    image: '/assets/fluxo-biorresiduos.png',
    imageAlt: 'Balde doméstico Lockey para resíduos orgânicos, numa cozinha — Ambiconcept',
    productsHeading: 'Produtos para Separação e Recolha',
    productsBody:
      'Os biorresíduos fazem parte do nosso dia a dia. Compõem, em média, quase 37% do nosso caixote do "lixo comum". Na Ambiconcept temos diversas soluções para a separação de resíduos e fluxos de recolha de resíduos orgânicos na sua cidade.',
    productsHighlights: [
      {
        name: 'Lockey',
        description: 'Balde de bancada para recolha de resíduos alimentares orgânicos.\nCapacidades: 5 litros e 7 litros.',
        image: storageUrl('produtos/lockey_5l/fotos/digital/00_capa.png'),
        imageAlt: 'Balde Lockey para recolha de biorresíduos — Ambiconcept',
        ctaHref: '/categorias/baldes-domesticos',
      },
      {
        name: 'AMBI TWO',
        description: 'Contentor de proximidade com identificação RFID e de fácil utilização.\nCapacidades: 120/140/240/340 litros.',
        // TODO: substituir por foto própria quando disponível
        image: '/assets/home-porta-a-porta.webp',
        imageAlt: 'Contentor AMBI TWO para recolha porta-a-porta de biorresíduos — Ambiconcept',
        ctaHref: '/produtos/carga-traseira/ambi-two-120l',
      },
      {
        name: 'AMBI FOUR',
        description: 'Contentor de carga traseira de grande capacidade, para condomínios, mercados e restauração.\nCapacidades: 800/1.100 litros.',
        image: '/assets/home-biorresiduos.png',
        imageAlt: 'Contentor AMBI FOUR para recolha de biorresíduos — Ambiconcept',
        ctaHref: '/produtos/carga-traseira/ambi-four-800l',
      },
      {
        name: 'AMBI 1.0',
        description: 'Contentor de superfície com abertura controlada, para recolha de biorresíduos e óleos alimentares usados.\nCapacidade: 1.000 litros.',
        image: storageUrl('produtos/ambi_1.0/fotos/digital/00_capa_ro1.png'),
        imageAlt: 'Contentor AMBI 1.0 para recolha de biorresíduos — Ambiconcept',
        ctaHref: '/produtos/smart-box/ambi-1-0',
      },
    ],
    introHeading: 'Uma Gama Completa para Biorresíduos',
    introCtaLabel: 'Ver Soluções',
    featuredHighlight: {
      title: 'Higiene e Praticidade',
      description:
        'Aro para fixação de saco e tampa ventilada garantem uma utilização diária mais higiénica e prática.',
    },
    secondaryHeading: 'Bloqueio Seguro da Tampa',
    secondaryBody:
      'O sistema de fecho evita a abertura acidental e o derrame de biorresíduos por animais domésticos, mantendo o balde seguro durante o transporte.',
    // TODO: substituir por foto própria do fluxo quando disponível
    secondaryImage: '/assets/home-biorresiduos.png',
    secondaryImageAlt: 'Balde doméstico Lockey para recolha de biorresíduos — Ambiconcept',
    impactHeading: 'Impacto da Separação de Biorresíduos',
    impactBody:
      'Os biorresíduos representam uma parte significativa dos resíduos urbanos em Portugal. A sua correta separação na origem é essencial para aumentar as taxas de reciclagem e reduzir o impacto ambiental dos aterros.',
    // TODO: valores de exemplo — substituir por dados verificados antes de publicar
    impactStats: [
      {
        icon: 'bin',
        target: 40,
        suffix: '%',
        label: 'dos resíduos urbanos são biorresíduos',
        description:
          'A fração orgânica é uma das maiores componentes dos resíduos sólidos urbanos, com elevado potencial de valorização se corretamente separada.',
      },
      {
        icon: 'tree',
        target: 100,
        suffix: '%',
        label: 'reciclável quando corretamente separado',
        description:
          'Biorresíduos bem separados podem ser transformados em composto ou biogás, evitando o seu envio para aterro.',
      },
      {
        icon: 'recycle',
        target: 3,
        label: 'gamas de equipamento disponíveis',
        description:
          'Lockey, AMBI TWO e AMBI FOUR cobrem desde a recolha doméstica até à recolha porta-a-porta em maior escala.',
      },
    ],
    sdgHeading: 'Impacto Ambiental Positivo',
    sdgBody:
      'A correta separação e valorização dos **biorresíduos** contribui diretamente para vários Objetivos de Desenvolvimento Sustentável, reduzindo emissões, poupando recursos naturais e apoiando cidades e comunidades mais sustentáveis.',
    sdgItems: [
      {
        number: 7,
        color: '#fcc30b',
        label: 'Energias Renováveis e Acessíveis',
        title: 'Energias renováveis e acessíveis',
        description:
          'A valorização de biorresíduos através de digestão anaeróbia pode gerar biogás, uma fonte de energia renovável.',
      },
      {
        number: 11,
        color: '#fd9d24',
        label: 'Cidades e Comunidades Sustentáveis',
        title: 'Cidades e comunidades sustentáveis',
        description:
          'A recolha seletiva de biorresíduos contribui para cidades mais limpas e sistemas de gestão de resíduos mais eficientes.',
      },
      {
        number: 12,
        color: '#bf8b2e',
        label: 'Produção e Consumo Sustentáveis',
        title: 'Produção e consumos sustentáveis',
        description:
          'A separação correta da fração orgânica reduz o desperdício e permite a sua valorização em composto ou energia.',
      },
      {
        number: 13,
        color: '#3f7e44',
        label: 'Ação Climática',
        title: 'Ação climática',
        description:
          'Reduzir o envio de biorresíduos para aterro diminui as emissões de metano, um gás com elevado potencial de aquecimento global.',
      },
      {
        number: 14,
        color: '#0a97d9',
        label: 'Proteger a Vida Marinha',
        title: 'Proteger a vida marinha',
        description:
          'A gestão adequada de biorresíduos evita a contaminação de solos e cursos de água que desaguam em ecossistemas marinhos.',
      },
      {
        number: 15,
        color: '#56c02b',
        label: 'Proteger a Vida Terrestre',
        title: 'Proteger a Vida Terrestre',
        description:
          'O composto produzido a partir de biorresíduos pode enriquecer solos e apoiar ecossistemas terrestres saudáveis.',
      },
    ],
    highlights: [
      {
        title: 'Redução de Odores',
        description:
          'Sistemas de fecho e ventilação que minimizam a libertação de odores durante o armazenamento.',
      },
      {
        title: 'Fácil Separação',
        description:
          'Equipamento pensado para facilitar a separação da fração orgânica na origem, em casa ou em condomínio.',
      },
      {
        title: 'Vários Formatos',
        description:
          'Desde baldes de cozinha a contentores de recolha porta-a-porta, para qualquer escala de operação.',
      },
      {
        title: 'Valorização Orgânica',
        description:
          'Biorresíduos corretamente separados podem ser transformados em composto ou biogás.',
      },
    ],
    seoTitle: 'Recolha de Biorresíduos — Equipamento Ambiconcept',
    seoDescription:
      'Lockey, AMBI 1.0, AMBI TWO e AMBI FOUR para recolha seletiva de biorresíduos. Soluções para municípios, condomínios e habitações em Portugal.',
  },
  {
    slug: 'limpeza-urbana',
    eyebrow: 'Fluxo de Resíduos',
    headline: 'Limpeza Urbana',
    tagline: 'Equipamento de limpeza urbana para o espaço público, da praça à praia.',
    intro:
      'A Ambiconcept disponibiliza equipamento de limpeza urbana para espaços públicos de elevada utilização, com a AMBI URBAN para o meio urbano e a AMBI BEACH para zonas balneares. Ambas têm 80 Litros de capacidade e foram desenhadas para se integrarem no mobiliário urbano e facilitarem o trabalho das equipas de limpeza.',
    image: '/assets/home-papeleiras.png',
    imageAlt: 'Equipamento de limpeza urbana AMBI URBAN e AMBI BEACH em espaço público — Ambiconcept',
    productsHeading: 'Equipamento para Cada Ambiente',
    productsBody:
      'Dois equipamentos com a mesma capacidade e estruturas pensadas para contextos diferentes: a cidade e a zona costeira.',
    productsHighlights: [
      {
        name: 'AMBI URBAN',
        description:
          'Equipamento de limpeza urbana em aço pintado, com recipiente interior amovível que facilita a limpeza e a manutenção.\nCapacidade: 80 litros. Fixação a poste, mural ou ao solo.',
        image: storageUrl('produtos/ambi_urban/fotos/digital/00_capa_embalagens.png'),
        imageAlt: 'AMBI URBAN — equipamento de limpeza urbana — Ambiconcept',
        ctaHref: '/produtos/limpeza-urbana/ambi-urban',
      },
      {
        name: 'AMBI BEACH',
        description:
          'Versão costeira do equipamento urbano, com tratamento anticorrosão para resistir ao ambiente salino.\nCapacidade: 80 litros. Fixação ao solo.',
        image: storageUrl('produtos/ambi_beach/fotos/digital/00_capa_embalagens.png'),
        imageAlt: 'AMBI BEACH — equipamento de limpeza urbana — Ambiconcept',
        ctaHref: '/produtos/limpeza-urbana/ambi-beach',
      },
    ],
    highlights: [
      {
        title: 'Interior Amovível',
        description:
          'O recipiente interior retira-se para esvaziar e limpar, o que facilita o trabalho das equipas de limpeza urbana.',
      },
      {
        title: 'Fixação Flexível',
        description:
          'A AMBI URBAN fixa-se a poste, mural ou ao solo, conforme o local de instalação.',
      },
      {
        title: 'Pensada para a Costa',
        description:
          'A AMBI BEACH tem tratamento anticorrosão para resistir ao ambiente salino das zonas balneares.',
      },
      {
        title: 'Personalizável',
        description:
          'Cor RAL e logótipo à medida da identidade de cada município.',
      },
    ],
    seoTitle: 'Limpeza Urbana — Equipamento Ambiconcept',
    seoDescription:
      'AMBI URBAN e AMBI BEACH para limpeza urbana em espaço público e zonas balneares. Equipamento para municípios em Portugal.',
  },
  {
    slug: 'porta-a-porta',
    eyebrow: 'Fluxo de Resíduos',
    headline: 'Porta-a-porta',
    tagline: 'Recolha domiciliária com contentores compatíveis com viatura de carga traseira.',
    intro:
      'A gama AMBI TWO foi concebida para programas de recolha seletiva domiciliária. Está disponível em 120, 140, 240 e 340 Litros, em PEAD, e adapta-se a qualquer tipologia de habitação e de viatura de carga traseira. A cor, o logótipo e a identificação RFID podem ser personalizados para cada programa municipal.',
    image: '/assets/home-porta-a-porta.webp',
    imageAlt: 'Contentores AMBI TWO para recolha porta-a-porta — Ambiconcept',
    highlights: [
      {
        title: 'Carga Traseira',
        description:
          'Compatíveis com as viaturas de carga traseira usadas na recolha domiciliária.',
      },
      {
        title: 'Quatro Capacidades',
        description:
          '120, 140, 240 e 340 Litros, para responder a diferentes tipologias de habitação.',
      },
      {
        title: 'Identificação RFID',
        description:
          'Personalização com cor, logótipo e RFID, para identificar o contentor de cada utilizador.',
      },
      {
        title: 'Resistência no Uso Diário',
        description:
          'Corpo em PEAD, com vida útil longa mesmo em condições de uso intensivo.',
      },
    ],
    seoTitle: 'Recolha Porta-a-porta — Contentores AMBI TWO',
    seoDescription:
      'Contentores AMBI TWO de 120 a 340 Litros para recolha porta-a-porta, compatíveis com viatura de carga traseira. Soluções para municípios em Portugal.',
  },
]

export function getFlowContent(slug: string): FlowContent | undefined {
  return flowsContent.find((f) => f.slug === slug)
}
