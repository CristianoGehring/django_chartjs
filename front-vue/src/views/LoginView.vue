<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h3 class="card-title text-center">Login</h3>
                        <hr>
                        <div class="alert alert-info">Demo user: <strong>admin</strong> / <strong>admin123</strong></div>
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" v-model="username" class="form-control" id="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password" required>
                            </div>
                            <div v-if="error" class="alert alert-danger">{{ error }}</div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const username = ref('admin');
const password = ref('admin123');
const error = ref(null);
const loading = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
    loading.value = true;
    error.value = null;
    try {
        await authStore.login({ username: username.value, password: password.value });
    } catch (err) {
        error.value = 'Login failed. Please check your credentials.';
    }
    loading.value = false;
};
</script>
