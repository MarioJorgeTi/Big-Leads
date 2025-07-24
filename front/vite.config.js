import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'primereact/inputtext',
      'primereact/toast',
      // inclua explicitamente todos os componentes que você estiver usando
    ]
  },
  resolve: {
    dedupe: ['react', 'react-dom'] // Evita duplicatas de react
  }
})
