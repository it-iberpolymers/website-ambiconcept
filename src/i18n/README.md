# Internacionalização (pt / en / fr / es)

O site muda de língua ao escolher Português, English, Français ou Español no globo do cabeçalho.
Cada língua tem os seus endereços: português na raiz (`/produtos`) e as outras com prefixo (`/en/produtos`, `/fr/produtos`, `/es/produtos`).
A língua vem do endereço (e atualiza `<html lang>`); a última escolha fica guardada no browser (`localStorage`, chave `ambiconcept-lang`) e só serve para levar quem abre um endereço sem prefixo para a sua língua.
O painel de administração (`/admin`) fica sempre em português.

## Endereços e SEO por língua
- `src/i18n/routing.ts`: funções puras (`langFromPath`, `stripLangPrefix`, `localizePath`).
- `src/i18n/router.tsx`: `Link`, `NavLink`, `Navigate`, `useNavigate` que põem o prefixo da língua. **No site público importar sempre daqui** (não de `react-router-dom`). `usePathname()` devolve o endereço sem prefixo e `useLocalizedHref()` serve para `<a href>` escritos à mão.
- `src/App.tsx` regista as páginas públicas uma vez sem prefixo e uma vez por língua (`PREFIXED_LANGS`). O admin não tem prefixo e é sempre português.
- `PageSeo` gera o `canonical` da língua atual, as ligações `hreflang` para todas as línguas (mais `x-default` = português) e `og:locale`.
- `npm run sitemap` (corre também no `build`) gera `public/sitemap.xml` com todas as páginas × línguas e as alternativas `hreflang`. Usa os dados locais: conteúdo criado só no admin (Firestore) não entra.
- Para acrescentar uma língua: adicionar em `LANGS` (index.tsx), em `routing.ts` (`Lang`, `PREFIXED_LANGS`), em `OG_LOCALE` (PageSeo), em `loaders` (index.tsx), em `HREFLANG` (generate-sitemap.mts) e criar `locales/<língua>/` com os mesmos ficheiros.

## Como funciona
- `src/i18n/index.tsx`: `I18nProvider` e o hook `useI18n()` → `{ lang, locale, setLang, t, tf }`.
- Textos em `src/i18n/locales/<pt|en|fr>/<namespace>.ts`. Cada ficheiro faz `export default { 'chave': 'texto' }`.
  Todos os ficheiros de uma língua são juntados automaticamente. O português carrega sempre; en e fr só quando escolhidos.
- `t('chave')` devolve o texto na língua atual. Sem tradução usa o português e, no limite, a própria chave.
  `t('chave', { n: 3 })` substitui `{{n}}` no texto.
- `tf('chave', textoOriginal)` é igual, mas devolve `textoOriginal` quando a chave não existe. Serve para dados vindos da base de dados.
- Datas e números: usar `locale` do `useI18n()` (`pt-PT`, `en-GB`, `fr-FR`), nunca `'pt-PT'` escrito à mão.

## Regras para escrever texto
1. **O português é a origem e tem de ficar IDÊNTICO ao que o site mostra hoje** (mesmos caracteres, pontuação, quebras de linha `\n`). Ao extrair um texto para `pt/<ns>.ts`, copiá-lo exatamente.
2. Chaves em minúsculas, com pontos, começando pelo namespace: `home.hero.title`, `cv.faq.0.q`. Cada namespace é um ficheiro (`home.ts`) e **só usa chaves com o seu prefixo**, para não haver colisões entre quem trabalha em paralelo.
3. Chaves comuns já existem em `common.*` (ver `locales/pt/common.ts`): reutilizar em vez de duplicar.
4. Listas e objetos: chaves com índice (`cv.faq.0.q`, `cv.faq.0.a`) ou chaves fixas por item. Os arrays no código guardam as **chaves** e `t()` é chamado ao desenhar (nunca ao carregar o módulo, senão não reage à mudança de língua).
5. Texto com partes em negrito/ligações: dividir em chaves (`x.before`, `x.bold`, `x.after`) ou manter o marcador `**negrito**` quando o componente já o interpreta.
6. Nomes próprios e de produto não se traduzem: AMBI 2.7, AMBI TWO, AMBI FOUR, LOCKEY, AMBI URBAN, AMBI BEACH, Smart Box, Ambiconcept, Iberpolymers, RAL, PEAD/HDPE (ver glossário).
7. Atributos visíveis ou lidos por leitores de ecrã também se traduzem: `alt`, `aria-label`, `title`, `placeholder`.
8. SEO: `PageSeo` recebe `title` e `description` já traduzidos.
9. Não traduzir: slugs e URLs, classes CSS, chaves de dados (`'Capacidade'` usada como chave de `specifications`), valores técnicos.
   Rótulos de especificações mostrados ao utilizador passam por `t('spec.label.<Rótulo em PT>')` (ex.: `spec.label.Capacidade`).

