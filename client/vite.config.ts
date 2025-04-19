import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: "./build",
  },
  resolve: {
    alias: {
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@script": path.resolve(__dirname, "./src/script"),
      "@media": path.resolve(__dirname, "./src/media"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@globalWrappers": path.resolve(__dirname, "./src/globalWrappers"),
    },
  },
});
