<template>
    <Scatter :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Scatter } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { title: { display: true, text: 'Acquisition Cost (R$)' } },
        y: { title: { display: true, text: 'Lifetime Value (LTV) (R$)' } }
    }
};
</script>
