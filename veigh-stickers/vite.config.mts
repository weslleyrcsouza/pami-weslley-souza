import { defineConfig } from 'vite';

// Prévia local da exportação web. O desenvolvimento Expo usa npm run web.
export default defineConfig({
  root: 'dist',
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
});
