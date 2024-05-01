<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Header,
  Button,
  Table,
  TabWrapper,
  Card,
  Filter,
  FilterOptions,
  Pagination,
  Chip,
  Checked,
  Menu,
  MenuDropDown
} from '@/components/index'

import { type Status } from '@/utils/types'
import { useBaseApiCall } from './composables/useBaseApiCall'
import { useDataStore } from './stores/dataStore'
import { useUtils } from './composables/useUtils'

const fields = ref([
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'User  Status' },
  { key: 'payment_status', label: 'Payment  Status' },
  { key: 'amount', label: 'Amount' },
  { key: 'action', label: 'Action' }
])
const showFilterOptions = ref(false)
const { elementRef } = useUtils()

const updateCurrentPage = (newPage: number) => {
  useDataStore().$state.currentPage = newPage
  refetchTransactions(newPage)
}

const showDropDowns = ref(new Map<number, boolean>())
const itemId = ref(0)
const toggleDropdown = (id: number) => {
  itemId.value = id
  const currentState = showDropDowns.value.get(id) || false
  showDropDowns.value.set(id, !currentState)
  showDropDowns.value = new Map(showDropDowns.value)
}

const canPayDues = computed(() => {
  return useDataStore().$state.selectedTransactionIds.length > 0
    ? 'cursor-pointer'
    : 'cursor-not-allowed bg-opacity-30 hover:bg-greenDark/30'
})

const { filteredTransactions, refetchTransactions } = useBaseApiCall()
useUtils().useClickOutside(elementRef, () => {
  toggleDropdown(itemId.value)
})

const formatDates = (date: string) => {
  return useUtils().useDateFormat(date, 'DD MMM, YYYY').value || null
}
</script>

<template>
  <div>
    <Header />

    <div class="container max-w-full mx-auto my-12 px-16">
      <div class="flex items-center justify-between">
        <TabWrapper />
        <Button :class="[canPayDues]" class="w-full max-w-[254px] h-[56px]" text="Pay Dues" />
      </div>

      <Card>
        <div class="px-6">
          <Filter @click="showFilterOptions = !showFilterOptions" />
          <FilterOptions v-if="showFilterOptions" />
        </div>

        <div>
          <Table :items="filteredTransactions" :fields="fields">
            <template #cell(name)="{ item }">
              <div class="flex gap-x-8">
                <!-- checked -->
                <div
                  :class="[
                    !useDataStore().isSelected(item.id) ? 'border border-[#CBD5E0]' : 'border-none'
                  ]"
                  class="w-[20px] h-[20px] border border-[#CBD5E0] rounded-full mt-1 cursor-pointer flex items-center justify-center"
                  @click="useDataStore().toggleTransactionSelection(item.id)"
                >
                  <Checked class="w-[20px] h-[20px]" v-if="useDataStore().isSelected(item.id)" />
                </div>
                <div>
                  <p class="font-semibold text-[#111827]">{{ item.name }}</p>
                  <p class="text-[#88888A]">{{ item.email }}</p>
                </div>
              </div>
            </template>
            <template #cell(payment_status)="{ value, item }">
              <Chip :status="value as Status" />
              <p class="text-[#383A47] font-medium pt-2 text-[16px] break-normal">
                {{ useUtils().checkPaymentStatus(value as string) }}
                {{
                  useUtils().checkPaymentStatus(value as string) === 'Paid on:'
                    ? formatDates(String(item.payment_made_at))
                    : formatDates(String(item.payment_expected_at))
                }}
              </p>
            </template>
            <template #cell(status)="{ value, item }">
              <Chip :status="value as Status" />
              <p class="text-[#383A47] font-medium pt-2 text-[16px] break-normal">
                Last Login:
                {{ formatDates(String(item.login_date)) }}
              </p>
            </template>
            <template #cell(amount)="{ item }">
              <p class="font-semibold text-[#111827] mb-1">${{ item.amount }}</p>
              <p>{{ item.currency }}</p>
            </template>

            <template #cell(action)="{ item }">
              <Menu
                @close="
                  () =>
                    useUtils().useClickOutside(elementRef, () => {
                      toggleDropdown(item.id)
                    })
                "
                @click="toggleDropdown(item.id)"
                class="text-[32px]"
              />
              <Transition
                name="custom-classes"
                enter-active-class="animate__animated animate__rotateInDownRight animate__faster"
                leave-active-class="animate__animated animate__rotateOutUpRight animate__faster"
              >
                <MenuDropDown ref="elementRef" v-if="showDropDowns.get(item.id)" />
              </Transition>
            </template>
          </Table>
        </div>

        <div
          v-if="useDataStore().$state.transactions.length > 0"
          class="flex items-center justify-between p-7 my-4"
        >
          <div>
            <p class="font-normal text-[#718096]">Show result:</p>
          </div>
          <Pagination
            :totalItems="useDataStore().$state.total_items"
            :itemsPerPage="useDataStore().$state.per_page"
            :currentPage="useDataStore().$state.currentPage"
            @update:currentPage="updateCurrentPage"
          />
        </div>
      </Card>
    </div>
  </div>
</template>
