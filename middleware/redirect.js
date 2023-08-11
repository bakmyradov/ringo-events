import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (authStore.userToken) {
    return navigateTo("/events");
  }
});
