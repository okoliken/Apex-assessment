import { onMounted } from "vue";
import { useDataStore } from "@/stores/dataStore";
import { getAllTransactions, payDebts } from '@/services/api'
import { storeToRefs } from "pinia";
import type { Transaction } from "@/utils/types";


export const useBaseApiCall = () => {
    const { currentPage, per_page, transactions, isLoading, filteredTransactions, selectedTransactionIds, isPayingUp,selectedStatus  } = storeToRefs(useDataStore())


    const iterateData = (data: Transaction[]) => {
        transactions.value = data.map((transaction) => {
            return {
                id: transaction.id,
                amount: transaction.amount,
                payment_expected_at: transaction.payment_expected_at,
                payment_made_at: transaction.payment_made_at,
                currency: transaction.currency,
                user: transaction.user,
                login_date:transaction.user.last_login_at
            }
        })
    }

    const handlePayment = async () => {
        isPayingUp.value = true
        await payDebts(selectedTransactionIds.value)
        isPayingUp.value = false
    }

    const setItemsPerPage = async (page: number) => {
        per_page.value = page

       await refetchTransactions(currentPage.value,selectedStatus.value, page )
    }

    const refetchTransactions = async (page_no:number, status:string = 'all', per_page:number = 20) => {
        isLoading.value = true
        const data = await getAllTransactions({ per_page, status, page: page_no })
        isLoading.value = false
        iterateData(data)
    }

    onMounted(async () => {
        try {
            isLoading.value = true
            const data = await getAllTransactions({ per_page: per_page.value, status: 'all', page: currentPage.value })
            isLoading.value = false
            iterateData(data)
        } catch (error) {
            isLoading.value = false
        }
    })

    return {
        filteredTransactions,
        refetchTransactions,
        handlePayment,
        isPayingUp,
        setItemsPerPage
    }
}