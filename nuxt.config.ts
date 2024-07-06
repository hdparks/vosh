// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "shadcn-nuxt"
  ],
  tailwindcss:{
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first'}]
  }
});