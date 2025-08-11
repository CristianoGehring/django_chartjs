<template>
  <Sidebar v-if="authStore.isAuthenticated" />
  <div class="content">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>

<style>
/* Global styles can go here if needed */
</style>
