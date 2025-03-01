// api.ts
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
});

// Updated request interceptor with proper typing
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const cookies = await AsyncStorage.getItem('cookies');
        if (cookies) {
            config.headers = config.headers || {};
            config.headers.Cookie = cookies;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Updated response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        const cookies = response.headers['set-cookie'];
        if (cookies) {
            AsyncStorage.setItem('cookies', cookies[0]);
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