import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  server: {
    port: 52260,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
})
