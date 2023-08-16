<script setup>
import { useAuthStore } from "@/store/auth";
import { initFlowbite } from "flowbite";
import { useToast } from "vue-toastification";

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const config = useRuntimeConfig().public;
function logout() {
  authStore.logout();
  router.push("/login");
}
onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <header
    class="h-18 w-[calc(100%-16rem)] fixed top-0 left-64 z-40 bg-white border-r border-gray-200 dark:bg-custom-black-100 dark:border-custom-black-300 flex justify-end items-center px-18"
  >
    <div class="user flex items-center cursor-pointer">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <span class="sr-only">Open user menu</span>
        <div
          class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-4 flex justify-center items-center"
        >
          <img
            :src="`${config.API_URL}/api/photos/${authStore.user.profilePictureId}`"
            alt=""
          />
        </div>
        {{ authStore.user.name }}
        <svg
          class="w-4 h-4 mx-1.5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdownAvatarName"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div
          @click="router.push('/profile')"
          class="px-4 py-3 text-sm text-gray-900 dark:text-white"
        >
          <div class="font-medium">{{ authStore.user.username }}</div>
          <div class="truncate">{{ authStore.user.email }}</div>
        </div>
        <div class="py-2">
          <button
            @click="logout"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
