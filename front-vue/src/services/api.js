import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor remains the same
apiClient.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        // Check for 401 error and ensure it's not a retry or a refresh token failure
        if (error.response.status === 401 && !originalRequest._retry) {
            
            if (isRefreshing) {
                // If a refresh is already in progress, queue the original request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                authStore.refreshToken()
                    .then(() => {
                        // On successful refresh, update header and resolve original request
                        originalRequest.headers['Authorization'] = `Bearer ${authStore.token}`;
                        processQueue(null, authStore.token);
                        resolve(apiClient(originalRequest));
                    })
                    .catch((err) => {
                        // On failed refresh, logout and reject all requests
                        authStore.logout();
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default {
    login(credentials) {
        return apiClient.post('/token/', credentials);
    },
    refreshToken(data) {
        return apiClient.post('/token/refresh/', data);
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