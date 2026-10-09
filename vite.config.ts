import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fluidType from './postcss-fluid-type.mjs'
import { POST as translate } from './api/translate'

// Em `npm run dev` não há funções da Vercel: /api/translate é servido aqui, com as variáveis
// do .env (incluindo as só do servidor, como OPENROUTER_API_KEY, que nunca chegam ao browser).
function devApi(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use('/api/translate', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk)
        const response = await translate(new Request('http://localhost/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: req.headers.authorization ?? '' },
          body: Buffer.concat(chunks).toString(),
        }))
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApi()],
  css: { postcss: { plugins: [fluidType()] } },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
