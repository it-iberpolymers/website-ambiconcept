export interface CategoryHighlight {
  title: string
  description: string
}

export interface CategorySpec {
  label: string
  value: string
}

export interface CategoryContent {
  slug: string
  eyebrow: string
  headline: string
  tagline: string
  intro: string
  image: string
  imageAlt: string
  highlights: CategoryHighlight[]
  specs: CategorySpec[]
  seoTitle: string
  seoDescription: string
}

export const categoriesContent: CategoryContent[] = [
  {
    slug: 'carga-vertical',
    eyebrow: 'Ecopontos de Superfície',
    headline: 'Carga Vertical',
    tagline: 'Infraestrutura de recolha seletiva para o espaço público urbano.',
    intro:
      'Os contentores de carga vertical Ambiconcept são desenvolvidos para a recolha seletiva em espaço público — ecopontos de superfície com capacidade entre 2.500 e 2.700 litros. Fabricados em PEAD de alta resistência, oferecem durabilidade urbana comprovada e compatibilidade universal com volteadores de carga vertical. Disponíveis para os principais fluxos de recolha seletiva: papel & cartão, vidro, embalagens e indiferenciados.',
    image: '/assets/home-vidro.webp',
    imageAlt: 'Contentor AMBI 2.7 de carga vertical em espaço público urbano — Ambiconcept',
    highlights: [
      {
        title: 'Limpeza Fácil',
        description:
          'Superfícies lisas que garantem uma fácil limpeza e o total esvaziamento do contentor no processo de recolha.',
      },
      {
        title: 'Área de Comunicação',
        description:
          'Excelente superfície para campanhas de sensibilização e comunicação com o utilizador.',
      },
      {
        title: 'Robustez',
        description:
          'Contentor com proteção UV, resistente, baixos custos de manutenção e excelente tempo de vida útil. 100% reciclável.',
      },
      {
        title: 'Alta Capacidade',
        description:
          'Contentores de carga vertical com capacidade até 2.700 Litros. Melhor relação preço/capacidade do segmento.',
      },
    ],
    specs: [
      { label: 'Capacidade', value: '2.500 — 2.700 Litros' },
      { label: 'Material', value: 'PEAD UV estabilizado' },
      { label: 'Sistema de elevação', value: 'ø1100 mm standard' },
      { label: 'Frações disponíveis', value: 'Papel & Cartão · Vidro · Embalagens · Indiferenciados' },
      { label: 'Certificações', value: 'ISO 22628 · EN 840' },
      { label: 'Personalização', value: 'Cor RAL · Logótipo · Adesivagem' },
    ],
    seoTitle: 'Contentores de Carga Vertical — Ecopontos de Superfície',
    seoDescription:
      'Ecopontos de carga vertical de 2.500 a 2.700 Litros para recolha seletiva em espaço público. AMBI 2.7 e AMBI 2.5 — soluções para municípios e operadores RSU em Portugal.',
  },
  {
    slug: 'papeleiras',
    eyebrow: 'Mobiliário Urbano',
    headline: 'Papeleiras',
    tagline: 'Papeleiras urbanas para espaço público e zonas balneares.',
    intro:
      'As papeleiras Ambiconcept são desenvolvidas para uso intensivo em espaço público — estrutura robusta em aço, com opções de fixação a poste, mural ou solo. Disponíveis em versão urbana e em versão costeira com tratamento anticorrosão, para ambientes balneares exigentes.',
    image: '/assets/home-papeleiras.png',
    imageAlt: 'Papeleira urbana AMBI URBAN em espaço público — Ambiconcept',
    highlights: [
      {
        title: 'Limpeza Fácil',
        description:
          'Interior amovível que facilita o esvaziamento e a manutenção higiénica pela equipa de limpeza urbana.',
      },
      {
        title: 'Presença Urbana',
        description:
          'Design que se integra no mobiliário urbano sem competir com o espaço público envolvente.',
      },
      {
        title: 'Robustez',
        description:
          'Estrutura em aço resistente a uso intensivo, baixos custos de manutenção e longo tempo de vida útil.',
      },
      {
        title: 'Fixação Versátil',
        description:
          'Compatível com fixação a poste, mural ou solo, adaptando-se a qualquer contexto urbano.',
      },
    ],
    specs: [
      { label: 'Capacidade', value: '80 Litros' },
      { label: 'Material', value: 'Aço pintado / Aço inox' },
      { label: 'Fixação', value: 'Poste · Mural · Solo' },
      { label: 'Ambiente', value: 'Urbano · Costeiro / Balnear' },
      { label: 'Personalização', value: 'Cor RAL · Logótipo' },
    ],
    seoTitle: 'Papeleiras Urbanas — Mobiliário Urbano',
    seoDescription:
      'Papeleiras urbanas de 80 Litros para espaço público e zonas balneares. AMBI URBAN e AMBI BEACH — soluções para municípios em Portugal.',
  },
  {
    slug: 'baldes-domesticos',
    eyebrow: 'Recolha de Proximidade',
    headline: 'Baldes Domésticos',
    tagline: 'Baldes de cozinha e proximidade para biorresíduos em contexto doméstico.',
    intro:
      'Os baldes domésticos Ambiconcept são desenvolvidos para a recolha de proximidade de biorresíduos em contexto doméstico — compactos, higiénicos e equipados com sistema de fecho que reduz a contaminação da fração orgânica. Fabricados em PEAD de fácil limpeza, adaptam-se a programas porta-a-porta e pontos de proximidade em condomínios e edifícios.',
    image: '/assets/home-biorresiduos.png',
    imageAlt: 'Balde doméstico LOCKEY para recolha de biorresíduos — Ambiconcept',
    highlights: [
      {
        title: 'Aro para Saco',
        description:
          'Possibilidade de integrar e fixar saco no interior para facilitar a higienização do balde.',
      },
      {
        title: 'Dois Tamanhos',
        description:
          'Disponível em duas capacidades, 5L e 7L. É fácil de se adaptar às necessidades da família.',
      },
      {
        title: 'Tampa Ventilada',
        description:
          'Opção de tampa ventilada com integração de filtro de carvão para evitar os odores.',
      },
      {
        title: 'Bloqueio da Tampa',
        description:
          'A tranca da tampa evita o derrame de biorresíduos por animais domésticos.',
      },
    ],
    specs: [
      { label: 'Capacidade', value: '5 — 40 Litros' },
      { label: 'Material', value: 'PEAD' },
      { label: 'Sistema de fecho', value: 'Chave personalizada' },
      { label: 'Frações', value: 'Biorresíduos' },
      { label: 'Personalização', value: 'Cor, logótipo' },
    ],
    seoTitle: 'Baldes Domésticos — Recolha de Proximidade',
    seoDescription:
      'Baldes domésticos para recolha de proximidade de biorresíduos, com sistema de fecho de segurança. LOCKEY — soluções para municípios e condomínios em Portugal.',
  },
  {
    slug: 'smart-box',
    eyebrow: 'Fluxos Especiais',
    headline: 'Smart Box',
    tagline: 'Contentores inteligentes de superfície para fluxos especiais de resíduos.',
    intro:
      'O AMBI 1.0 foi desenvolvido para fluxos especiais de resíduos, com capacidade de 1.000 Litros. \nCom abertura controlada e estrutura em aço e PEAD, garante segurança e durabilidade \nem instalação de superfície.',
    image: '/assets/home-oleos-alimentares.png',
    imageAlt: 'Smart Box AMBI 1.0 para recolha de óleos alimentares usados — Ambiconcept',
    highlights: [
      {
        title: 'Porta com Fechadura',
        description:
          'Porta frontal com fechadura, para utilização dos serviços municipais durante a recolha e substituição do contentor interior.',
      },
      {
        title: 'Contentor Interior',
        description:
          'Resíduos depositados num contentor interior MGB de 2 rodas para fácil substituição.',
      },
      {
        title: 'Controlo de Acesso',
        description:
          'Opção de abertura com controlo de acesso RFID permite recolher dados de reciclagem.',
      },
      {
        title: 'Reconhecimento\ndo Utilizador',
        description:
          'Acesso controlado aos utilizadores reconhecidos no sistema.',
      },
    ],
    specs: [
      { label: 'Capacidade', value: '1.000 Litros' },
      { label: 'Material', value: 'Aço + PEAD' },
      { label: 'Instalação', value: 'Superfície' },
      { label: 'Acesso', value: 'Abertura controlada' },
      { label: 'Personalização', value: 'Cor, logótipo' },
    ],
    seoTitle: 'Smart Box — Contentores Inteligentes',
    seoDescription:
      'Smart Box para fluxos especiais de resíduos, com abertura controlada. AMBI 1.0 — solução para óleos alimentares usados em municípios e condomínios em Portugal.',
  },
  {
    slug: 'carga-traseira',
    eyebrow: 'Recolha Domiciliária',
    headline: 'Carga Traseira',
    tagline: 'Contentores de recolha porta-a-porta compatíveis com viaturas de carga traseira.',
    intro:
      'Os contentores de carga traseira Ambiconcept são desenvolvidos para programas de recolha seletiva domiciliária, adaptando-se a qualquer tipologia de habitação e de viatura. Disponíveis em várias capacidades, com rodas e sistema de identificação RFID, garantem uma vida útil longa mesmo em condições de uso intensivo.',
    image: '/assets/home-porta-a-porta.webp',
    imageAlt: 'Contentor AMBI TWO de carga traseira para recolha seletiva domiciliária — Ambiconcept',
    highlights: [
      {
        title: 'Porta com Fechadura',
        description:
          'Opção de fechadura na tampa para bloqueio de acesso confere maior versatilidade ao contentor.',
      },
      {
        title: 'Fácil Manuseamento',
        description:
          'Contentor compacto, com rodas e pegas para facilitar transporte e manutenção.',
      },
      {
        title: 'Resistência e Durabilidade',
        description:
          'Produzido em polietileno de alta densidade, resistente à água e raios UV.',
      },
      {
        title: 'Limpeza Fácil',
        description:
          'Superfícies lisas garantem fácil limpeza e total esvaziamento na recolha.',
      },
    ],
    specs: [
      { label: 'Capacidade', value: '120 / 140 / 240 / 340 Litros' },
      { label: 'Material', value: 'PEAD' },
      { label: 'Rodas', value: '2 ou 4' },
      { label: 'Sistema de elevação', value: 'Carga traseira' },
      { label: 'Frações disponíveis', value: 'Papel & Cartão · Embalagens · Indiferenciados · Biorresíduos' },
      { label: 'Personalização', value: 'Cor · RFID · Logótipo' },
    ],
    seoTitle: 'Contentores de Carga Traseira — Recolha Porta-a-Porta',
    seoDescription:
      'Contentores de carga traseira de 120 a 340 Litros para recolha seletiva domiciliária. AMBI TWO — soluções para municípios e operadores RSU em Portugal.',
  },
]

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoriesContent.find((c) => c.slug === slug)
}
