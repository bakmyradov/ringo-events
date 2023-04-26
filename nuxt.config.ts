// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/scss/style.scss"],
  plugins: ["@/plugins/full-calendar.client.js"],
});
