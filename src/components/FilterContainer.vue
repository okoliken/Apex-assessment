<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
const { selectedSelectStatus, selectedUserStatus ,userStatus, paymentStatus, amount, name } =
  storeToRefs(useDataStore())
import { Input, Select } from '@/components/index'
</script>

<template>
  <div class="grid grid-cols-4 w-full place-content-center -ml-2 py-2 mt-3 px-5">
    <div class="flex items-start flex-col">
      <label class="text-[#111827] font-bold ml-3" for="name">Name</label>
      <Input v-model="name" id="name" type="text" placeholder="name" />
    </div>
    <div class="flex items-start flex-col">
      <label class="text-[#111827] font-bold ml-3" for="amount">Amount</label>
      <Input v-model="amount" type="number" id="amount" placeholder="e.g 400" />
    </div>
    <div class="flex items-start flex-col transform translate-x-2">
      <label class="text-[#111827] font-bold ml-3" for="userStatus">User’s Status</label>
      <Select
        :selected-option="selectedUserStatus"
        @filter="useDataStore().setSelectedUserStatus"
        :options="userStatus"
        id="userStatus"
        class="mt-2"
      />
    </div>
    <div class="flex items-start flex-col transform translate-x-2 ml-4">
      <label class="text-[#111827] font-bold ml-3" for="paymentStatus">Payment Status</label>
      <Select
        :selected-option="selectedSelectStatus"
        @filter="useDataStore().setSelectStatus"
        :options="paymentStatus"
        id="paymentStatus"
        class="mt-2"
      />
    </div>
  </div>
</template>
