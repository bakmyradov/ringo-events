<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: {
    FullCalendar,
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        weekends: false,
        events: [{ title: "Open Call", start: new Date() }],
      },
    };
  },
  mounted() {
    const grids = document.querySelectorAll(".fc-daygrid-day-events");
    // if grid has child node with class 'fc-daygrid-event-harness' then set image to parent element with the class of 'fc-daygrid-day-frame'
    grids.forEach((grid) => {
      if (grid.childNodes[0].classList.contains("fc-daygrid-event-harness")) {
        grid.parentNode.style.backgroundImage =
          "url('https://tallinn.esn.ee/sites/default/files/events/images/oc.jpg')";
        grid.parentNode.style.backgroundSize = "cover";
        grid.parentNode.style.backgroundPosition = "center";
        grid.parentNode.style.backgroundRepeat = "no-repeat";
        grid.parentNode.style.borderRadius = "0.5rem";
      }
    });
  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped>
.fc {
  background-color: #100f0f;
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
