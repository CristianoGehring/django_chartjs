<template>
    <div>
        <h1 class="mb-4">Análise Detalhada</h1>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Crescimento de Usuários (Área)</h5>
                    <LineChart v-if="userGrowthData" :chart-data="userGrowthData" />
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Fontes de Tráfego (Rosca)</h5>
                    <DoughnutChart v-if="trafficSourceData" :chart-data="trafficSourceData" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Satisfação por Feature (Área Polar)</h5>
                    <PolarAreaChart v-if="featureSatisfactionData" :chart-data="featureSatisfactionData" />
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Custo de Aquisição vs. LTV (Dispersão)</h5>
                    <ScatterChart v-if="acquisitionCostData" :chart-data="acquisitionCostData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import LineChart from '@/components/charts/LineChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import PolarAreaChart from '@/components/charts/PolarAreaChart.vue';
import ScatterChart from '@/components/charts/ScatterChart.vue';

const userGrowthData = ref(null);
const trafficSourceData = ref(null);
const featureSatisfactionData = ref(null);
const acquisitionCostData = ref(null);

onMounted(async () => {
    const growthRes = await api.getUserGrowth();
    userGrowthData.value = {
        labels: growthRes.data.labels,
        datasets: [{
            label: 'New Users',
            data: growthRes.data.values,
            backgroundColor: 'rgba(23, 162, 184, 0.3)',
            borderColor: '#17a2b8',
            fill: true
        }]
    };

    const trafficRes = await api.getTrafficSource();
    trafficSourceData.value = {
        labels: trafficRes.data.labels,
        datasets: [{
            data: trafficRes.data.values,
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
    };

    const satisfactionRes = await api.getFeatureSatisfaction();
    featureSatisfactionData.value = {
        labels: satisfactionRes.data.labels,
        datasets: [{
            data: satisfactionRes.data.values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ]
        }]
    };

    const acquisitionRes = await api.getAcquisitionCost();
    acquisitionCostData.value = {
        datasets: [{
            label: 'Customer (Cost vs LTV)',
            data: acquisitionRes.data,
            backgroundColor: 'rgba(0, 123, 255, 0.6)'
        }]
    };
});
</script>
