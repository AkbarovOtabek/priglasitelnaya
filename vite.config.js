import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // .MP4 (заглавное расширение) по умолчанию не распознаётся как ассет — добавляем явно.
  assetsInclude: ['**/*.MP4', '**/*.MOV'],

  // Относительные пути к ассетам — работает и на Vercel (корень домена),
  // и на GitHub Pages (подпапка /priglasitelnaya/). Абсолютный '/priglasitelnaya/'
  // ломал загрузку ассетов на Vercel → белый экран.
  base: './',

  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
