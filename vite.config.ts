import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  /* ---------- GitHub Pages ---------- */
  // All asset URLs need this prefix because the site will be served from
  // https://maljoode1978.github.io/digitize-archive-nexus/
  base: "/digitize-archive-nexus/",                    // ← NEW

  /* ---------- Dev server ---------- */
  server: {
    host: "::",
    port: 8080,
  },

  /* ---------- Plugins ---------- */
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  /* ---------- Path alias ---------- */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
