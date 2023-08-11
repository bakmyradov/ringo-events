<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
definePageMeta({
  layout: "login",
});

const authStore = useAuthStore();
const toast = useToast();
const formData = reactive({
  email: "",
  name: "",
  username: "",
  contacts: "",
  password: "",
  confirmPassword: "",
});
const isError = ref(false);

const router = useRouter();
async function handleSubmit() {
  // TODO: validate form
  if (formData.password !== formData.confirmPassword) {
    isError.value = true;
    toast.error("Passwords do not match");
    return;
  }

  const { error: registerError, data: registerData } = await useFetch(
    "/api/organisations/sign-up",
    {
      method: "POST",
      body: JSON.stringify(formData),
    }
  );
  if (registerError.value) {
    console.log("error", registerError.value);
    isError.value = true;
    toast.error("Something went wrong. Please try again.");
    return;
  }

  let loginForm = {
    email: formData.email,
    password: formData.password,
  };

  formData.email = "";
  formData.name = "";
  formData.username = "";
  formData.contacts = "";
  formData.password = "";
  formData.confirmPassword = "";

  const { error: loginError, data: loginData } = await useFetch(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(loginForm),
    }
  );
  if (loginError.value) {
    console.log("error", loginError.value);
    isError.value = true;
    toast.error("Problem loggin in automatically");
    router.push("/login");
  }
  authStore.setUserToken(loginData.value.accessToken);
  authStore.setUserRefreshToken(loginData.value.refreshToken);
  authStore.setUserData(registerData.value);
  router.push("/events");
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
            Create an account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="handleSubmit"
          >
            <BaseInput
              label="Your email address"
              type="email"
              name="email"
              placeholder="name@company.com"
              v-model="formData.email"
              required
              :error="isError"
            />
            <BaseInput
              label="Your company name"
              type="text"
              name="name"
              placeholder="Ringo-events"
              required
              v-model="formData.name"
              :error="isError"
            />
            <BaseInput
              label="Your username"
              type="text"
              name="username"
              placeholder="johndoe"
              required
              v-model="formData.username"
              :error="isError"
            />
            <BaseInput
              label="Your contact number"
              type="tel"
              name="contact"
              placeholder="1234567890"
              required
              v-model="formData.contacts"
              :error="isError"
            />
            <BaseInput
              label="Your password"
              type="password"
              name="password"
              placeholder="********"
              required
              v-model="formData.password"
              autocomplete="new-password"
              :error="isError"
            />
            <BaseInput
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="********"
              required
              v-model="formData.confirmPassword"
              autocomplete="new-password"
              :error="isError"
            />

            <BaseButton type="submit">Create account</BaseButton>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <NuxtLink
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Login here</NuxtLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
