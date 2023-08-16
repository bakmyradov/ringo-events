import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuthStore().userToken) {
    return navigateTo("/");
  }
});
