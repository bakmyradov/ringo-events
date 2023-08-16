<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
const authStore = useAuthStore();
const config = useRuntimeConfig().public;

const formData = {
  name: authStore.user.name,
  username: authStore.user.username,
  email: authStore.user.email,
  contacts: [],
  description: authStore.user.description,
};

for (const contact of authStore.user.contacts) {
  formData.contacts.push({
    title: contact.title,
    content: contact.content,
  });
}

const showContactModal = ref(false);
const updateContactForm = ref(null);

const formDataPassword = reactive({
  new: "",
  old: "",
  confirm: "",
});

const toast = useToast();
const router = useRouter();
definePageMeta({
  middleware: ["logged-in"],
});

async function changePassword() {
  if (formDataPassword.new !== formDataPassword.confirm) {
    toast.error("Passwords do not match");
    return;
  }
  const { error } = await useApi("/api/auth/change-password", {
    method: "POST",
    body: {
      password: formDataPassword.old,
      newPassword: formDataPassword.new,
    },
  });
  if (error.value) {
    console.log(error.value);
    toast.error("Error changing password " + error.value.statusCode);
    return;
  }
  formDataPassword.new = "";
  formDataPassword.old = "";
  formDataPassword.confirm = "";
  authStore.logout();
  router.push("/login");
  toast.success("Password changed successfully. Please login again");
}

function updateContactInfo(contact) {
  updateContactForm.value = contact;
  showContactModal.value = true;
}

function addContactInfo(data) {
  formData.contacts.push(data);
  authStore.updateUser(formData);
}

function deleteContactInfo(contact) {
  const index = formData.contacts.indexOf(contact);
  formData.contacts.splice(index, 1);
  authStore.updateUser(formData);
}

async function deleteAccount() {
  const value = confirm("Are you sure you want to delete your account?");
  if (!value) {
    return;
  }
  const { error } = await useApi("/api/organisations", {
    method: "DELETE",
  });
  if (error.value) {
    console.log(error.value);
    toast.error("Error deleting account " + error.value.statusCode);
    return;
  }
  authStore.logout();
  router.push("/login");
  toast.success("Account deleted successfully");
}

async function uploadProfilePic() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.hidden = true;
  input.click();
  input.onchange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);

    const { data, error } = await useApi("/api/organisations/profile-picture", {
      method: "PUT",
      body: formData,
    });
    if (error.value) {
      console.log(error.value);
      toast.error("Error uploading profile picture " + error.value.statusCode);
      return;
    }
    toast.success("Profile picture uploaded successfully");
    authStore.setUserData(data.value);
  };
}
</script>
<template>
  <div class="px-20 py-20">
    <div
      class="flex w-full bg-white border border-gray-200 px-8 py-6 rounded-lg shadow dark:bg-custom-black-100 dark:border-custom-black-300"
    >
      <div class="top w-full flex items-start">
        <div class="group avatar relative w-40 h-40" @click="uploadProfilePic">
          <img
            class="w-full h-full object-cover rounded-full"
            :src="`${config.API_URL}/api/photos/${authStore.user.profilePictureId}`"
            alt=""
          />
          <div
            class="hidden absolute top-0 left-0 w-full h-full bg-black/70 rounded-full cursor-pointer group-hover:flex items-center justify-center"
          >
            <IconsPen />
          </div>
        </div>
        <div class="ml-10 text-white">
          <h1 class="text-3xl font-bold">
            {{ authStore.user.name }}
          </h1>
          <p>
            <a href="#" class="text-lg mt-2 text-blue-500">{{
              authStore.user.email
            }}</a>
            -
            {{ authStore.user.username }}
          </p>
          <div class="w-140">
            <p class="mt-6">{{ authStore.user.description }}</p>
          </div>
          <div class="add-contacts p-4 mt-4 bg-custom-black-200 rounded-md">
            <div class="top flex items-center">
              <h1 class="text-white text-xl font-bold">Contacts</h1>
              <button
                @click="showContactModal = true"
                class="flex items-center ml-4"
              >
                <IconsPlus />
              </button>
            </div>
            <div class="items flex flex-col gap-y-4 mt-4">
              <div
                class="flex text-white text-lg cursor-pointer"
                v-for="contact in authStore.user.contacts"
                @click="deleteContactInfo(contact)"
              >
                <span class="font-bold">{{ contact.title }}:</span>
                <span class="text-md font-light ml-2 text-gray-50">{{
                  contact.content
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex ml-auto items-center">
          <svg
            class="w-5 h-5 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <p class="text-lg font-bold text-gray-900 dark:text-white">4.95</p>
          <span
            class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
          ></span>
          <a
            href="#"
            class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >73 reviews</a
          >
        </div>
      </div>
    </div>
    <div class="flex gap-x-8 mt-8">
      <div
        class="w-full bg-white border border-gray-200 px-8 py-6 rounded-lg shadow dark:bg-custom-black-100 dark:border-custom-black-300"
      >
        <div>
          <h1 class="text-white text-2xl font-bold">Update your information</h1>
          <BaseInput
            v-model="formData.name"
            label="Name"
            placeholder="Name"
            class="mt-4"
          />
          <BaseInput
            v-model="formData.username"
            label="Username"
            placeholder="Username"
            class="mt-4"
          />
          <BaseInput
            v-model="formData.email"
            label="Email"
            placeholder="Email"
            class="mt-4"
          />
          <BaseTextarea
            v-model="formData.description"
            label="Description"
            placeholder="Description"
            class="mt-4"
          />
          <BaseButton class="mt-6" @click="authStore.updateUser(formData)"
            >Submit</BaseButton
          >
        </div>
      </div>
      <div
        class="w-full h-auto bg-white border border-gray-200 px-8 py-6 rounded-lg shadow dark:bg-custom-black-100 dark:border-custom-black-300"
      >
        <div>
          <h1 class="text-white text-2xl font-bold">Change Password</h1>
          <BaseInput
            v-model="formDataPassword.old"
            label="Old Password"
            placeholder="Old Password"
            type="password"
            class="mt-4"
          />
          <BaseInput
            v-model="formDataPassword.new"
            label="New Password"
            placeholder="New Password"
            type="password"
            class="mt-4"
          />
          <BaseInput
            v-model="formDataPassword.confirm"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            type="password"
            class="mt-4"
          />
          <BaseButton class="mt-6" @click="changePassword()">Submit</BaseButton>
        </div>
      </div>
    </div>
    <div class="w-80 mt-8">
      <BaseButton @click="deleteAccount" color="danger"
        >Delete Account</BaseButton
      >
    </div>
    <ContactModal
      :show="showContactModal"
      @close="showContactModal = false"
      @addContact="($event) => addContactInfo($event)"
    />
  </div>
</template>
