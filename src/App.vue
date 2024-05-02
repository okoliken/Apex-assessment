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
  MenuDropDown,
  DropDown
} from '@/components/index'

import { Toaster } from 'vue-sonner'
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
const { elementRef, formatDates } = useUtils()

const updateCurrentPage = (newPage: number) => {
  useDataStore().$state.currentPage = newPage
  refetchTransactions(newPage)
}

const showDropDowns = ref(new Map<number, boolean>())
const showPerPageMenu = ref(false)
const itemId = ref(0)
const perPageRef = ref<HTMLElement | null>(null)
const toggleDropdown = (id: number) => {
  itemId.value = id
  const currentState = showDropDowns.value.get(id) || false
  showDropDowns.value.set(id, !currentState)
  showDropDowns.value = new Map(showDropDowns.value)
}

const canPayDues = computed(() => {
  return useDataStore().$state.selectedTransactionIds.length > 0 || !isPayingUp
    ? 'cursor-pointer'
    : 'cursor-not-allowed bg-opacity-30 hover:bg-greenDark/30'
})

const { filteredTransactions, refetchTransactions, isPayingUp, handlePayment, setItemsPerPage } =
  useBaseApiCall()

const closeMenuOnClickOutside = () => {
  useUtils().useClickOutside(elementRef, () => {
    toggleDropdown(itemId.value)
  })
}

const closePerPageMenu = (page_number?: number) => {
  if (page_number) {
    setItemsPerPage(page_number)
    showPerPageMenu.value = false
  } else {
    useUtils().useClickOutside(perPageRef, () => {
      showPerPageMenu.value = false
    })
  }
}
closePerPageMenu()
closeMenuOnClickOutside()


const closeMenu = () => {
  showDropDowns.value.delete(itemId.value)
}
</script>

<template>
  <div>
    <Header />

    <div class="container max-w-full mx-auto my-12 px-16">
      <div class="flex items-center justify-between">
        <TabWrapper />
        <Button
          @click="canPayDues ? handlePayment() : null"
          :class="[canPayDues]"
          class="w-full max-w-[254px] h-[56px]"
          :text="isPayingUp ? 'Paying dues...' : 'Pay Dues'"
        />
      </div>

      <Card>
        <div class="px-6 relative z-50 w-auto">
          <Filter @open="showFilterOptions = !showFilterOptions" />
          <FilterOptions v-if="showFilterOptions" />
        </div>

        <div>
          <Table :items="filteredTransactions" :fields="fields">
            <template #cell(name)="{ item }">
              <div class="flex gap-x-8">
                <div
                  :class="[
                    !useDataStore().isSelected(item.id) ? 'border border-[#CBD5E0]' : 'border-none'
                  ]"
                  class="w-[20px] h-[20px] border border-[#CBD5E0] rounded-full mt-1 cursor-pointer flex items-center justify-center"
                  @click="
                    useDataStore().toggleTransactionSelection(
                      item.id,
                      item.payment_status as string
                    )
                  "
                >
                  <Checked class="w-[20px] h-[20px]" v-if="useDataStore().isSelected(item.id)" />
                </div>
                <div class="flex items-start justify-start flex-col">
                  <p class="font-semibold text-[#111827]">{{ item.name }}</p>
                  <p class="text-[#88888A]">{{ item.email }}</p>
                </div>
              </div>
            </template>
            <template #cell(payment_status)="{ value, item }">
              <Chip :status="value as Status" />
              <p class="text-[#383A47] font-medium pt-2 text-[16px] break-keep">
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
              <p class="text-[#383A47] font-medium pt-2 text-[16px] break-keep -z-50">
                Last Login:
                {{ formatDates(String(item.login_date)) }}
              </p>
            </template>
            <template #cell(amount)="{ item }">
              <p class="font-semibold text-[#111827] mb-1">${{ item.amount }}</p>
              <p>{{ item.currency }}</p>
            </template>

            <template #cell(action)="{ item }">
              <Menu @click="toggleDropdown(item.id)" class="text-[32px]" />
              <Transition
                name="custom-classes"
                enter-active-class="animate__animated animate__rotateInDownRight animate__faster"
                leave-active-class="animate__animated animate__rotateOutUpRight animate__faster"
              >
                <MenuDropDown
                  @close="closeMenu"
                  ref="elementRef"
                  v-if="showDropDowns.get(item.id)"
                />
              </Transition>
            </template>
          </Table>
        </div>

        <div
          v-if="useDataStore().$state.transactions.length > 0"
          class="flex items-center justify-between p-7 my-4"
        >
          <div class="flex items-center gap-x-3 relative">
            <p class="font-normal text-[#718096]">Show result:</p>
            <div
              @click="showPerPageMenu = !showPerPageMenu"
              class="w-[68px] h-[38px] border border-[#EEEFF2] cursor-pointer py-[8px] px-[12px] rounded-[8px] flex items-center justify-between"
            >
              <p class="text-[#718096]]">{{ useDataStore().$state.per_page }}</p>
              <DropDown />
            </div>
            <ul
              v-if="showPerPageMenu"
              ref="perPageRef"
              class="absolute right-0 bg-white top-12 w-[68px] border border-[#EEEFF2] cursor-pointer py-[8px] rounded-[8px]"
            >
              <li
                @click="closePerPageMenu(10)"
                :class="[useDataStore().$state.per_page === 10 ? 'bg-gray-100' : null]"
                class="hover:bg-gray-100 px-[12px] text-[#718096]"
              >
                10
              </li>
              <li
                @click="closePerPageMenu(20)"
                :class="[useDataStore().$state.per_page === 20 ? 'bg-gray-100' : null]"
                class="hover:bg-gray-100 px-[12px] text-[#718096]"
              >
                20
              </li>
            </ul>
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
    <Toaster richColors position="top-right" />
  </div>
</template>
