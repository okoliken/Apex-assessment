<template>
  <button
    class="flex items-center justify-center py-[8px] px-[20px] font-bold text-white bg-greenDark rounded-[12px] hover:bg-green-600 transition-all duration-200">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text: string }>()
</script>
