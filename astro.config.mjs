import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://share.freetarot.fun',
  server: {
    port: 4000,
    host: true
  }
});
