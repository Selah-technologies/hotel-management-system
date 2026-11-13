import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The handbook (Chapter 31) allows the web app on 5173 and the staff app on 5174.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true },
});