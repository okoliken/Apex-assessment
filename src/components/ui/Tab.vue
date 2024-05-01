<template>
  <ul
    class="flex justify-center flex-col items-center cursor-pointer"
    @click="setActiveTab(list.value)"
  >
    <li
      ref="liRef"
      :class="{
        'text-darkGrey': !activeTabList,
        'font-semibold text-green-600': activeTabList,
        'w-[34px]': shorterTabWidth
      }"
      class="text-[15px] pb-2 text-center leading-[24px]"
    >
      {{ list.title }}
    </li>
    <div
      v-if="activeTabList"
      class="h-[2px] bg-green-500 rounded-full"
      :style="{ width: activeWidth }"
    ></div>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useBaseApiCall } from '@/composables/useBaseApiCall';
import type { TabList } from '@/utils/types'

const { list } = defineProps<{ list: TabList }>()
const liRef = ref<HTMLElement | null>(null)
const activeWidth = ref(list.value === 'all' ? '34' : '')

const dataStore = useDataStore()
const activeTabList = ref(list.value === dataStore.$state.selectedStatus.toLowerCase())
const shorterTabWidth = ref(list.value === 'all' || list.value === 'paid')

onMounted(() => {
  calculateWidth()
})

watch(
  () => dataStore.$state.selectedStatus,
  (newVal) => {
    activeTabList.value = list.value === newVal
    calculateWidth()
  }
)

function setActiveTab(value: string) {
  dataStore.setSelectedStatus(value)
  useBaseApiCall().refetchTransactions(dataStore.$state.currentPage, value)
}

function calculateWidth() {
  if (liRef.value && activeTabList.value) {
    activeWidth.value = `${liRef.value.offsetWidth}px`
  }
}
</script>
