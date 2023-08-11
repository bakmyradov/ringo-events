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
});

async function handleChange() {
  await useFetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  toast.success("Password reset link sent to your email");
  formData.email = "";
}

const isError = ref(false);
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
            Forgot Password
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="handleChange"
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
            <BaseButton type="submit" class="w-full"> Submit </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
