import { ref } from 'vue'
import { onClickOutside, useDateFormat, useDebounceFn } from '@vueuse/core'

export const useUtils = () => {
  const elementRef = ref<HTMLElement | null>(null)
  const autoGenId = () => {
    return "APEX" + Math.random().toString(36).substr(2, 9);
  };
  
  const  checkPaymentStatus = (status:string) => {
    switch (status) {
      case "paid":
        return "Paid on:";
      case "unpaid":
        return "Dues on:";
      case "overdue":
        return "Dued on:";
      default:
        return "unknown status"; 
    }
  }
  
  const formatDates = (date: string) => {
    return useUtils().useDateFormat(date, 'DD MMM, YYYY').value || null
  }

  return {
    useClickOutside: onClickOutside,
    useDateFormat,
    useDebounceFn,
    elementRef,
    autoGenId,
    checkPaymentStatus,
    formatDates
  }
}
