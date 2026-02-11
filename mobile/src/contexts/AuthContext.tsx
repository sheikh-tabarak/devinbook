import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import apiService from '../services/api';
import type { User, LoginCredentials, RegisterCredentials } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user data from storage on mount
    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [storedToken, storedUser] = await AsyncStorage.multiGet([
                STORAGE_KEYS.AUTH_TOKEN,
                STORAGE_KEYS.USER_DATA,
            ]);

            const tokenValue = storedToken[1];
            const userValue = storedUser[1];

            if (tokenValue && userValue) {
                setToken(tokenValue);
                setUser(JSON.parse(userValue));

                // Verify token is still valid
                try {
                    await apiService.verifyToken();
                } catch (error) {
                    // Token invalid, clear auth
                    await clearAuth();
                }
            }
        } catch (error) {
            console.error('Error loading stored auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await apiService.login(credentials);

            await AsyncStorage.multiSet([
                [STORAGE_KEYS.AUTH_TOKEN, response.token],
                [STORAGE_KEYS.USER_DATA, JSON.stringify(response.user)],
            ]);

            setToken(response.token);
            setUser(response.user);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await apiService.register(credentials);

            await AsyncStorage.multiSet([
                [STORAGE_KEYS.AUTH_TOKEN, response.token],
                [STORAGE_KEYS.USER_DATA, JSON.stringify(response.user)],
            ]);

            setToken(response.token);
            setUser(response.user);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = async () => {
        await clearAuth();
    };

    const clearAuth = async () => {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.AUTH_TOKEN,
            STORAGE_KEYS.USER_DATA,
        ]);
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const response = await apiService.verifyToken();
            if (response.valid && response.user) {
                setUser(response.user);
                await AsyncStorage.setItem(
                    STORAGE_KEYS.USER_DATA,
                    JSON.stringify(response.user)
                );
            }
        } catch (error) {
            console.error('Error refreshing user:', error);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
