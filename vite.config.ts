import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    graphqlLoader(),
    federation({
      name: 'custom-component',
      filename: 'remoteEntry.js',
      exposes: {
        './main': './src/components',
      },
      shared: ['react', 'react-dom', 'zvm-code-context'],
    }),
  ],
  resolve: {
    alias: {
      '@/graphql': path.resolve('./src/graphql'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5819,
  },
  preview: {
    host: true,
    port: 6326,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
