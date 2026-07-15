# Ambiconcept Waste Solutions — Site Institucional

Site de produto e comunicação da marca **Ambiconcept**, fabricante português de equipamento de recolha seletiva para municípios e operadores RSU.

---

## Stack

| Camada       | Tecnologia                        |
|--------------|-----------------------------------|
| Framework    | React 19 + TypeScript             |
| Build        | Vite                              |
| CSS          | Tailwind CSS v4 + módulos CSS     |
| Routing      | React Router v7                   |
| Backend/DB   | Supabase (PostgreSQL + Auth)      |
| Admin Auth   | Firebase Authentication           |
| Deploy       | Vercel                            |
| Idioma       | pt-PT (exclusivo)                 |

---

## Documentação

| Ficheiro | Conteúdo |
|---|---|
| [docs/arquitectura.md](docs/arquitectura.md) | Stack, estrutura de pastas, fluxo de dados |
| [docs/design-system.md](docs/design-system.md) | Paleta, tipografia, componentes, convenções CSS |
| [docs/paginas-rotas.md](docs/paginas-rotas.md) | Todas as páginas, rotas e componentes |
| [docs/templates-produto.md](docs/templates-produto.md) | Templates de detalhe de produto |
| [docs/admin.md](docs/admin.md) | Painel de administração |
| [docs/dados-conteudo.md](docs/dados-conteudo.md) | Fontes de dados, local vs Supabase |
| [docs/deploy.md](docs/deploy.md) | Deploy, variáveis de ambiente, Vercel |
| [docs/analise/design-premium.md](docs/analise/design-premium.md) | Análise de marcas premium de referência |
| [docs/conceitos/animacao-scroll-produto.md](docs/conceitos/animacao-scroll-produto.md) | Conceito de animação 3D no scroll |

---

## Arrancar o projecto

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```
