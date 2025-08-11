import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    login(credentials) {
        // Note: Django Simple JWT expects 'username' and 'password'
        return apiClient.post('/token/', credentials);
    },
    getPerformanceData() {
        return apiClient.get('/performance-data/');
    },
    getSalesData() {
        return apiClient.get('/sales-data/');
    },
    getProductsData() {
        return apiClient.get('/products-data/');
    },
    getCategorySales() {
        return apiClient.get('/category-sales/');
    },
    getSalespersonPerformance() {
        return apiClient.get('/salesperson-performance/');
    },
    getUserGrowth() {
        return apiClient.get('/user-growth/');
    },
    getTrafficSource() {
        return apiClient.get('/traffic-source/');
    },
    getFeatureSatisfaction() {
        return apiClient.get('/feature-satisfaction/');
    },
    getAcquisitionCost() {
        return apiClient.get('/acquisition-cost/');
    }
};
