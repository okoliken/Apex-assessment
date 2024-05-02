<template>
    <div class="flex items-center justify-center space-x-2">
        <button :disabled="currentPage <= 1" @click="setCurrentPage(currentPage - 1)"
            class="p-2 text-gray-500 disabled:text-gray-300 h-[50px] w-[50px] rounded-full hover:bg-gray-100 flex items-center justify-center">
            <DropDown class="transform rotate-90" />
        </button>
        <template v-for="page in pagesToShow">
            <span v-if="page === '...'" :key="page + Math.random()" class="p-2 text-[#A0AEC0]">
                {{ page }}
            </span>
            <button v-else :key="page" :class="pageClass(page)" @click="setCurrentPage(Number(page))">
                {{ page }}
            </button>
        </template>
        <button :disabled="currentPage >= totalPages" @click="setCurrentPage(currentPage + 1)"
            class="p-2 text-[#A0AEC0] disabled:text-[#A0AEC0]/70 h-[50px] w-[50px] rounded-full hover:bg-gray-100 flex items-center justify-center">
            <DropDown class="transform -rotate-90" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import DropDown from '../icons/DropDown.vue'
import type { PaginationProps } from '@/utils/types'

const props = defineProps<PaginationProps>()
const emits =  defineEmits<(event: 'update:currentPage', value: number) => void>()
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
const currentPage = ref(props.currentPage)

const pagesToShow = computed(() => {
    const pages = []
    const radius = 1
    for (let i = 1; i <= totalPages.value; i++) {
        if (
            i === 1 ||
            i === totalPages.value ||
            (i >= currentPage.value - radius && i <= currentPage.value + radius)
        ) {
            pages.push(i)
        } else if (i === 2 && currentPage.value > 3) {
            pages.push('...')
        } else if (i === totalPages.value - 1 && currentPage.value < totalPages.value - 2) {
            pages.push('...')
        }
    }
    return pages
})

const setCurrentPage = (page: number) => {
    if (page < 1 || page > totalPages.value || typeof page === 'string') return
    currentPage.value = page
    emits('update:currentPage', page)
}

const pageClass = (page: number | string) => [
    'p-2',
    'rounded',
    typeof page === 'number' && page === currentPage.value
        ? 'bg-greenSoft text-greenDark font-bold w-[40px] h-[40px] rounded-[12px]'
        : 'text-[#A0AEC0]'
]
</script>
