import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(credentials) {
            try {
                const response = await api.login(credentials);
                // Assuming the token is in response.data.access
                const token = response.data.access;
                this.token = token;
                // For simplicity, we'll mock a user object. In a real app, you'd fetch user data.
                const user = { username: credentials.username };
                this.user = user;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
                // You could set an error state here to show in the UI
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});
