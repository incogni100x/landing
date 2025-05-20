import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'about-us': resolve(__dirname, 'src/about-us.html'),
        'contact-us': resolve(__dirname, 'src/contact-us.html'),
        'cookie-policy': resolve(__dirname, 'src/cookie-policy.html'),
        'fixed-deposit-calculator': resolve(__dirname, 'src/fixed-deposit-calculator.html'),
        'fixed-deposit': resolve(__dirname, 'src/fixed-deposit.html'),
        'mutual-funds-calculator': resolve(__dirname, 'src/mutual-funds-calculator.html'),
        'mutual-funds': resolve(__dirname, 'src/mutual-funds.html'),
        'privacy-policy': resolve(__dirname, 'src/privacy-policy.html'),
        'terms-of-service': resolve(__dirname, 'src/terms-of-service.html'),
      }
    }
  }
})
