# Páginas e Rotas

## Mapa de rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `pages/Home.tsx` | Homepage — hero, produtos em destaque, notícias, CTA |
| `/produtos` | `pages/Products.tsx` | Catálogo com filtro por categoria |
| `/produtos/:categoria/:slug` | `pages/ProductDetail.tsx` | Detalhe de produto — delega no template correcto |
| `/noticias` | `pages/News.tsx` | Listagem de artigos |
| `/noticias/:slug` | `pages/NewsArticle.tsx` | Artigo individual |
| `/contactos` | `pages/Contacts.tsx` | Formulário de contacto |
| `/politica-privacidade` | `pages/PrivacyPolicy.tsx` | Política de privacidade |
| `/admin/*` | `admin/AdminLayout.tsx` | Painel de administração (protegido por Firebase Auth) |

---

## Estrutura da Homepage

```
Hero (slideshow)
IntroSection
WasteCollectionSection       ← secção de fluxos de recolha
ProductsPremiumSection       ← produtos em destaque
FeaturedSection              ← banner featured configurável
AudiencesSection             ← municípios vs. operadores
StatsSection                 ← contadores animados
MunicipalitiesSection        ← lista de municípios aderentes
NewsSection                  ← últimas notícias
ContactSection
```

---

## Página de Catálogo (`/produtos`)

- Filtro por categoria via query string `?categoria=carga-vertical`
- Cards de produto com imagem, nome, capacidade
- Categorias: Carga Traseira, Carga Vertical, Smart Box, Porta-a-porta, Baldes Domésticos, Limpeza Urbana

---

## Detalhe de Produto (`/produtos/:categoria/:slug`)

`ProductDetail.tsx` recebe o produto pelo slug e selecciona o template adequado:

| Categoria | Template |
|---|---|
| `carga-vertical` | `CargaVerticalTemplate` |
| outras | template genérico (a implementar) |

---

## CategoryPage

`pages/CategoryPage.tsx` — página intermédia de categoria com descrição editorial e listagem de produtos da categoria.
