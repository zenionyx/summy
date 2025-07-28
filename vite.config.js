import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "mistriamart_favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Mistria Mart",
        short_name: "Mistria Mart",
        description:
          "An installable, offline-ready Fields of Mistria companion—search and browse every crop, fish and recipe in a familiar “shopping cart” interface, save favorites and plan your next harvest on the go.",
        theme_color: "#eff6ff",
        background_color: "eff6ff",
        icons: [
          {
            src: "icons/mistriamart_x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/mistriamart_x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          // maskable versions:
          {
            src: "icons/mistriamart_maskable_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/mistriamart_maskable_x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/mistriamart_maskable_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/mistriamart_maskable_x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
  },
});
