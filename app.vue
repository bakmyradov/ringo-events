<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
// onMounted(() => {
//   initFlowbite();
// });
</script>

<template>
  <NuxtLayout>
    <AppSidebar />
    <AppHeader />
    <div class="wrapper ml-64 h-full mt-18">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
