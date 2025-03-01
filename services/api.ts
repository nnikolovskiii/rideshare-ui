import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ApiError {
    message: string;
    status?: number;
    data?: any;
}

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,  // This enables cookie handling
});

// Modified response interceptor to correctly parse cookies
api.interceptors.response.use(
    (response: AxiosResponse) => {
        const cookies = response.headers['set-cookie'];
        if (cookies) {
            // Parse cookies to extract name=value pairs only
            const parsedCookies = cookies.map(cookie => {
                const [nameValue] = cookie.split(';');
                return nameValue;
            });
            // Store the parsed cookies
            AsyncStorage.setItem('cookies', parsedCookies.join('; '));
        }
        return response;
    },
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        };
        return Promise.reject(apiError);
    }
);

// Modified response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        const cookies = response.headers['set-cookie'];
        if (cookies) {
            // Store the latest cookies
            AsyncStorage.setItem('cookies', cookies.join(';'));
        }
        return response;
    },
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        };
        return Promise.reject(apiError);
    }
);

export default api;