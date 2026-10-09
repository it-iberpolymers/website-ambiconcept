// Tradução automática do conteúdo criado no admin (slides, banners, notícias, produtos):
// recebe os textos em português e devolve-os em cada língua do site, para guardar no campo
// `i18n` do documento (ver src/admin/translate.ts e src/i18n/localize.ts).
// Função da Vercel (POST /api/translate); em `npm run dev` é servida pelo vite.config.ts.
// Variáveis só do servidor: OPENROUTER_API_KEY e, opcional, OPENROUTER_MODEL.

export const config = { maxDuration: 60 }

// as línguas com prefixo do site (PREFIXED_LANGS em src/i18n/routing.ts)
const LANGS = {
  en: 'English (British spelling)',
  fr: 'French (France)',
  es: 'Spanish (Spain)',
  it: 'Italian (Italy)',
  de: 'German (Germany)',
}

const MAX_CHARS = 20_000

// o glossário de src/i18n/README.md (manter os dois iguais)
const GLOSSARY = `| Português | English | Français | Español | Italiano | Deutsch |
| recolha seletiva | separate collection | collecte sélective | recogida selectiva | raccolta differenziata | Getrenntsammlung |
| contentor | container | conteneur | contenedor | contenitore | Container (Behälter) |
| ecoponto | recycling point | point d'apport volontaire | punto de recogida selectiva (ecopunto) | punto di raccolta differenziata (ecopunto) | Wertstoffsammelstelle |
| município | municipality | commune / municipalité | municipio | comune | Gemeinde (Kommune) |
| operador RSU | MSW operator | opérateur de collecte des déchets | operador de RSU | operatore RSU | Betreiber der Abfallentsorgung |
| resíduos urbanos | municipal waste | déchets municipaux | residuos urbanos | rifiuti urbani | Siedlungsabfälle |
| biorresíduos | biowaste | biodéchets | biorresiduos | biorifiuti (rifiuti organici) | Bioabfälle |
| óleos alimentares usados (OAU) | used cooking oil (UCO) | huiles alimentaires usagées (HAU) | aceites de cocina usados (ACU) | oli alimentari usati (OAU) | Altspeiseöle |
| limpeza urbana | urban cleaning | propreté urbaine | limpieza urbana | igiene urbana | Stadtreinigung |
| papeleira | litter bin | corbeille de rue | papelera | cestino portarifiuti | Abfalleimer |
| porta-a-porta | door-to-door | porte-à-porte | puerta a puerta | porta a porta | Haus-zu-Haus-Sammlung |
| carga vertical | vertical (top) loading | chargement vertical | carga vertical | carico verticale | Vertikalbefüllung |
| carga traseira | rear loading | chargement arrière | carga trasera | carico posteriore | Heckbeladung (Hecklader) |
| volteador | tipping lift (bottle-bank tipper) | basculeur | volteador (elevador basculante) | ribaltatore | Kippvorrichtung |
| fluxo (de resíduos) | (waste) stream | flux (de déchets) | flujo (de residuos) | flusso (di rifiuti) | Abfallstrom |
| PEAD | HDPE | PEHD | PEAD (polietileno de alta densidad) | PEAD (polietilene ad alta densità) | PE-HD (HDPE) |
| briefing / partilhar o briefing | brief / share your brief | cahier des charges / partager votre brief | briefing / compartir su briefing | briefing / condividere il briefing | Briefing / Briefing teilen |
| Ver produto | View product | Voir le produit | Ver producto | Vedi prodotto | Produkt ansehen |
| Saber mais | Learn more | En savoir plus | Saber más | Scopri di più | Mehr erfahren |
| Falar com um especialista | Talk to a specialist | Parler à un spécialiste | Hablar con un especialista | Parla con uno specialista | Mit einem Spezialisten sprechen |`

const prompt = (language: string) => `You are a professional translator and localisation specialist for Ambiconcept (Iberpolymers group), a Portuguese manufacturer of waste containers and recycling points for municipalities and waste collection operators.

Translate the values of the JSON object you receive from European Portuguese into ${language}, as a professional human translator would: natural, idiomatic and faithful in meaning and register, never word for word. Professional, direct website tone with short sentences, like the original.

Rules:
- Reply with only a JSON object with exactly the same keys and the translated values.
- Keys starting with "spec." are product specification values (the rest of the key is the label in Portuguese): translate them concisely.
- Do not translate product names (e.g. AMBI 2.7, AMBI TWO, AMBI FOUR, LOCKEY, AMBI URBAN, AMBI BEACH, Smart Box) or brand names (Ambiconcept, Iberpolymers, RAL).
- Keep numbers, units, URLs, HTML tags, Markdown and line breaks as they are.
- Text between *asterisks* is highlighted on the website: put the asterisks around the equivalent words in the translation.
- Always use these terms (glossary, one column per language):
${GLOSSARY}`

export async function POST(request: Request): Promise<Response> {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) return error(500, 'OPENROUTER_API_KEY não está definida')

  // só para quem tem sessão iniciada no admin (o mesmo critério das regras do Firestore para o conteúdo do site)
  if (!(await isSignedIn(request.headers.get('authorization')))) return error(401, 'Sessão inválida')

  const texts = ((await request.json().catch(() => null)) as { texts?: unknown } | null)?.texts
  if (!isTexts(texts)) return error(400, `Esperado { texts: { campo: texto } }, até ${MAX_CHARS} caracteres`)

  try {
    // uma chamada por língua, em paralelo: respostas curtas e rápidas
    const entries = await Promise.all(
      Object.entries(LANGS).map(async ([lang, language]) => [lang, await translate(texts, language, key)]),
    )
    return Response.json(Object.fromEntries(entries))
  } catch (e) {
    return error(502, String(e))
  }
}

// valida o token de sessão do Firebase do lado da Google (a chave web do Firebase é pública)
async function isSignedIn(authorization: string | null): Promise<boolean> {
  const idToken = authorization?.match(/^Bearer (.+)$/)?.[1]
  if (!idToken) return false
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.VITE_FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
  const user = res.ok ? ((await res.json()) as { users?: { disabled?: boolean }[] }).users?.[0] : undefined
  return Boolean(user && !user.disabled)
}

function isTexts(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const values = Object.values(value)
  return values.length > 0 && values.every((v) => typeof v === 'string') && values.join('').length <= MAX_CHARS
}

async function translate(texts: Record<string, string>, language: string, key: string): Promise<Record<string, string>> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-5.5',
      temperature: 0.2,
      messages: [
        { role: 'system', content: prompt(language) },
        { role: 'user', content: JSON.stringify(texts) },
      ],
    }),
  })
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error(`Resposta sem texto: ${JSON.stringify(data).slice(0, 300)}`)
  const out = JSON.parse(content.slice(content.indexOf('{'), content.lastIndexOf('}') + 1))
  const missing = Object.keys(texts).filter((k) => typeof out[k] !== 'string')
  if (missing.length) throw new Error(`${language}: faltam os campos ${missing.join(', ')}`)
  return Object.fromEntries(Object.keys(texts).map((k) => [k, out[k]]))
}

const error = (status: number, message: string) => Response.json({ error: message }, { status })
