<template>
  <header
    class="h-18 w-[calc(100%-16rem)] fixed top-0 left-64 z-40 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex justify-end items-center px-8"
  >
    <div class="user flex items-center cursor-pointer">
      <h1 class="text-white font-bold mr-4">Admin</h1>
      <div
        class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <svg
          class="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  </header>
</template>
