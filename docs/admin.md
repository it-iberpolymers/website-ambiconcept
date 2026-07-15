# Painel de Administração

## Acesso

Rota: `/admin`
Autenticação: Firebase Authentication (email + password)

O `useAuth.ts` verifica a sessão Firebase. Sem sessão válida, redireciona para `/admin/login`.

---

## Páginas do admin

| Rota | Componente | Função |
|---|---|---|
| `/admin` | `AdminDashboard.tsx` | Visão geral e navegação |
| `/admin/produtos` | `AdminProdutos.tsx` | Gestão de produtos (Supabase) |
| `/admin/noticias` | `AdminNoticias.tsx` | Gestão de artigos (Supabase) |
| `/admin/contactos` | `AdminContactos.tsx` | Submissões do formulário de contacto |
| `/admin/hero` | `AdminHero.tsx` | Configuração do slideshow hero |
| `/admin/featured` | `AdminFeatured.tsx` | Banner featured da homepage |
| `/admin/estatisticas` | `AdminEstatisticas.tsx` | Edição dos contadores (contentores, municípios) |

---

## FirebaseNotice

`FirebaseNotice.tsx` — aviso exibido no admin quando a configuração Firebase não está completa (variáveis de ambiente em falta). Não bloqueia o acesso mas sinaliza o problema.

---

## Variáveis de ambiente necessárias

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Ver [deploy.md](deploy.md) para configuração no Vercel.
