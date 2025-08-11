import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        permissions: JSON.parse(localStorage.getItem('permissions')) || []
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        hasPermission: (state) => (permission) => {
            return state.permissions.includes(permission);
        }
    },
    actions: {
        async login(credentials) {
            try {
                const response = await api.login(credentials);
                const token = response.data.access;
                const refreshToken = response.data.refresh;
                const decodedToken = jwtDecode(token);

                this.token = token;
                this.refreshToken = refreshToken;
                this.user = { username: decodedToken.username };
                this.permissions = decodedToken.permissions;

                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('permissions', JSON.stringify(this.permissions));
                
                router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async refreshToken() {
            const response = await api.refreshToken({ refresh: this.refreshToken });
            const token = response.data.access;
            this.token = token;
            localStorage.setItem('token', token);
        },
        logout() {
            this.token = null;
            this.refreshToken = null;
            this.user = null;
            this.permissions = [];
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            router.push('/login');
        }
    }
});
