/**
 * Mapeia o slug de cada produto do site para os IDs correspondentes na
 * coleção Firestore partilhada `products` (usada também pelo configurador
 * de propostas e pelo kit digital). Essa coleção tem granularidade por
 * variante/capacidade, enquanto o site agrupa variantes num só produto —
 * por isso um slug pode mapear para vários IDs partilhados.
 *
 * Um produto é considerado descontinuado só se TODAS as variantes mapeadas
 * tiverem status !== 'ativo'. Slugs sem entrada aqui são sempre tratados
 * como ativos (nunca marcados como descontinuados por falta de mapeamento).
 *
 * TODO: confirmar o mapeamento para os restantes produtos (lockey,
 * lockey-5l, lockey-7l, ambi-1-0, ambi-urban, ambi-beach, ambi-2-5,
 * ambi-3-7) — ids reais na coleção partilhada `products`.
 *
 */
export const SHARED_PRODUCT_IDS: Record<string, string[]> = {
  'ambi-two-120l': ['ambi_two_120l'],
  'ambi-two-140l': ['ambi_two_140l'],
  'ambi-two-240l': ['ambi_two_240l'],
  'ambi-two-340l': ['ambi_two_340l'],
  'ambi-four-800l': ['ambi_four_800l'],
  'ambi-four-1100l': ['ambi_four_1100l'],
}
