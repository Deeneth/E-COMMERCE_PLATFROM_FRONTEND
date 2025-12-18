
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> c0ff8a01fbaa60c3c944512d32a1ce8513e18bb6
