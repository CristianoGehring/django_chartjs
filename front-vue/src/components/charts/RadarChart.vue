<template>
    <Radar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler);

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
