<template>
  <div class="bg-white h-full min-h-[96px] p-2 w-full">
    <input
      :placeholder="placeholder"
      type="text"
      v-model="modelValue"
      class="p-[16px] rounded-[12px] bg-[#fafafa] appearance-none outline-none w-full"
    />
  </div>
</template>

<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder?: string }>()

const modelValue = defineModel()
</script>
