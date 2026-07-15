# Arquitectura

## Estrutura de pastas

```
src/
├── admin/                  # Painel de administração (rota /admin)
│   ├── pages/              # Páginas do admin (Produtos, Notícias, Contactos…)
│   ├── AdminLayout.tsx
│   ├── AdminLogin.tsx
│   └── FirebaseNotice.tsx
├── components/
│   ├── layout/             # Header, Footer, Layout wrapper
│   ├── sections/           # Secções reutilizáveis da homepage
│   ├── seo/                # PageSeo (meta tags + schema.org)
│   └── ui/                 # Componentes atómicos (ContactForm, AnimatedCounter)
├── data/
│   ├── local.ts            # Dados estáticos de fallback (produtos, categorias, artigos)
│   └── categories-content.ts # Conteúdo editorial por categoria
├── hooks/                  # Hooks de dados (useProducts, useNews, useStats…)
├── lib/
│   └── firebase.ts         # Configuração Firebase (auth admin)
├── pages/                  # Páginas públicas (Home, Products, News…)
├── styles/                 # CSS por módulo (prefixo por template)
├── templates/              # Templates de produto (CargaVerticalTemplate)
├── types/
│   └── index.ts            # Interfaces TypeScript (Product, NewsArticle…)
└── main.tsx                # Entry point
```

---

## Fluxo de dados

```
Supabase (PostgreSQL)
    └── hooks/useProducts.ts   →  páginas públicas
    └── hooks/useNews.ts       →  página de notícias
    └── hooks/useStats.ts      →  secção de estatísticas
    └── hooks/useAuth.ts       →  autenticação admin

data/local.ts               →  fallback quando Supabase não responde
                            →  usado no desenvolvimento offline
```

Os hooks seguem o padrão: `{ data, loading, error }`. O componente renderiza o estado de loading, o erro, ou os dados.

---

## Routing

```
/                           →  Home
/produtos                   →  Catálogo de produtos
/produtos/:categoria/:slug  →  Detalhe de produto (template específico)
/noticias                   →  Listagem de notícias
/noticias/:slug             →  Artigo
/contactos                  →  Página de contacto
/politica-privacidade       →  Política de privacidade
/admin                      →  Painel de administração (protegido)
```

---

## Convenções de código

- Componentes em PascalCase, ficheiros `.tsx`
- Hooks com prefixo `use`, ficheiros `.ts`
- CSS por módulo com prefixo específico (ex: `cv-` para Carga Vertical)
- Sem `any` em TypeScript — usar tipos explícitos ou `unknown`
- Sem comentários de código excepto quando o "porquê" não é óbvio
