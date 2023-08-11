import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // If the user is not authenticated
  const authStore = useAuthStore();
  if (!authStore.userToken) {
    return navigateTo("/login");
  }
});