## Dados (produtos, categorias, notícias…)
Os hooks de dados (`useProducts`, `useProduct`, `useProductCategories`, `useNews`, `useNewsArticle`, `useHeroSlides`, `useStats`) já devolvem os dados traduzidos
pelas chaves abaixo (ver `src/i18n/localize.ts`). Quem consome esses hooks **não** precisa de traduzir de novo. Sem tradução fica o português.

| Dado | Chaves |
|---|---|
| Categoria | `data.category.<slug>.name`, `.description` |
| Produto | `data.product.<slug>.name`, `.short_description`, `.description`, `.spec.<Rótulo>` (valor da especificação) |
| Notícia | `data.news.<slug>.title`, `.excerpt`, `.content`, `.category` |
| Slide do herói | `data.hero.<id>.title`, `.subtitle`, `.cta_label` |
| Estatística | `data.stat.<key>.label` |

Conteúdo de ficheiros como `categories-content.ts` e `flows-content.ts` (estruturas grandes): ver as instruções de cada tarefa.

## Glossário (usar sempre estes termos)
| Português | English | Français | Español |
|---|---|---|---|
| recolha seletiva | separate collection | collecte sélective | recogida selectiva |
| contentor | container | conteneur | contenedor |
| ecoponto | recycling point | point d'apport volontaire | punto de recogida selectiva (ecopunto) |
| município | municipality | commune / municipalité | municipio |
| operador RSU | MSW operator | opérateur de collecte des déchets | operador de RSU |
| resíduos urbanos | municipal waste | déchets municipaux | residuos urbanos |
| biorresíduos | biowaste | biodéchets | biorresiduos |
| óleos alimentares usados (OAU) | used cooking oil (UCO) | huiles alimentaires usagées (HAU) | aceites de cocina usados (ACU) |
| limpeza urbana | urban cleaning | propreté urbaine | limpieza urbana |
| papeleira | litter bin | corbeille de rue | papelera |
| porta-a-porta | door-to-door | porte-à-porte | puerta a puerta |
| carga vertical | vertical (top) loading | chargement vertical | carga vertical |
| carga traseira | rear loading | chargement arrière | carga trasera |
| volteador | tipping lift (bottle-bank tipper) | basculeur | volteador (elevador basculante) |
| fluxo (de resíduos) | (waste) stream | flux (de déchets) | flujo (de residuos) |
| PEAD | HDPE | PEHD | PEAD (polietileno de alta densidad) |
| briefing / partilhar o briefing | brief / share your brief | cahier des charges / partager votre brief | briefing / compartir su briefing |
| Ver produto | View product | Voir le produit | Ver producto |
| Saber mais | Learn more | En savoir plus | Saber más |
| Falar com um especialista | Talk to a specialist | Parler à un spécialiste | Hablar con un especialista |

Termos técnicos incertos: traduzir com o melhor equivalente e acrescentar o comentário `// REVER` na linha da chave.
Tom: profissional, direto, frases curtas, como o texto original em português.
