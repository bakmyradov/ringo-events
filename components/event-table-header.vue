<script setup>
const searchQuery = ref("");

const { data: categories } = await useApi("/api/categories", {
  key: "categories",
});
const emit = defineEmits(["search"]);
// emit the search query to the parent component
function handleSearch() {
  emit("search", searchQuery.value);
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const processChange = debounce(() => handleSearch());
</script>

<template>
  <div
    class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4"
  >
    <div class="w-full md:w-1/2">
      <div class="flex items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-50"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-custom-black-300 dark:border-0 dark:placeholder-gray-50 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
            v-model="searchQuery"
            @input="processChange"
          />
        </div>
      </div>
    </div>
    <div class="right flex gap-x-4">
      <button
        id="filterDropdownButton"
        data-dropdown-toggle="filterDropdown"
        class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-custom-black-100 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-custom-black-300"
        type="button"
      >
        <IconsFilter />
        Filter
        <IconsChevronDown />
      </button>
      <div
        id="filterDropdown"
        class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Choose a category
        </h6>
        <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
          <li
            v-for="category in categories"
            :key="category.id"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="category.id"
              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              @input="filterByCategory(category.id)"
            />
            <label
              for="apple"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >{{ category.name }}</label
            >
          </li>
        </ul>
      </div>
      <div
        class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3"
      >
        <NuxtLink
          to="/events/create"
          class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <!-- <svg
            class="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg> -->
          Add new event
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
