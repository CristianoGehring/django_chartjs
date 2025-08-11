<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4"><i class="fas fa-tachometer-alt"></i> Dashboard</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink to="/" class="nav-link" active-class="active">
                    <i class="fas fa-home"></i> Home
                </RouterLink>
            </li>
            <li v-if="authStore.hasPermission('dashboard.view_detailed_analysis')">
                <RouterLink to="/details" class="nav-link" active-class="active">
                    <i class="fas fa-chart-pie"></i> Análise Detalhada
                </RouterLink>
            </li>
        </ul>
        <hr>
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>{{ authStore.user?.username }}</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a class="dropdown-item" href="#" @click.prevent="authStore.logout()">Sign out</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.sidebar {
    width: 280px;
    height: 100vh;
}
.nav-link {
    color: white;
}
.nav-link.active {
    background-color: #0d6efd;
}
.nav-link:hover {
    background-color: #495057;
}
</style>
