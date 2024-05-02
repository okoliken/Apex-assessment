<template>
  <table class="w-full border-collapse -z-40">
    <thead v-if="items.length > 0 && !isLoading">
      <tr class="h-[72px] w-full">
        <th v-for="field in fields" :key="field.key"
            class="border-t border-b border-lightGray py-2 text-left text-[16px] font-semibold text-[#718096] px-12">
          {{ field.label }}
        </th>
      </tr>
    </thead>
    <tbody v-if="items.length > 0 && !isLoading">
      <tr  v-for="item in items" :key="item.id" class="h-[80px] border-t border-b border-lightGray">
        <td  v-for="(key, index) in displayedFieldKeys" :key="key"
            class="px-12 py-2 text-sm border-lightGray relative text-[#718096]">
          <slot :name="`cell(${key})`" :value="item[key]" :item="item">
            {{ item[key] }}
          </slot>
          <template v-if="index === displayedFieldKeys.length - 1">
              <div class="relative">
                <slot name="dropdown" :item="item"></slot>
              </div>
          </template>
        </td>
      </tr>
    </tbody>
    <tbody v-else-if="isLoading">
      <tr>
        <td class="w-full text-center align-middle py-24" colspan="12">
          <div class="flex items-center justify-center w-full">
            <Loader />
          </div>
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr>
        <td class="w-full text-center align-middle font-semibold py-24 text-gray-600" colspan="12">
            No Data Found
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
import { Loader } from '@/components/index'
const { isLoading } = storeToRefs(useDataStore())

interface TableField {
  key: string
  label: string
}

interface TableItem {
  id: number
  [key: string]: unknown
}

const props = defineProps<{
  fields: TableField[]
  items: TableItem[]
}>()

const displayedFieldKeys = computed(() => {
  return Object.entries(props.fields).map(([_key, value]) => value.key)
})
</script>

<style>
table {
  width: 100%;
  table-layout: fixed;
}

th,
td {
  text-align: left;
}

th:nth-child(1),
td:nth-child(1) {
  width: 37%;
}
th:nth-child(2),
td:nth-child(2) {
  width: 25%;
}
th:nth-child(3),
td:nth-child(3) {
  width: 25%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 15%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 18%;
}

@media screen and (max-width: 600px) {
  th,
  td {
    display: block;
    width: 100%;
  }
}
</style>
