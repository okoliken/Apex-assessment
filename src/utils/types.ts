export interface TabList {
    title: string,
    value: string,
    id: string
}

export interface Option {
    title: string,
    color: string | null
}

export interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

export interface Filters {
    page: number,
    per_page: number,
    status: string
}

export enum ChipStatus {
    ALL = '',
    PAID = 'bg-purpleSoft text-purpleDark',
    UNPAID = 'bg-yellowSoft text-yellowDark',
    OVERDUE = 'bg-red-200/20 text-redDark',
    ACTIVE = "bg-greenSoft text-greenDark",
    INACTIVE = 'bg-orangeSoft text-orangeDark'
  }
  

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login_at:string
}

export interface Transaction {
    id: number;
    amount: number;
    payment_expected_at: string;
    payment_made_at: string;
    currency: string,
    user: User;
}

export interface ApiResponse {
    data: Transaction[];
    total: number
}

export type Status = 'all' | 'paid' | 'unpaid' | 'overdue' | 'active' | 'overdue' | 'inactive'