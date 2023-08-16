<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
const authStore = useAuthStore();
const toast = useToast();

definePageMeta({
  layout: "login",
  title: "Login",
  middleware: ["is-authenticated"],
});

const formData = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const isError = ref(false);

async function handleLogin() {
  const { error, data } = await useFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (error.value) {
    isError.value = true;
    toast.error("Invalid credentials");
    return;
  }

  authStore.setUserToken(data.value.accessToken);
  authStore.setUserRefreshToken(data.value.refreshToken);

  const { data: userData } = await useFetch("/api/organisations", {
    headers: {
      Authorization: `Bearer ${data.value.accessToken}`,
    },
  });
  console.log(userData.value);
  authStore.setUserData(userData.value);
  router.push("/events");

  formData.username = "";
  formData.password = "";
}
</script>
<template>
  <section class="bg-gray-50 dark:bg-custom-black-100">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <div class="w-8 h-8 mr-2">
          <IconsIconLogo />
        </div>
        Ringo Events
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-custom-black-200 dark:border-custom-black-300"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Log In
          </h1>
          <div class="flex justify-between">
            <button
              type="button"
              class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                class="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
            <button
              type="button"
              class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
            >
              <svg
                class="w-5 h-5 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              Sign in with Apple
            </button>
          </div>
          <div class="flex items-center text-white">
            <span class="w-full h-[2px] bg-custom-black-300"></span>
            <span class="px-5">or</span>
            <span class="w-full h-[2px] bg-custom-black-300"></span>
          </div>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="handleLogin"
          >
            <BaseInput
              label="Your email"
              type="email"
              name="email"
              placeholder="johndoe@comany.com"
              required
              v-model="formData.email"
              :error="isError"
            />
            <BaseInput
              label="Your password"
              type="password"
              name="password"
              placeholder="********"
              required
              v-model="formData.password"
              :error="isError"
            />
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
              <NuxtLink
                to="/forgot-password"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</NuxtLink
              >
            </div>
            <BaseButton type="submit" class="w-full"> Log In </BaseButton>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?
              <NuxtLink
                to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Register here</NuxtLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
