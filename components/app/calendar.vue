<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        weekends: false,
        events: [
          { title: "City Games", start: new Date() },
          { title: "Ice Skating", start: new Date("2023-04-06") },
        ],
      },
    };
  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped>
.fc {
  background-color: #1f2937;
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
