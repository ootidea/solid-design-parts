import postcssOKLabFunction from "@csstools/postcss-oklab-function";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), postcssOKLabFunction({ subFeatures: { displayP3: false } })],
    },
  },
});
