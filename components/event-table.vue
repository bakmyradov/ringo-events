<script setup>
import { useAuthStore } from "@/store/auth";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});

const props = defineProps({
  eventList: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["search"]);
const allEvents = toRef(props, "eventList");
const config = useRuntimeConfig().public;

async function handleDelete(eventId) {
  const { data: deletedEvent, error } = await useApi(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  if (error.value) {
    console.log(error);
    return;
  }

  const eventIndex = allEvents.value.findIndex((e) => e.id === eventId);
  allEvents.value.splice(eventIndex, 1);
}
</script>

<template>
  <div
    class="relative overflow-hidden bg-white shadow-md dark:bg-custom-black-100 sm:rounded-lg"
  >
    <EventTableHeader @search="($event) => $emit('search', $event)" />
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-custom-black-300 dark:text-gray-50"
        >
          <tr>
            <th scope="col" class="px-4 py-3">Event</th>
            <th scope="col" class="px-4 py-3">Category</th>
            <th scope="col" class="px-4 py-3">People Count</th>
            <th scope="col" class="px-4 py-3">Last update</th>
            <th scope="col" class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="event in allEvents"
            :key="event.id"
            class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-custom-black-300 cursor-pointer"
            @click="$router.push(`/events/${event.id}`)"
          >
            <th
              scope="row"
              class="flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white py-2 px-4"
            >
              <div class="img-wrapper w-30 h-auto mr-4">
                <img
                  :src="`${config.API_URL}/api/photos/${event.mainPhotoId}`"
                  class="w-full h-full"
                />
              </div>
              {{ event.name }}
            </th>
            <td class="px-4 py-2">
              <span
                v-for="category in event.categories"
                class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300 mr-2"
                >{{ category.name }}</span
              >
            </td>
            <td
              class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex items-center">
                {{ event.peopleCount }} / {{ event.capacity }}
              </div>
            </td>
            <td
              class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ new Date(event.startTime).toISOString().slice(0, 10) }}
            </td>
            <td
              class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <button
                id="dropdownButton"
                data-dropdown-toggle="eventAction"
                class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button"
                @click.stop=""
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </button>
              <div
                id="eventAction"
                class="hidden z-10 w-34 bg-white rounded divide-y divide-gray-100 shadow dark:bg-custom-black-300 dark:divide-gray-500"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownButton"
                >
                  <li>
                    <NuxtLink
                      :to="`/events/edit/${event.id}`"
                      @click.stop
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-custom-black-200 dark:hover:text-white"
                      >Edit</NuxtLink
                    >
                  </li>
                </ul>
                <div class="py-1">
                  <span
                    @click.stop="handleDelete(event.id)"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-custom-black-200 dark:text-gray-200 dark:hover:text-white"
                    >Delete</span
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EventTableFooter />
  </div>
</template>
