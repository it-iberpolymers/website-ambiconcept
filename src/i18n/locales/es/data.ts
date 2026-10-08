// Datos del sitio (categorías, productos, noticias, slides, estadísticas) en español.
// Sin clave, los helpers de localize.ts devuelven el texto portugués original.
// Los espacios entre número y «litros» son espacios de no separación (\u00a0).

const FRAC_VERTICAL = 'Papel y cartón, Vidrio, Envases, Resto' // REVER ("Indiferenciados" = fracción resto)
const FRAC_TWO = 'Papel y cartón, Envases, Resto, Biorresiduos' // REVER ("Indiferenciados" = fracción resto)
const FRAC_FOUR = 'Resto, Biorresiduos' // REVER ("Indiferenciados" = fracción resto)

const TWO_DESC = (n: string) =>
  `El AMBI TWO ${n} es la solución de referencia para los programas de recogida selectiva domiciliaria. Se adapta a cualquier tipología de vivienda y de vehículo. El diseño robusto y la calidad de los materiales garantizan una larga vida útil, incluso en condiciones de uso intensivo.`
const TWO_SHORT = (n: string) =>
  `Contenedor de ${n}\u00a0litros para sistemas de recogida puerta a puerta. Compatible con vehículos de carga trasera.`
const FOUR_DESC = (n: string) =>
  `El AMBI FOUR ${n} es un contenedor de carga trasera de gran capacidad del catálogo de Ambiconcept. Diseñado para comunidades de vecinos, mercados, restauración y otros grandes generadores, ofrece un volumen generoso con compatibilidad de elevación universal.`

const TWO_SPECS = {
  Material: 'PEAD',
  'Sistema de elevação': 'Carga trasera',
  Frações: FRAC_TWO,
  Personalização: 'Color, RFID, logotipo',
}

