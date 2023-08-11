<script setup>
import { useAuthStore } from "@/store/auth";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useToast } from "vue-toastification";
import "@vuepic/vue-datepicker/dist/main.css";

definePageMeta({
  middleware: "logged-in",
});

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);
const page = ref("info");
const mainPhoto = ref(0);
const markers = reactive([]);
const photosToDisplay = ref([]);
const currentPhotos = ref([]);
const { id } = route.params;
const toast = useToast();
const event = ref({});

const formData = reactive({
  name: "",
  description: "",
  address: "",
  coordinates: {
    latitude: 0,
    langitutde: 0,
  },
  price: 0,
  currencyId: "",
  dates: "",
  categoryIds: [],
  capacity: 0,
  isTicketNeeded: false,
  photos: [],
});

const { data: currencies } = await useApi("/api/currencies", {
  key: "currencies",
});
const { data: categories } = await useApi("/api/categories", {
  key: "categories",
});

function mark(event) {
  markers.pop();
  markers.push({
    position: {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    },
  });
}

function handelFileInput() {
  const file = fileInput.value.files[0];
  formData.photos.push(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    photosToDisplay.value.push(e.target.result);
  };
  reader.readAsDataURL(file);
}

async function deletePhoto(photoId) {
  const { error } = await useApi(`/api/events/${id}/remove-photo/${photoId}`, {
    key: "deletePhoto",
    method: "PUT",
  });
  if (error.value) {
    console.error(error);
    toast.error("Something went wrong");
    return;
  }
  toast.success("Photo deleted successfully");
  const index = currentPhotos.value.indexOf(photoId);
  currentPhotos.value.splice(index, 1);
}

async function handleSubmit() {
  try {
    const prettyData = {
      name: formData.name,
      address: formData.address,
      description: formData.description,
      coordinates: {
        langitutde: markers[0].position.lat,
        latitude: markers[0].position.lng,
      },
      price: formData.price,
      currencyId: formData.currencyId,
      startTime: new Date(formData.dates[0]).toISOString().split(".")[0],
      endTime: new Date(formData.dates[0]).toISOString().split(".")[0],
      categoryIds: [parseInt(formData.categoryIds)],
      capacity: formData.capacity,
      isTicketNeeded: formData.isTicketNeeded,
    };
    const { data } = await useApi("/api/events/" + route.params.id, {
      key: "event",
      method: "PUT",
      body: JSON.stringify(prettyData),
    });
    // dont send photos if there are no new photos added or deleted
    if (formData.photos.length === 0) {
      router.push(`/events`);
      return;
    }
    for (const photo of formData.photos) {
      const formData = new FormData();
      formData.append("file", photo);
      const { data: photoData, error } = await useApi(
        `/api/events/${data.value.id}/add-photo`,
        {
          key: "photo",
          method: "PUT",
          body: formData,
        }
      );
      if (error.value) {
        console.error(error);
      }
      mainPhoto.value = photoData.value.photos[0].id;
    }
    router.push(`/events`);
  } catch (error) {
    console.log(error);
  }
}

