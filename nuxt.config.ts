// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-proxy",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  build: { transpile: ["@fawmi/vue-google-maps", "vue-toastification"] },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      API_URL: process.env.API_URL,
    },
  },
  proxy: {
    options: {
      target: "http://127.0.0.1:8080",
      changeOrigin: true,
      pathFilter: ["/api"],
    },
  },
  css: ["@/assets/scss/style.scss", "vue-toastification/dist/index.css"],
  plugins: [{ src: "@/plugins/full-calendar.client.js", mode: "client" }],
});
