/* ============================================================
   vite.config.js · Configuración de Vite (el "compilador" de React).
   La web es estática: no hay servidor ni proxy /api.
   ============================================================ */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})