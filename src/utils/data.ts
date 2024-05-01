import type { TabList } from './types'
import { useUtils } from '@/composables/useUtils'

export const tabList: TabList[] = [
  {
    title: 'All',
    value: 'all',
    id: useUtils().autoGenId()
  },
  {
    title: 'Paid',
    value: 'paid',
    id: useUtils().autoGenId()
  },
  {
    title: 'Unpaid',
    value: 'unpaid',
    id: useUtils().autoGenId()
  },
  {
    title: 'Overdue',
    value: 'overdue',
    id: useUtils().autoGenId()
  }
]
