<script setup>
import { useToast } from "vue-toastification";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Object || null,
    default: null,
  },
});

const toast = useToast();

const emit = defineEmits(["close", "add-contact"]);

const title = ref("");
const content = ref("");

// watch isUpdate to set the title and content
// watch(
//   () => props.isUpdate,
//   (val) => {
//     if (val) {
//       title.value = val.title;
//       content.value = val.content;
//     }
//   }
// );

function addContact() {
  if (!title.value || !content.value) {
    toast.error("Please fill in all fields");
    return;
  }
  const contactForm = {
    title: title.value,
    content: content.value,
    ordinal: 1,
  };
  emit("add-contact", contactForm);
  title.value = "";
  content.value = "";
  emit("close");
}
</script>

<template>
  <div
    v-if="show"
    id="authentication-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-black bg-opacity-50"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-custom-black-300">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="$emit('close')"
        >
          <IconsClose />
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-6 text-xl font-medium text-gray-900 dark:text-white">
            Add contact info
          </h3>
          <div class="space-y-6">
            <BaseInput
              type="text"
              name="title"
              label="Title"
              id="title"
              placeholder="Instagram"
              v-model="title"
              required
            />
            <BaseInput
              type="text"
              name="content"
              label="Content"
              id="value"
              placeholder="@username"
              v-model="content"
              required
            />
            <button
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="addContact()"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