await fetchEvent();
async function fetchEvent() {
  const { data } = await useApi(`/api/events/${id}`, {
    method: "GET",
  });
  console.log(data.value);
  formData.name = data.value.name;
  formData.address = data.value.address;
  formData.description = data.value.description;
  formData.price = data.value.price;
  formData.currencyId = data.value.currency.id;
  formData.dates = [data.value.startTime, data.value.endTime];
  formData.categoryIds = data.value.categories.map((c) => c.id);
  formData.capacity = data.value.capacity;
  formData.isTicketNeeded = data.value.isTicketNeeded;
  mainPhoto.value = data.value.mainPhoto.highQualityId;
  markers.push({
    position: {
      lat: Number(data.value.coordinates.longitude),
      lng: Number(data.value.coordinates.latitude),
    },
  });
  currentPhotos.value = data.value.photos.map((p) => p);
}
</script>
<template>
  <section class="bg-white dark:bg-custom-black-200 p-10">
    <div
      class="py-8 px-4 mx-auto max-w-2xl lg:py-8 bg-custom-black-300 rounded-md"
    >
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update an event
      </h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="page === 'info'">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <BaseInput
              label="Event Name"
              placeholder="Event Name"
              class="sm:col-span-2"
              v-model="formData.name"
            />
            <BaseInput
              label="Address"
              placeholder="Address"
              class="sm:col-span-2"
              v-model="formData.address"
            />
            <BaseInput
              label="Price"
              placeholder="Price"
              class="sm:col-span-1"
              v-model="formData.price"
            />
            <BaseSelect
              label="Currency"
              placeholder="Currency"
              :options="currencies"
              class="sm:col-span-1"
              v-model="formData.currencyId"
            />
            <BaseInput
              type="number"
              label="Capacity"
              placeholder="Capacity"
              class="sm:col-span-2"
              v-model="formData.capacity"
            />
            <BaseSelect
              label="Categories"
              :options="categories"
              placeholder="Select categories"
              class="sm:col-span-2"
              v-model="formData.categoryIds"
            />
            <BaseTextarea
              label="Description"
              placeholder="Your description here"
              class="sm:col-span-2"
              v-model="formData.description"
            />
            <VueDatePicker
              class="sm:col-span-2"
              dark
              v-model="formData.dates"
              range
            ></VueDatePicker>
          </div>
          <label class="relative inline-flex items-center cursor-pointer mt-8">
            <input
              v-model="formData.isTicketNeeded"
              type="checkbox"
              value=""
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span
              class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Is Ticket needed</span
            >
          </label>
          <div class="map mt-8">
            <h1 class="text-white mb-2">Select the address on the map:</h1>
            <GMapMap
              ref="myMarker"
              style="width: 100%; height: 500px"
              :center="{ lat: 51.093048, lng: 6.84212 }"
              :zoom="4"
              map-type-id="terrain"
              :options="{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }"
              @click="mark"
            >
              <GMapMarker
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
              />
            </GMapMap>
          </div>
        </div>
        <div class="photos" v-else>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF up to 10MB
                </p>
              </div>
              <input
                ref="fileInput"
                @change="handelFileInput()"
                id="dropzone-file"
                type="file"
                class="hidden"
              />
            </label>
          </div>
          <div class="flex mt-8 gap-6 flex-wrap">
            <div
              v-for="photo in photosToDisplay"
              class="relative photo-item w-40 h-40"
            >
              <img :src="photo" alt="" class="w-full h-full object-cover" />
            </div>
            <div class="group photo-item w-40 h-40 relative">
              <img
                :src="`http://localhost:8080/api/photos/${mainPhoto}`"
                alt=""
                class="w-full h-full object-cover"
              />
              <button
                @click="deletePhoto(mainPhoto)"
                type="button"
                class="hidden absolute -top-2 -right-2 w-6 h-6 rounded-full group-hover:flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
                  />
                </svg>
              </button>
            </div>
            <div
              v-if="currentPhotos.length > 0"
              v-for="photo in currentPhotos"
              class="group relative photo-item w-40 h-40"
            >
              <img
                :src="`http://localhost:8080/api/photos/${photo.normalId}`"
                alt=""
                class="w-full h-full object-cover"
              />
              <button
                @click="deletePhoto(photo.id)"
                type="button"
                class="hidden absolute -top-2 -right-2 w-6 h-6 rounded-full group-hover:flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="page === 'info'"
          type="button"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          @click="page = 'photo'"
        >
          Next
        </button>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          v-else
        >
          Add Event
        </button>
        <button
          class="text-white ml-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-custom-black-100 dark:hover:bg-custom-black-300 dark:focus:ring-gray-700 dark:border-custom-black-300"
          v-if="page === 'photo'"
          @click="page = 'info'"
        >
          Back
        </button>
        <NuxtLink
          to="/events"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-100 ml-4"
        >
          Cancel
        </NuxtLink>
      </form>
    </div>
  </section>
</template>

<style>
.dp__theme_dark {
  --dp-background-color: #374151;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>
