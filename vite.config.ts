import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                target: "http://192.168.18.173:5000",
                changeOrigin: true,
            },
        },
        watch: {
            usePolling: true,
        },
    },
})
