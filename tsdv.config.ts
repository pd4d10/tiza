import { defineConfig } from "tsdv";
import rescript from "@jihchi/vite-plugin-rescript";

export default defineConfig({
  formats: ["es", "cjs"],
  vite: {
    plugins: [rescript()],
  },
});
