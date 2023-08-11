import { useAuthStore } from "@/store/auth";
export const useApi = (request, opts) => {
  // const config = useRuntimeConfig().public;
  const authStore = useAuthStore();
  return useFetch(request, {
    baseURL: "http://127.0.0.1:8080",
    ...opts,
    onRequest: ({ request, options }) => {
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${authStore.userToken}`;
    },
    onResponseError: async (error) => {
      if (error.response.status === 401) {
        await authStore.refreshToken();
        return useFetch(request, {
          baseURL: "http://127.0.0.1:8080",
          headers: {
            Authorization: `Bearer ${authStore.userToken}`,
          },
          ...opts,
        });
      }
    },
  });
};
