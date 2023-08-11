import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore(
  "auth",
  () => {
    const userToken = ref("");
    const userRefreshToken = ref("");
    const user = ref({});
    const setUserToken = (token) => {
      userToken.value = token;
    };
    const setUserRefreshToken = (token) => {
      userRefreshToken.value = token;
    };
    const logout = () => {
      userToken.value = "";
      user.value = {};
      userRefreshToken.value = "";
    };

    const setUserData = (data) => {
      user.value = data;
    };

    async function updateUser(data) {
      try {
        const { data: newData } = await useApi("/api/organisations", {
          method: "PUT",
          body: JSON.stringify(data),
        });
        setUserData(newData.value);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
      }
    }
    async function refreshToken() {
      const router = useRouter();
      try {
        const { data } = await useFetch("/api/auth/refresh-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userRefreshToken.value}`,
          },
        });
        setUserToken(data.value.accessToken);
        setUserRefreshToken(data.value.refreshToken);
      } catch (error) {
        console.log(error);
        logout();
        router.push("/login");
      }
    }
    return {
      userToken,
      user,
      userRefreshToken,
      updateUser,
      setUserToken,
      refreshToken,
      setUserRefreshToken,
      setUserData,
      logout,
    };
  },
  {
    persist: true,
  }
);
