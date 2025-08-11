<template>
    <PolarArea :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { PolarArea } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};
</script>
