# Deploy

## Plataforma

**Vercel** — deploy automático a partir do repositório Git.

- Branch `main` → produção (`www.ambiconcept.pt`)
- Pull requests → previews automáticos

---

## Variáveis de ambiente

Configurar no dashboard Vercel em **Settings → Environment Variables**.

| Variável | Serviço | Obrigatória |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase | ✅ |
| `VITE_FIREBASE_API_KEY` | Firebase Auth | ✅ (admin) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth | ✅ (admin) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Auth | ✅ (admin) |

> Todas as variáveis precisam do prefixo `VITE_` para ficarem disponíveis no browser via `import.meta.env`.

---

## Configuração Vercel (`vercel.json`)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

O rewrite garante que o React Router gere as rotas no cliente (SPA). Sem esta configuração, rotas directas como `/produtos/carga-vertical/ambi-27` retornam 404.

---

## Build

```bash
npm run build    # gera dist/
npm run preview  # serve dist/ localmente para validação
```

Framework detection: **Vite**. O Vercel detecta automaticamente e configura o build command e output directory.

---

## Domínio

`www.ambiconcept.pt` — configurado em Vercel Domains com canonical e Open Graph a apontar para este domínio.
