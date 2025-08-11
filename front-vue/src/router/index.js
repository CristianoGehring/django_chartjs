import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import DashboardView from '@/views/DashboardView.vue';
import DetailedAnalysisView from '@/views/DetailedAnalysisView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: '/details',
        name: 'DetailedAnalysis',
        component: DetailedAnalysisView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.meta.requiresAuth;
    const requiredPermission = to.meta.permission;

    if (requiresAuth && !authStore.isAuthenticated) {
        return next('/login');
    }

    if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
        // Redirect to a "Not Authorized" page or home page
        return next('/'); 
    }

    next();
});

export default router;
