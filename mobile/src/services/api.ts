import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ENDPOINTS, STORAGE_KEYS } from '../constants/config';
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
    Transaction,
    CreateTransactionInput,
    Category,
    CreateCategoryInput,
    Item,
    CreateItemInput,
    Account,
    CreateAccountInput,
    DashboardStats,
    ApiResponse,
    ApiError,
} from '../types';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add auth token
        this.api.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<ApiError>) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid, clear storage
                    await AsyncStorage.multiRemove([
                        STORAGE_KEYS.AUTH_TOKEN,
                        STORAGE_KEYS.USER_DATA,
                    ]);
                }
                return Promise.reject(error);
            }
        );
    }

    // Auth APIs
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await this.api.post<ApiResponse<AuthResponse>>(
            ENDPOINTS.LOGIN,
            credentials
        );
        return data.data;
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const { data } = await this.api.post<ApiResponse<AuthResponse>>(
            ENDPOINTS.REGISTER,
            credentials
        );
        return data.data;
    }

    async verifyToken(): Promise<{ valid: boolean; user?: any }> {
        const { data } = await this.api.get(ENDPOINTS.VERIFY_TOKEN);
        return data.data;
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        const { data } = await this.api.post(ENDPOINTS.FORGOT_PASSWORD, { email });
        return data.data;
    }

    async resetPassword(token: string, password: string): Promise<{ message: string }> {
        const { data } = await this.api.post(ENDPOINTS.RESET_PASSWORD, {
            token,
            password,
        });
        return data.data;
    }

    // Transaction APIs
    async getTransactions(params?: {
        startDate?: string;
        endDate?: string;
        category?: string;
        type?: 'income' | 'expense';
    }): Promise<Transaction[]> {
        const { data } = await this.api.get<ApiResponse<Transaction[]>>(
            ENDPOINTS.TRANSACTIONS,
            { params }
        );
        return data.data;
    }

    async getTransactionById(id: string): Promise<Transaction> {
        const { data } = await this.api.get<ApiResponse<Transaction>>(
            ENDPOINTS.TRANSACTION_BY_ID(id)
        );
        return data.data;
    }

    async createTransaction(input: CreateTransactionInput): Promise<Transaction> {
        const { data } = await this.api.post<ApiResponse<Transaction>>(
            ENDPOINTS.TRANSACTIONS,
            input
        );
        return data.data;
    }

    async updateTransaction(
        id: string,
        input: Partial<CreateTransactionInput>
    ): Promise<Transaction> {
        const { data } = await this.api.put<ApiResponse<Transaction>>(
            ENDPOINTS.TRANSACTION_BY_ID(id),
            input
        );
        return data.data;
    }

    async deleteTransaction(id: string): Promise<void> {
        await this.api.delete(ENDPOINTS.TRANSACTION_BY_ID(id));
    }

    // Category APIs
    async getCategories(): Promise<Category[]> {
        const { data } = await this.api.get<ApiResponse<Category[]>>(
            ENDPOINTS.CATEGORIES
        );
        return data.data;
    }

    async getCategoryById(id: string): Promise<Category> {
        const { data } = await this.api.get<ApiResponse<Category>>(
            ENDPOINTS.CATEGORY_BY_ID(id)
        );
        return data.data;
    }

    async createCategory(input: CreateCategoryInput): Promise<Category> {
        const { data } = await this.api.post<ApiResponse<Category>>(
            ENDPOINTS.CATEGORIES,
            input
        );
        return data.data;
    }

    async updateCategory(
        id: string,
        input: Partial<CreateCategoryInput>
    ): Promise<Category> {
        const { data } = await this.api.put<ApiResponse<Category>>(
            ENDPOINTS.CATEGORY_BY_ID(id),
            input
        );
        return data.data;
    }

    async deleteCategory(id: string): Promise<void> {
        await this.api.delete(ENDPOINTS.CATEGORY_BY_ID(id));
    }

    // Item APIs
    async getItems(categoryId?: string): Promise<Item[]> {
        const { data } = await this.api.get<ApiResponse<Item[]>>(ENDPOINTS.ITEMS, {
            params: categoryId ? { category: categoryId } : undefined,
        });
        return data.data;
    }

    async getItemById(id: string): Promise<Item> {
        const { data } = await this.api.get<ApiResponse<Item>>(
            ENDPOINTS.ITEM_BY_ID(id)
        );
        return data.data;
    }

    async createItem(input: CreateItemInput): Promise<Item> {
        const { data } = await this.api.post<ApiResponse<Item>>(
            ENDPOINTS.ITEMS,
            input
        );
        return data.data;
    }

    async updateItem(id: string, input: Partial<CreateItemInput>): Promise<Item> {
        const { data } = await this.api.put<ApiResponse<Item>>(
            ENDPOINTS.ITEM_BY_ID(id),
            input
        );
        return data.data;
    }

    async deleteItem(id: string): Promise<void> {
        await this.api.delete(ENDPOINTS.ITEM_BY_ID(id));
    }

    // Account APIs
    async getAccounts(): Promise<Account[]> {
        const { data } = await this.api.get<ApiResponse<Account[]>>(
            ENDPOINTS.ACCOUNTS
        );
        return data.data;
    }

    async getAccountById(id: string): Promise<Account> {
        const { data } = await this.api.get<ApiResponse<Account>>(
            ENDPOINTS.ACCOUNT_BY_ID(id)
        );
        return data.data;
    }

    async createAccount(input: CreateAccountInput): Promise<Account> {
        const { data } = await this.api.post<ApiResponse<Account>>(
            ENDPOINTS.ACCOUNTS,
            input
        );
        return data.data;
    }

    async updateAccount(
        id: string,
        input: Partial<CreateAccountInput>
    ): Promise<Account> {
        const { data } = await this.api.put<ApiResponse<Account>>(
            ENDPOINTS.ACCOUNT_BY_ID(id),
            input
        );
        return data.data;
    }

    async deleteAccount(id: string): Promise<void> {
        await this.api.delete(ENDPOINTS.ACCOUNT_BY_ID(id));
    }

    // Dashboard APIs
    async getDashboardStats(params?: {
        startDate?: string;
        endDate?: string;
    }): Promise<DashboardStats> {
        const { data } = await this.api.get<ApiResponse<DashboardStats>>(
            ENDPOINTS.DASHBOARD_STATS,
            { params }
        );
        return data.data;
    }
}

export default new ApiService();