export default {
  // ---- Categorías ----
  'data.category.carga-traseira.name': 'Carga trasera',
  'data.category.carga-traseira.description': 'Contenedores de gran capacidad para la recogida con vehículos de carga trasera.',
  'data.category.carga-vertical.name': 'Carga vertical',
  'data.category.carga-vertical.description': 'Puntos de recogida selectiva de superficie para el depósito selectivo en el espacio público.',
  'data.category.smart-box.name': 'Smart Box',
  'data.category.smart-box.description': 'Contenedores de superficie e inteligentes para flujos especiales.',
  'data.category.porta-a-porta.name': 'Puerta a puerta',
  'data.category.porta-a-porta.description': 'Cubos y contenedores para sistemas de recogida domiciliaria.',
  'data.category.baldes-domesticos.name': 'Cubos domésticos',
  'data.category.baldes-domesticos.description': 'Cubos de cocina y de proximidad para biorresiduos y otros flujos.',
  'data.category.limpeza-urbana.name': 'Limpieza urbana',
  'data.category.limpeza-urbana.description': 'Papeleras urbanas para el espacio público y las zonas de playa.',

  // ---- Productos ----
  // AMBI 2.7
  'data.product.ambi-2-7.short_description': 'Contenedor de carga vertical de 2.700\u00a0litros para la recogida selectiva de\npapel y cartón, vidrio, envases y resto en el espacio público.', // REVER ("indiferenciados" = fracción resto)
  'data.product.ambi-2-7.description': 'El AMBI 2.7 es la solución de referencia para los puntos de recogida selectiva de superficie en Portugal. Fabricado en PEAD de alta resistencia, combina durabilidad urbana con una estética contemporánea. Disponible para múltiples fracciones y en colores RAL personalizados. Compatible con volteador (elevador basculante) para preservar el material recogido.', // REVER (volteador)
  'data.product.ambi-2-7.spec.Capacidade': '2.700\u00a0litros',
  'data.product.ambi-2-7.spec.Material': 'PEAD',
  'data.product.ambi-2-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-7.spec.Personalização': 'Color RAL, logotipo, vinilado', // REVER ("adesivagem")

  // AMBI 2.5
  'data.product.ambi-2-5.short_description': 'Contenedor de carga vertical de 2.500\u00a0litros para la recogida selectiva en el espacio público, ideal para calles más estrechas o lugares con menor generación de residuos.',
  'data.product.ambi-2-5.description': 'El AMBI 2.5 es un contenedor de carga vertical con una capacidad de 2.500\u00a0litros, fabricado en PEAD de alta resistencia. Ofrece una durabilidad urbana probada y compatibilidad universal con los volteadores de carga vertical, por lo que resulta ideal para calles más estrechas o lugares con menor generación de residuos. Soporta condiciones climáticas adversas y esfuerzos de carga repetitivos.',
  'data.product.ambi-2-5.spec.Capacidade': '2.500\u00a0litros',
  'data.product.ambi-2-5.spec.Material': 'PEAD',
  'data.product.ambi-2-5.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-2-5.spec.Personalização': 'Color RAL, logotipo',

  // AMBI TWO
  'data.product.ambi-two-120l.short_description': TWO_SHORT('120'),
  'data.product.ambi-two-120l.description': TWO_DESC('120L'),
  'data.product.ambi-two-120l.spec.Capacidade': '120\u00a0litros',
  'data.product.ambi-two-120l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-120l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-120l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-120l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-140l.short_description': TWO_SHORT('140'),
  'data.product.ambi-two-140l.description': TWO_DESC('140L'),
  'data.product.ambi-two-140l.spec.Capacidade': '140\u00a0litros',
  'data.product.ambi-two-140l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-140l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-140l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-140l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-240l.short_description': TWO_SHORT('240'),
  'data.product.ambi-two-240l.description': TWO_DESC('240L'),
  'data.product.ambi-two-240l.spec.Capacidade': '240\u00a0litros',
  'data.product.ambi-two-240l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-240l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-240l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-240l.spec.Personalização': TWO_SPECS.Personalização,

  'data.product.ambi-two-340l.short_description': TWO_SHORT('340'),
  'data.product.ambi-two-340l.description': TWO_DESC('340L'),
  'data.product.ambi-two-340l.spec.Capacidade': '340\u00a0litros',
  'data.product.ambi-two-340l.spec.Material': TWO_SPECS.Material,
  'data.product.ambi-two-340l.spec.Sistema de elevação': TWO_SPECS['Sistema de elevação'],
  'data.product.ambi-two-340l.spec.Frações': TWO_SPECS.Frações,
  'data.product.ambi-two-340l.spec.Personalização': TWO_SPECS.Personalização,

  // AMBI FOUR
  'data.product.ambi-four-800l.short_description': 'Contenedor de carga trasera de 800\u00a0litros para la recogida de biorresiduos y otros flujos en lugares de alta generación.',
  'data.product.ambi-four-800l.description': FOUR_DESC('800L'),
  'data.product.ambi-four-800l.spec.Capacidade': '800\u00a0litros',
  'data.product.ambi-four-800l.spec.Material': 'PEAD',
  'data.product.ambi-four-800l.spec.Sistema de elevação': 'Carga trasera',
  'data.product.ambi-four-800l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-800l.spec.Personalização': 'Color RAL, RFID',

  'data.product.ambi-four-1100l.short_description': 'Contenedor de carga trasera de 1.100\u00a0litros para la recogida de biorresiduos y otros flujos en lugares de alta generación.',
  'data.product.ambi-four-1100l.description': FOUR_DESC('1100L'),
  'data.product.ambi-four-1100l.spec.Capacidade': '1.100\u00a0litros',
  'data.product.ambi-four-1100l.spec.Material': 'PEAD',
  'data.product.ambi-four-1100l.spec.Sistema de elevação': 'Carga trasera',
  'data.product.ambi-four-1100l.spec.Frações': FRAC_FOUR,
  'data.product.ambi-four-1100l.spec.Personalização': 'Color RAL, RFID',

  // AMBI 1.0
  'data.product.ambi-1-0.short_description': 'Smart Box de superficie para la recogida de biorresiduos y aceites de cocina usados. Compacta, segura y preparada para el espacio público.',
  'data.product.ambi-1-0.description': 'El AMBI 1.0 es una solución inteligente de recogida de aceites de cocina usados para instalación en superficie. La apertura controlada impide los depósitos indebidos y la estructura de acero y PEAD garantiza durabilidad y seguridad. Ideal para comunidades de vecinos, aparcamientos y espacio público.',
  'data.product.ambi-1-0.spec.Capacidade': '1.000\u00a0litros',
  'data.product.ambi-1-0.spec.Material': 'Acero + PEAD',
  'data.product.ambi-1-0.spec.Instalação': 'Superficie',
  'data.product.ambi-1-0.spec.Acesso': 'Apertura controlada',
  'data.product.ambi-1-0.spec.Fluxo': 'Aceites de cocina usados',

  // AMBI URBAN
  'data.product.ambi-urban.short_description': 'Equipamiento de limpieza urbana para espacios públicos de alto tránsito. Diseño integrado que respeta el entorno urbano.',
  'data.product.ambi-urban.description': 'La AMBI URBAN ha sido concebida para integrarse armoniosamente en el mobiliario urbano de ciudades exigentes. Con una estructura robusta de acero pintado y un recipiente interior extraíble, facilita la limpieza y el mantenimiento. Disponible con fijación a poste, a pared o al suelo.',
  'data.product.ambi-urban.spec.Capacidade': '80\u00a0litros',
  'data.product.ambi-urban.spec.Material': 'Acero pintado',
  'data.product.ambi-urban.spec.Fixação': 'Poste / Pared / Suelo',
  'data.product.ambi-urban.spec.Interior amovível': 'Sí',
  'data.product.ambi-urban.spec.Personalização': 'Color RAL, logotipo',

  // AMBI BEACH
  'data.product.ambi-beach.short_description': 'Equipamiento de limpieza urbana para zonas de playa — resistente a la corrosión salina, proyectado para entornos costeros exigentes.',
  'data.product.ambi-beach.description': 'La AMBI BEACH es la versión costera de la AMBI URBAN, el equipamiento de limpieza urbana de Ambiconcept. El tratamiento anticorrosión especial y los materiales seleccionados garantizan la durabilidad en ambientes salinos. El diseño permite un vaciado y una limpieza sencillos por parte del equipo de limpieza urbana.',
  'data.product.ambi-beach.spec.Capacidade': '80\u00a0litros',
  'data.product.ambi-beach.spec.Material': 'Acero inoxidable / PEAD',
  'data.product.ambi-beach.spec.Ambiente': 'Costero / Playa',
  'data.product.ambi-beach.spec.Tratamento': 'Anticorrosión para ambientes salinos', // REVER ("Anticorrosão salino")
  'data.product.ambi-beach.spec.Fixação': 'Suelo',

  // AMBI 3.7
  'data.product.ambi-3-7.short_description': 'Contenedor de carga vertical de 3.700\u00a0litros para la recogida selectiva en el espacio público, ideal para lugares con elevada generación de residuos.',
  'data.product.ambi-3-7.description': 'El AMBI 3.7 es un contenedor de carga vertical con una capacidad de 3.700\u00a0litros, fabricado en PEAD de alta resistencia. Ofrece una durabilidad urbana probada y compatibilidad universal con los volteadores de carga vertical; es el modelo de mayor capacidad de la gama, ideal para lugares con elevada generación de residuos. Soporta condiciones climáticas adversas y esfuerzos de carga repetitivos.',
  'data.product.ambi-3-7.spec.Capacidade': '3.700\u00a0litros',
  'data.product.ambi-3-7.spec.Material': 'PEAD',
  'data.product.ambi-3-7.spec.Frações': FRAC_VERTICAL,
  'data.product.ambi-3-7.spec.Personalização': 'Color RAL, logotipo, vinilado', // REVER ("adesivagem")

  // LOCKEY
  'data.product.lockey-5l.short_description': 'Cubo doméstico con cierre de seguridad para biorresiduos — capacidad de 5\u00a0litros, ideal para la cocina y los puntos de proximidad.',
  'data.product.lockey-5l.description': 'El LOCKEY 5L es la versión compacta del sistema Lockey, desarrollada para uso doméstico y puntos de proximidad en comunidades de vecinos. El sistema de cierre integrado impide los depósitos indebidos y reduce la contaminación de la fracción de biorresiduos, manteniendo la practicidad de un cubo de cocina.',
  'data.product.lockey-5l.spec.Capacidade': '5\u00a0litros',
  'data.product.lockey-5l.spec.Material': 'PEAD',
  'data.product.lockey-5l.spec.Sistema de fecho': 'Llave personalizada',
  'data.product.lockey-5l.spec.Frações': 'Biorresiduos',
  'data.product.lockey-5l.spec.Personalização': 'Color, logotipo',

  'data.product.lockey-7l.short_description': 'Cubo doméstico con cierre de seguridad para biorresiduos — capacidad de 7\u00a0litros, ideal para la cocina y los puntos de proximidad.',
  'data.product.lockey-7l.description': 'El LOCKEY 7L es la versión de mayor capacidad del sistema Lockey, desarrollada para uso doméstico y puntos de proximidad en comunidades de vecinos. El sistema de cierre integrado impide los depósitos indebidos y reduce la contaminación de la fracción de biorresiduos, manteniendo la practicidad de un cubo de cocina.',
  'data.product.lockey-7l.spec.Capacidade': '7\u00a0litros',
  'data.product.lockey-7l.spec.Material': 'PEAD',
  'data.product.lockey-7l.spec.Sistema de fecho': 'Llave personalizada',
  'data.product.lockey-7l.spec.Frações': 'Biorresiduos',
  'data.product.lockey-7l.spec.Personalização': 'Color, logotipo',

  // ---- Noticias ----
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.title': 'Transformar residuos en valor: el ciclo virtuoso',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.excerpt': 'Descubra cómo la valorización de residuos puede convertir lo que antes se desechaba en recursos valiosos, impulsando la economía circular y reduciendo el impacto ambiental.',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.content': 'La valorización de residuos es uno de los pilares de la economía circular. Transformar lo que antes se consideraba basura en materia prima secundaria...',
  'data.news.transformar-residuos-em-valor-o-ciclo-virtuoso.category': 'Sostenibilidad',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.title': 'Economía circular: cerrar el ciclo de los materiales',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.excerpt': 'Descubra cómo la economía circular propone un modelo de producción y consumo que mantiene los materiales en uso durante el mayor tiempo posible, reduciendo los residuos y el impacto ambiental.',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.content': 'La economía circular es un modelo sistémico de producción y consumo que implica compartir, reparar, reutilizar, renovar y reciclar los materiales y productos existentes durante el mayor tiempo posible. De este modo, se prolonga el ciclo de vida de los productos, mientras que los residuos se reducen al mínimo...',
  'data.news.economia-circular-fechar-o-ciclo-dos-materiais.category': 'Economía circular',

  // ---- Slides del héroe ----
  'data.hero.slide-1.title': 'La infraestructura de recogida selectiva que su ciudad merece.',
  'data.hero.slide-1.subtitle': 'Equipamiento para municipios y operadores de RSU. Contenedores de carga trasera, carga vertical, puerta a puerta y limpieza urbana. Diseñados para resistir la intemperie urbana.',
  'data.hero.slide-1.cta_label': 'Ver soluciones',

  // ---- Estadísticas ----
  'data.stat.containers_installed.label': 'Contenedores instalados',
  'data.stat.municipalities_count.label': 'Municipios adheridos',
} as Record<string, string>
