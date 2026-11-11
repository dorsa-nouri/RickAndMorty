// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
        title: "Rick and Morty Explorer",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "https://rickandmortyapi.com/api",
    },
  },
});
