# Dados e Conteúdo

## Fontes de dados

O site usa duas fontes em camadas: **Supabase** como fonte primária e **`data/local.ts`** como fallback estático.

```
Supabase (PostgreSQL)   →  dados reais em produção
data/local.ts           →  fallback offline / desenvolvimento
```

---

## Hooks de dados

| Hook | Fonte | Dados |
|---|---|---|
| `useProducts` | Supabase + local | Produtos, categorias |
| `useNews` | Supabase + local | Artigos de notícias |
| `useStats` | Supabase + local | Estatísticas (contentores, municípios) |
| `useAuth` | Firebase | Sessão de administrador |
| `useContactForm` | Supabase | Submissão do formulário de contacto |

Todos os hooks expõem `{ data, loading, error }`.

---

## Estrutura de dados principal

### Produto (`Product`)

```ts
{
  id, slug, name,
  short_description, description,
  category_id, category,
  specifications,        // objecto chave-valor livre
  cover_image,
  hero_images[],
  anatomy_image?,        // imagem Chars1 (template Carga Vertical)
  anatomy_image_2?,      // imagem Chars2 (template Carga Vertical)
  featured,
  created_at
}
```

### Categorias

| Slug | Nome |
|---|---|
| `carga-traseira` | Carga Traseira |
| `carga-vertical` | Carga Vertical |
| `smart-box` | Smart Box |
| `porta-a-porta` | Porta-a-porta |
| `baldes-domesticos` | Baldes Domésticos |
| `papeleiras` | Papeleiras |

---

## Fluxos de Resíduos (tipos de resíduo)

Taxonomia oficial dos tipos de resíduo recolhidos pelos equipamentos Ambiconcept:

| Tipo |
|---|
| Papel & Cartão |
| Vidro |
| Embalagens |
| Indiferenciados |
| Biorresíduos |
| Óleos Alimentares Usados |

Esta é a lista de referência a usar ao documentar frações/materiais de produto (`specifications`), filtros do site ou copy de categoria. Não renomear, agrupar nem omitir tipos sem instrução do utilizador. Nem todos os produtos cobrem todos os fluxos — cada ficha de produto especifica os fluxos que efetivamente recolhe.

---

## Assets

Imagens em `public/assets/`. Formato preferencial: **WebP** para fotografias, **PNG com alpha** para renders de produto.

Convenção de nomes:
```
AMBI2.7_Capa.png         ← imagem de capa (cover_image)
AMBI2.7_Papel.png        ← variante por fração (hero_images)
AMBI2.7_Chars1.png       ← anatomy_image (callouts secção 1)
AMBI2.7_Chars2.png       ← anatomy_image_2 (callouts secção 2)
```
