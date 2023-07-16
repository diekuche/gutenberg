import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [tsconfigPaths(), react(), nodePolyfills()],
    
  };
});
