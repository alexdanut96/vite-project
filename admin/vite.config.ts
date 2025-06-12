import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const endpoint = env.VITE_API_ENDPOINT;

  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        "/api": {
          target: endpoint,
          changeOrigin: true,
          secure: false,
        },
      },
    },
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
  };
});
