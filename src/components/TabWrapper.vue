<template>
  <div class="w-[719px] h-[51px] border-b border-lightGray flex items-center gap-x-8">
    <Tab class="transform translate-y-[0.36em]" v-for="list in tabList" :key="list.id" :list="list" />
  </div>
</template>

<script setup lang="ts">
import { tabList } from '@/utils/data'
import { Tab } from '@/components/index'
</script>
