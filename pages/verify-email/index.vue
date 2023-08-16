<script setup>
import { useToast } from "vue-toastification";
definePageMeta({
  layout: "login",
  middleware: "is-authenticated",
});

const toast = useToast();

async function sendVerifactionLink() {
  const { error } = await useApi("/api/auth/send-verification-email", {
    method: "GET",
  });
  if (error.value) {
    console.log(error.value);
    toast.error("Error sending verification link " + error.value.statusCode);
    return;
  }
  toast.success("Verification link sent successfully");
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
        <div class="space-y-4 p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Verify your email
          </h1>
          <p class="text-gray-600 dark:text-gray-300 text-md">
            We have sent you an email with a link to verify your email address.
            Please click on the link to verify your email address. And
            <NuxtLink
              class="text-blue-700 hover:text-blue-500 hover:underline"
              to="/login"
              >login.</NuxtLink
            >
          </p>
          <p class="text-gray-600 dark:text-gray-300 text-md">
            If you did not recieve an email, click the button below.
          </p>
          <BaseButton class="w-full mt-8" @click="sendVerifactionLink"
            >Resend Link</BaseButton
          >
        </div>
      </div>
    </div>
  </section>
</template>
