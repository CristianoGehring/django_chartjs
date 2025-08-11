import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
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
                const decodedToken = jwtDecode(token);

                this.token = token;
                this.user = { username: decodedToken.username };
                this.permissions = decodedToken.permissions;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('permissions', JSON.stringify(this.permissions));
                
                router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.permissions = [];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            router.push('/login');
        }
    }
});
