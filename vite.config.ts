import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "url";
import { viteSingleFile } from "vite-plugin-singlefile";
import postcss from "./postcss.config.js";

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    // Note: Remember to update tsconfig.json as well
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      { find: "@components", replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
      { find: "@router", replacement: fileURLToPath(new URL("./src/router", import.meta.url)) },
      { find: "@stores", replacement: fileURLToPath(new URL("./src/store", import.meta.url)) },
      { find: "@views", replacement: fileURLToPath(new URL("./src/views", import.meta.url)) },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html", // default
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  },
  css: {
    postcss,
  },
});