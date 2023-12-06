import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    Inspect({ build: true, outputDir: '.vite-inspect' }), // after build, the inspector will be generated under .vite-inspect where you can use npx serve .vite-inspect to check the result
  ],
  resolve: {
    // https://medium.com/@pushplaybang/absolutely-dont-use-relative-paths-imports-in-your-vite-react-project-c8593f93bbea
    alias: {
      src: '/src',
      assets: '/src/assets',
      components: '/src/components',
      lib: '/src/lib',
      features: '/src/features',
    },
  },
  build: {
    watch: {
      // https://rollupjs.org/configuration-options/#watch
      buildDelay: 0, // default
      clearScreen: true,
      exclude: 'node_modules/**',
      include: 'src/**',
      skipWrite: true, // default is false. When true, the generated assets are kept and served from memory, resulting in faster builds and reloads during development
    },
  },
  server: {
    fs: {
      strict: true, // default true, restrict serving files outside of workspace root
    },
    // warmup: {
    //   clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'],
    //   ssrFiles: ['./src/server/modules/*.js'],
    // },
  },
});
