<template>
  <ion-item>
    <ion-label>{{ label }}</ion-label>
    <ion-select v-model="selectedValue" :placeholder="placeholder">
      <ion-select-option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    label: String,
    options: Array,
    placeholder: String,
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);

    // Watch for changes in selectedValue and emit the input event
    watchEffect(() => {
      emit('update:modelValue', selectedValue.value);
    });

    return {
      selectedValue
    };
  }
};
</script>
