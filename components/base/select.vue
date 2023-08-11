<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
function handleInput(event) {
  if (props.multiple) {
    let selectedValues = [];
    for (let i = 0; i < event.target.options.length; i++) {
      if (event.target.options[i].selected) {
        selectedValues.push(event.target.options[i].value);
      }
    }
    emit("update:modelValue", selectedValues);
    return;
  }

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
    <select
      id="category"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-custom-black-100 dark:border-custom-black-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :name="props.name"
      :value="props.modelValue"
      @input="handleInput"
    >
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option.id"
      >
        {{ option.name }} {{ option.symbol || "" }}
      </option>
    </select>
  </div>
</template>
