import type { ApiResponse, Filters, Transaction } from "@/utils/types";
import axiosInstance from ".";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";

export const getAllTransactions = async (filters: Filters): Promise<Transaction[]> => {
    const { total_items } = storeToRefs(useDataStore())
    try {
        const response = await axiosInstance.get<ApiResponse>(`/transactions?page=${filters.page}&per_page=${filters.per_page}&status=${filters.status}`);
        total_items.value = response.data.total as number
        return response.data.data; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

