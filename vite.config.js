// @ts-check

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
import fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  base: "/handa360/",
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",

            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images",
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 15
                            }
                        }
                    }
                ],
            },

            manifest: {
                name: "Handa360",
                short_name: "Handa360",
                description: "HANDA360 is an offline capable disaster-preparedness web application",
                theme_color: "#000000",
                background_color: "#000000",
                display: "standalone",

                icons: [
                    {
                        src: "pwa-192x192.webp",
                        sizes: "192x192",
                        type: "image/webp"
                    },
                    {
                        src: "pwa-512x512.webp",
                        sizes: "512x512",
                        type: "image/webp"
                    }
                ]
            }
        }),
    spaFallback()
  ],
})

function spaFallback() {
    return {
        name: "spa-fallback",
        writeBundle() {
            fs.copyFileSync("dist/index.html", "dist/404.html");
        }
    };
}