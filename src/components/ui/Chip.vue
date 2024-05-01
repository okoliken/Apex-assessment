<template>
  <div class="flex items-center space-x-2">
    <div
      :class="[
        'px-3 py-2 rounded-[8px] capitalize flex items-center justify-center gap-x-1',
        chipColor.color,
        'text-sm font-medium'
      ]"
    >
      <Circle :class="chipColor.color" class="w-[8px] h-[8px]" />
      <p>{{ status }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChipStatus, type Status } from '@/utils/types'
import Circle from '../icons/Circle.vue'
import { ref } from 'vue'
const props = defineProps<{
  status: Status
}>()

const chipColor = ref({
  color: ''
})

const chipStatus = () => {
  switch (props.status) {
    case 'all':
      chipColor.value.color = ChipStatus.ALL
      break
    case 'paid':
      chipColor.value.color = ChipStatus.PAID
      break
    case 'unpaid':
      chipColor.value.color = ChipStatus.UNPAID
      break
    case 'overdue':
      chipColor.value.color = ChipStatus.OVERDUE
      break
    case 'active':
      chipColor.value.color = ChipStatus.ACTIVE
      break
    case 'inactive':
      chipColor.value.color = ChipStatus.INACTIVE
      break

    default:
      break
  }
}

chipStatus()
</script>
