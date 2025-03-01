import api, {ApiError} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    email: string;
    full_name: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const register = async (
    email: string,
    password: string,
    fullName: string
): Promise<void> => {
    try {
        await api.post('/auth/register', {
            email,
            password,
            full_name: fullName,
        });
    } catch (error) {
        const err = error as ApiError;
        throw new Error(err.data?.detail || err.message);
    }
};

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', {email, password});
        // Cookies are handled automatically by interceptor
        return response.data;
    } catch (error) {
        const err = error as ApiError;
        throw new Error(err.data?.detail || err.message);
    }
};

export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
        // Clear cookies on logout
        await AsyncStorage.removeItem('cookies');
    } catch (error) {
        const err = error as ApiError;
        throw new Error(err.data?.detail || err.message);
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await api.get<User>('/auth/get_current_user');
        return response.data;
    } catch (error) {
        const err = error as ApiError;
        throw new Error(err.data?.detail || err.message);
    }
};