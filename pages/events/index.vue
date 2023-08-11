<script setup>
import { useAuthStore } from "@/store/auth";
import { useApi } from "@/composables/useApi";

definePageMeta({
  middleware: ["logged-in"],
});

const authStore = useAuthStore();
const searchQuery = ref("");
const filterCategories = ref([]);
const allEvents = ref([]);

async function fetchEvents() {
  const query = new URLSearchParams();
  query.append("hostId", authStore.user.id);
  if (searchQuery.value) {
    query.append("searchString", searchQuery.value);
  }
  if (filterCategories.value.length > 0) {
    query.append("categoryIds", filterCategories.value);
  }

  const { data: events, error } = await useApi(
    `/api/events?${query.toString()}`,
    {
      method: "GET",
      key: "events",
    }
  );

  if (error.value) {
    console.log(error);
    return;
  }
  allEvents.value = events.value;
  console.log(allEvents.value);
}

async function handleSearch(searchString) {
  searchQuery.value = searchString;
  await fetchEvents();
}

await fetchEvents();
</script>
<template>
  <section
    class="bg-gray-50 dark:bg-custom-black-200 py-3 sm:py-5 mt-18 min-h-screen"
  >
    <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <EventTable
        :event-list="allEvents"
        @search="($event) => handleSearch($event)"
      />
    </div>
  </section>
</template>
