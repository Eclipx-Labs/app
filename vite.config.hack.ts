import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/hack/",
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/hack"),
    emptyOutDir: true,
    target: "esnext",
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index-hack.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
