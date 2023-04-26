import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FullCalendar);
  nuxtApp.vueApp.use(dayGridPlugin);
});
