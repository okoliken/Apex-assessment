import { onMounted } from "vue";
import { useDataStore } from "@/stores/dataStore";
import { getAllTransactions } from '@/services/api'
import { storeToRefs } from "pinia";
import type { Transaction } from "@/utils/types";


export const useBaseApiCall = () => {
    const { currentPage, per_page, transactions, isLoading, filteredTransactions } = storeToRefs(useDataStore())


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
    const refetchTransactions = async (page_no:number, status:string = 'all') => {
        isLoading.value = true
        const data = await getAllTransactions({ per_page: per_page.value, status, page: page_no })
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
        refetchTransactions
    }
}