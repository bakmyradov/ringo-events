<script setup>
import { v4 as uuidv4 } from "uuid";
const id = uuidv4();
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "off",
  },
});

// define emits for v-model
const emit = defineEmits(["update:modelValue"]);

function handleInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div>
    <label
      :for="props.name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ props.label }}</label
    >
    <textarea
      :id="id"
      :name="props.name"
      rows="8"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-custom-black-100 dark:border-custom-black-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :placeholder="props.placeholder"
      :required="props.required"
      :value="props.modelValue"
      @input="handleInput"
    ></textarea>
  </div>
</template>
