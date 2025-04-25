import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { qrcode } from 'vite-plugin-qrcode';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    qrcode({
      // options
      output: 'qrcode.png', // default
      size: 100, // default
      margin: 2, // default
      color: '#000000', // default
      background: '#ffffff', // default
      scale: 4, // default
      errorCorrectionLevel: 'L' // default
    })
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
