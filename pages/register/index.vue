<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
definePageMeta({
  layout: "login",
});

const authStore = useAuthStore();
const toast = useToast();
const currentStage = ref(1);
const formData = reactive({
  email: "",
  name: "",
  username: "",
  password: "",
  contacts: [],
  confirmPassword: "",
  description: "",
});

const isError = ref(false);
const config = useRuntimeConfig().public;

const router = useRouter();
const showContactModal = ref(false);

function checkFormAndNext(page) {
  if (page === 1) {
    if (
      formData.email === "" &&
      !formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      isError.value = true;
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.username === "") {
      isError.value = true;
      toast.error("Please enter a username");
      return;
    }
  } else if (page === 2) {
    if (formData.name === "" || formData.description === "") {
      isError.value = true;
      toast.error("Please fill in all fields");
      return;
    }
  } else if (page === 3) {
    if (formData.password === "" || formData.confirmPassword === "") {
      isError.value = true;
      toast.error("Please fill in all fields");
      return;
    }
  }
  isError.value = false;
  currentStage.value = page + 1;
}

function goBack(page) {
  if (page === 1) {
    router.push("/login");
  } else {
    currentStage.value = page - 1;
  }
}

function addContactInfo(data) {
  formData.contacts.push(data);
  showContactModal.value = false;
}

function deleteContactInfo(index) {
  formData.contacts.splice(index, 1);
}

async function handleSubmit() {
  if (formData.password !== formData.confirmPassword) {
    isError.value = true;
    toast.error("Passwords do not match");
    return;
  }

  const { error: registerError, data: registerData } = await useFetch(
    `${config.apiUrl}/api/organisations/sign-up`,
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

  const { error: loginError, data: loginData } = await useApi(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(loginForm),
    }
  );
  if (loginError.value) {
    toast.error("Something went wrong. Please login manually.");
    router.push("/login");
    return;
  }

  authStore.setUserToken(loginData.value.accessToken);
  authStore.setUserRefreshToken(loginData.value.refreshToken);

  router.push("/verify-email");
}
</script>
<template>
  <section class="bg-gray-50 dark:bg-custom-black-100 h-screen">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
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

      <ol
        class="flex items-center w-2/3 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base my-8"
      >
        <li
          class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 text-blue-600 dark:text-blue-500"
        >
          <span
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
          >
            <IconsBlueCheckIcon />
            <!-- <span class="mr-2">1</span> -->
            Personal <span class="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
        <li
          class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 text-blue-600 dark:text-blue-500"
        >
          <span
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
          >
            <IconsBlueCheckIcon />
            <!-- <span class="mr-2" v-else>2</span> -->
            Account <span class="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
        <li class="flex items-center text-blue-600 dark:text-blue-500">
          <IconsBlueCheckIcon />
          <!-- <span class="mr-2" v-else>3</span> -->
          Confirmation
        </li>
      </ol>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-xl xl:p-0 dark:bg-custom-black-200 dark:border-custom-black-300"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create an account
          </h1>
          <form class="" action="#" @submit.prevent="handleSubmit">
            <div v-if="currentStage === 1" class="first space-y-4 md:space-y-6">
              <BaseInput
                label="Email address"
                type="email"
                name="email"
                placeholder="name@company.com"
                v-model="formData.email"
                required
                :error="isError"
              />
              <BaseInput
                label="Username"
                type="text"
                name="username"
                placeholder="johndoe"
                required
                v-model="formData.username"
                :error="isError"
              />
              <BaseButton @click="checkFormAndNext(1)">Next</BaseButton>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <NuxtLink
                  to="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login here</NuxtLink
                >
              </p>
            </div>
            <div
              class="second space-y-4 md:space-y-6"
              v-else-if="currentStage === 2"
            >
              <BaseInput
                label="Your company name"
                type="text"
                name="name"
                required
                placeholder="Ringo-events"
                v-model="formData.name"
                :error="isError"
              />
              <BaseTextarea
                label="About your company"
                name="description"
                placeholder="Tell us about your company"
                v-model="formData.description"
              />
              <div class="add-contacts mt-4">
                <div class="top flex items-center">
                  <h1 class="text-white text-xl font-bold">Contacts</h1>
                  <button
                    type="button"
                    @click="showContactModal = true"
                    class="flex items-center ml-4"
                  >
                    <IconsPlus />
                  </button>
                </div>
                <div class="items flex flex-col gap-y-4 mt-4">
                  <div
                    class="flex text-white text-lg cursor-pointer"
                    v-for="contact in formData.contacts"
                    @click="deleteContactInfo(contact)"
                  >
                    <span class="font-bold">{{ contact.title }}:</span>
                    <span class="text-md font-light ml-2 text-gray-50">{{
                      contact.content
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-x-4">
                <BaseButton color="gray" @click="goBack(2)">Back</BaseButton>
                <BaseButton @click="checkFormAndNext(2)">Next</BaseButton>
              </div>
            </div>
            <div
              class="third space-y-4 md:space-y-6"
              v-else-if="currentStage === 3"
            >
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
              <div class="flex gap-x-4">
                <BaseButton color="gray" @click="goBack(3)">Back</BaseButton>
                <BaseButton type="submit">Create account</BaseButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <ContactModal
    :show="showContactModal"
    @close="showContactModal = false"
    @addContact="($event) => addContactInfo($event)"
  />
</template>
