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
    terserOptions: {
      compress: {
        // Two compression passes for better dead-code elimination
        passes: 2,
        // Drop all console.* calls in production
        drop_console: true,
        drop_debugger: true,
        // Mark pure function calls so terser can tree-shake them
        pure_funcs: ["console.log", "console.warn", "console.info"],
        // Inline small functions and constants
        inline: 2,
        // Remove unreachable code after dead-branch folding
        dead_code: true,
      },
      mangle: {
        // Shorten top-level variable names aggressively
        toplevel: true,
      },
      format: {
        // Strip all comments from output
        comments: false,
      },
    },
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
          // TanStack Query + Virtual — always used together
          if (
            id.includes("@tanstack/react-query") ||
            id.includes("@tanstack/react-virtual") ||
            id.includes("@tanstack/query-core") ||
            id.includes("@tanstack/virtual-core")
          ) {
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
