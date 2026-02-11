// User Types
export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

// Transaction Types
export interface Transaction {
    _id: string;
    user: string;
    category: string | Category;
    item: string | Item;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTransactionInput {
    category: string;
    item: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    description?: string;
}

// Category Types
export interface Category {
    _id: string;
    user: string;
    name: string;
    icon?: string;
    color?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryInput {
    name: string;
    icon?: string;
    color?: string;
}

// Item Types
export interface Item {
    _id: string;
    user: string;
    category: string | Category;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateItemInput {
    category: string;
    name: string;
}

// Account Types
export interface Account {
    _id: string;
    user: string;
    name: string;
    balance: number;
    type: 'cash' | 'bank' | 'card' | 'other';
    createdAt: string;
    updatedAt: string;
}

export interface CreateAccountInput {
    name: string;
    balance: number;
    type: 'cash' | 'bank' | 'card' | 'other';
}

// Dashboard Types
export interface DashboardStats {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
    categoryBreakdown: CategoryBreakdown[];
    recentTransactions: Transaction[];
}

export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
    count: number;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

// Navigation Types
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    Dashboard: undefined;
    Transactions: undefined;
    Categories: undefined;
    Accounts: undefined;
    Profile: undefined;
};

export type TransactionStackParamList = {
    TransactionList: undefined;
    TransactionDetail: { id: string };
    AddTransaction: undefined;
    EditTransaction: { id: string };
};
