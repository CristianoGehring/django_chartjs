<template>
    <div class="kpi-card" :class="bgColor">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div class="text-uppercase">{{ title }}</div>
                <div class="value">{{ value }}</div>
            </div>
            <i class="icon" :class="icon"></i>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    value: [String, Number],
    icon: String,
    bgColor: String
});
</script>
