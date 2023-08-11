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
    type: [String, Number],
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
  error: {
    type: Boolean,
    default: false,
  },
});

// all props to refs with "toRefs"
const { error } = toRefs(props);

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
      :class="{
        '!text-red-500 !dark:text-red-500': error,
      }"
      >{{ props.label }}</label
    >
    <input
      :type="props.type"
      :name="props.name"
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-custom-black-100 dark:border-custom-black-300 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{
        'dark:border-red-500 border-red-500 !text-red-500 !dark:text-red-500 bg-red-50 dark:bg-red-50 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500':
          error,
      }"
      :placeholder="props.placeholder"
      :required="props.required"
      :value="props.modelValue"
      :autocomplete="autocomplete"
      @input="handleInput"
    />
  </div>
</template>
