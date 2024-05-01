import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Option, Transaction } from '@/utils/types'

export const useDataStore = defineStore('dataStore', () => {
  // STATE
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref(false)
  const selectedStatus = ref('All')
  const currentPage = ref(1)
  const per_page = ref(20)
  const total_items = ref(0)
  const selectedUserStatus = ref('All')
  const amount = ref('')
  const name = ref('')
  const selectedTransactionIds = ref<Number[]>([]);

  const userStatus = ref<Option[]>([
    { title: 'All', color: '' },
    { title: 'Active', color: 'text-greenDark' },
    { title: 'Inactive', color: 'text-orangeDark' },
  ])

  const paymentStatus = ref<Option[]>([
    { title: 'All', color: null },
    { title: 'Paid', color: "text-purpleDark" },
    { title: 'Unpaid', color: "text-yellowDark" },
    { title: 'Overdue', color: "text-redDark" },
  ])

  // GETTERS
  const filteredTransactions = computed(() => {
    if (!name.value.trim() && !amount.value.trim() && selectedUserStatus.value === 'All' && selectedStatus.value === 'All') {
      return returnALLTransactions();
    }

    return returnALLTransactions().filter(transaction => {
      const matchesName = name.value.trim() === '' || transaction.name.toLowerCase().includes(name.value.trim().toLowerCase());
      const matchesAmount = amount.value.trim() === '' || transaction.amount === Number(amount.value.trim());
      const matchesUserStatus = selectedUserStatus.value === 'All' || transaction.status.toLowerCase() === selectedUserStatus.value.trim().toLowerCase();
      const matchesPaymentStatus = selectedStatus.value === 'All' || transaction.payment_status.toLowerCase() === selectedStatus.value.toLowerCase();
      return matchesName && matchesAmount && matchesUserStatus && matchesPaymentStatus;
    });
  });



  // ACTIONS
  const setSelectedStatus = (status: string) => {
    selectedStatus.value = status
  }
  const setSelectedUserStatus = (status: string) => {
    selectedUserStatus.value = status
  }

  const returnALLTransactions = () => {
    return transactions.value.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      payment_status: determinePaymentStatus(transaction.payment_expected_at, transaction.payment_made_at).toLowerCase(),
      status: transaction.user.status,
      currency: transaction.currency,
      name: transaction.user.name,
      email: transaction.user.email,
      login_date: transaction.user.last_login_at,
      payment_expected_at:transaction.payment_expected_at,
      payment_made_at: transaction.payment_made_at
    }))
  }

  const determinePaymentStatus = (payment_expected_at: string, payment_made_at: string) => {
    if (!payment_made_at) {
      return 'unpaid';
    }

    const expectedDate = new Date(payment_expected_at);
    const madeDate = new Date(payment_made_at);

    if (madeDate <= expectedDate) {
      return 'paid';
    } else {
      return 'overdue';
    }
  };

  const toggleTransactionSelection = (id: number) => {
    const index = selectedTransactionIds.value.indexOf(id);
    if (index !== -1) {
      selectedTransactionIds.value.splice(index, 1);
    } else {
      selectedTransactionIds.value.push(id);
    }
  }

  const isSelected = (id: number) => {
    return selectedTransactionIds.value.includes(id);
  }

  return {
    transactions,
    filteredTransactions,
    selectedStatus,
    setSelectedStatus,
    selectedUserStatus,
    toggleTransactionSelection,
    setSelectedUserStatus,
    isSelected,
    userStatus,
    paymentStatus,
    currentPage,
    per_page,
    isLoading,
    amount,
    name,
    selectedTransactionIds,
    total_items
  }
})
