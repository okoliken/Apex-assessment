<template>
  <div class="bg-[#fafafa] p-[16px] w-full rounded-[12px] h-[56px] relative">
    <div @click="openMenuDropDown" class="flex items-center justify-between cursor-pointer">
      <p class="text-[#111216] font-medium">{{ selectedOption }}</p>
      <div class="cursor-pointer">
        <DropDown @click.self="openMenuDropDown" />
      </div>
    </div>

    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <ul
        ref="elementRef"
        v-if="showMenuDropDown"
        class="w-[330px] h-auto shadow-softShade bg-white rounded-[12px] relative mt-6 transform py-0 px-[8px]"
      >
        <li
          @click="$emit('filter',option.title)"
          v-for="(option, index) in options"
          :key="index"
          class="p-[16px] relative cursor-pointer hover:bg-[#F9FAFB] rounded-[12px]"
        >
          <span :class="option.color" class="text-[#111827]">{{ option.title }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUtils } from '@/composables/useUtils'
import { useDataStore } from '@/stores/dataStore'
import DropDown from '../icons/DropDown.vue'
import type { Option } from '@/utils/types'

const { selectedOption, options } = defineProps<{
  selectedOption: string
  options?: Option[]
}>()

const showMenuDropDown = ref(false)

const openMenuDropDown = () => {
  showMenuDropDown.value = !showMenuDropDown.value
}

const { elementRef } = useUtils()

useUtils().useClickOutside(elementRef, () => {
  openMenuDropDown()
})
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
