import type { ApiResponse, Filters, Transaction } from "@/utils/types";
import axiosInstance from ".";
import { useDataStore } from "@/stores/dataStore";
import { useBaseApiCall } from '@/composables/useBaseApiCall'
import { storeToRefs } from "pinia";
import { toast } from 'vue-sonner'

export const getAllTransactions = async (filters: Filters): Promise<Transaction[]> => {
    const { total_items } = storeToRefs(useDataStore())
    try {
        const response = await axiosInstance.get<ApiResponse>(`/transactions?page=${filters.page}&per_page=${filters.per_page}&state=${filters.status.toLowerCase()}`);
        total_items.value = response.data.total as number
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const payDebts = async (ids: number[]) => {
    const { currentPage } = storeToRefs(useDataStore())
    try {
        const response = await axiosInstance.post<ApiResponse>(`/pay-dues`, {
            payments: ids
        });
        if (response.data) {
            toast.success('All transaction debts have been paid')
            await useBaseApiCall().refetchTransactions(currentPage.value)
        }
    } catch (error) {
        toast.error('An error occured');
        throw error;
    }
}

