export interface RalColor {
  code: string
  hex: string
}

// Cores por defeito por categoria — usadas como fallback no site quando o
// Firestore ainda não tem o documento (useRalColors) e como seed inicial
// (scripts/seed-firestore.mts), para as duas fontes nunca desalinharem.
export const DEFAULT_RAL_COLORS: Record<string, RalColor[]> = {
  'carga-vertical': [
    { code: 'RAL 5013', hex: '#193153' },
    { code: 'RAL 6029', hex: '#00703c' },
    { code: 'RAL 1023', hex: '#efb700' },
    { code: 'RAL 7016', hex: '#383e42' },
    { code: 'RAL 3020', hex: '#bb1e10' },
  ],
  'limpeza-urbana': [
    { code: 'RAL 5013', hex: '#193153' },
    { code: 'RAL 6029', hex: '#00703c' },
    { code: 'RAL 1023', hex: '#efb700' },
    { code: 'RAL 7016', hex: '#383e42' },
  ],
  'smart-box': [
    { code: 'RAL 8014', hex: '#4a3526' },
    { code: 'RAL 2010', hex: '#d4652f' },
  ],
  'baldes-domesticos': [
    { code: 'RAL 8025', hex: '#755f4a' },
  ],
  'carga-traseira': [
    { code: 'RAL 5013', hex: '#193153' },
    { code: 'RAL 6029', hex: '#00703c' },
    { code: 'RAL 1023', hex: '#efb700' },
    { code: 'RAL 7016', hex: '#383e42' },
    { code: 'RAL 8025', hex: '#755f4a' },
  ],
}
