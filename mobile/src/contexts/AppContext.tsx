import React from 'react';

export type Screen =
    | 'login'
    | 'register'
    | 'dashboard'
    | 'transactions'
    | 'addTransaction'
    | 'manage'
    | 'profile'
    | 'categories'
    | 'accounts';

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    currentScreen: Screen;
    navigateTo: (screen: Screen) => void;
    logout: () => Promise<void>;
    refreshData: () => void;
    isAddModalVisible: boolean;
    setAddModalVisible: (visible: boolean) => void;
    initialType: 'income' | 'expense';
    openAddModal: (type?: 'income' | 'expense') => void;
    editingTransaction: any | null;
    openEditModal: (transaction: any) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const AppContext = React.createContext<AppContextType>({
    user: null,
    setUser: () => { },
    currentScreen: 'login',
    navigateTo: () => { },
    logout: async () => { },
    refreshData: () => { },
    isAddModalVisible: false,
    setAddModalVisible: () => { },
    initialType: 'expense',
    openAddModal: () => { },
    editingTransaction: null,
    openEditModal: () => { },
    isDarkMode: false,
    toggleDarkMode: () => { },
});
