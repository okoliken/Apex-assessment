<script setup lang="ts">
import FilterIcon from '@/assets/Filter.svg'
</script>

<template>
  <div class="p-5">
    <div class="flex items-center justify-end">
      <div
        class="w-[112px] h-[56px] rounded-[12px] p-[16px] cursor-pointer bg-[#fafafa] hover:bg-slate-100 border border-[#EEEFF2] flex items-center justify-center gap-x-2"
      >
        <img class="w-[24px] h-[24px]" :src="FilterIcon" alt="filter" />
        <p class="text-greenDark font-medium">Filters</p>
      </div>
    </div>
  </div>
</template>
