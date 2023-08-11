<script setup>
definePageMeta({
  middleware: "logged-in",
});

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const event = ref({});
await fetchEvent();
async function fetchEvent() {
  const { data } = await useApi(`/api/events/${id}`, {
    method: "GET",
  });
  event.value = data.value;
  console.log(event.value);
}
function formatDate(event) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const startHours = String(startDate.getHours()).padStart(2, "0");
  const startMinutes = String(startDate.getMinutes()).padStart(2, "0");

  const endHours = String(endDate.getHours()).padStart(2, "0");
  const endMinutes = String(endDate.getMinutes()).padStart(2, "0");

  return `${startDate.toDateString()} starts at ${startHours}:${startMinutes} - ${endDate.toDateString()} ${endHours}:${endMinutes}`;
}
</script>
<template>
  <section
    class="w-full bg-custom-black-300 dark:text-white text-gray-500 p-10"
  >
    <div class="max-w-4xl mx-auto">
      <div class="img-wrapper w-full h-full">
        <img
          class="w-full h-[60vh] object-cover mb-10"
          :src="`http://localhost:8080/api/photos/${event.mainPhoto.highQualityId}`"
          alt=""
        />
      </div>
    </div>
    <div class="bg-custom-black-200 rounded-md p-5 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold">{{ event.name }}</h1>
      <div class="time flex items-center mt-10">
        <svg
          class="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p class="text-lg ml-2">
          {{ formatDate(event) }}
        </p>
      </div>
      <div class="location mt-2 flex items-center">
        <svg
          class="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p class="text-lg ml-2">{{ event.address }}</p>
      </div>
      <div class="price mt-2 flex items-center">
        <svg
          class="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16.5 7A2.5 2.5 0 0 1 19 4.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 1 1 0 5V12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5A2.5 2.5 0 0 1 16.5 7Z"
          />
        </svg>
        <p class="text-lg ml-2">{{ event.currency.symbol }}{{ event.price }}</p>
      </div>
      <div class="description">
        <p class="mt-10">{{ event.description }}</p>
      </div>
    </div>
  </section>
</template>
