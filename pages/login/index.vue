<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
definePageMeta({
  middleware: ["redirect"],
});

const authStore = useAuthStore();
const toast = useToast();

definePageMeta({
  layout: "login",
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
              <div class="flex items-start">
                <!-- <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div> -->
                <!-- <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Remember me</label
                  >
                </div> -->
              </div>
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
