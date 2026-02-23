import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import wails from "@wailsio/runtime/plugins/vite";
import path from "path";

export default defineConfig({
  plugins: [svelte(), tailwindcss(), wails("./bindings")],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
