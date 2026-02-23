import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split CSS per chunk so only the route's CSS loads
    cssCodeSplit: true,
    minify: "terser",
    // Raise warning threshold — large deps live in vendor chunk
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React runtime — tiny, cached forever
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }
          // Router
          if (id.includes("node_modules/react-router")) {
            return "router-vendor";
          }
          // TanStack Query
          if (id.includes("@tanstack/react-query")) {
            return "query-vendor";
          }
          // Firebase — large, rarely changes
          if (
            id.includes("node_modules/firebase") ||
            id.includes("node_modules/@firebase")
          ) {
            return "firebase-vendor";
          }
        },
      },
    },
  },
});
