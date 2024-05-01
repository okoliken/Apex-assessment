<template>
  <div class="bg-white h-full min-h-[96px] flex items-center justify-between px-16">
    <div>
      <h3 class="font-bold text-[#111827]">Table Heading</h3>
    </div>

    <div class="flex items-center gap-x-4">
      <img :src="Avatar" alt="avatar" />
      <div>
        <h4 class="font-bold text-[#111827]">Tynisha Obey</h4>
        <p class="text-[12px] text-[#718096]">Makostore</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/Avatar.png'
</script>
