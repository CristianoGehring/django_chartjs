<template>
    <div>
        <h1 class="mb-4">Dashboard</h1>

        <!-- KPIs -->
        <div class="row mb-4">
            <div class="col-md-3" v-for="kpi in kpiData" :key="kpi.title">
                <KPICard :title="kpi.title" :value="kpi.value" :icon="kpi.icon" :bg-color="kpi.bgColor" />
            </div>
        </div>

        <!-- Charts -->
        <div class="row">
            <div class="col-lg-8 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Vendas Mensais (Linha)</h5>
                    <LineChart v-if="salesChartData" :chart-data="salesChartData" />
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Distribuição de Produtos (Pizza)</h5>
                    <PieChart v-if="productsChartData" :chart-data="productsChartData" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Vendas por Categoria (Barras)</h5>
                    <BarChart v-if="categoryChartData" :chart-data="categoryChartData" />
                </div>
            </div>
            <div class="col-lg-6 mb-4">
                <div class="chart-container" style="position: relative; height:40vh;">
                    <h5 class="text-center">Performance de Vendedores (Radar)</h5>
                    <RadarChart v-if="salespersonChartData" :chart-data="salespersonChartData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import KPICard from '@/components/KPICard.vue';
import LineChart from '@/components/charts/LineChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import RadarChart from '@/components/charts/RadarChart.vue';

const kpiData = ref([]);
const salesChartData = ref(null);
const productsChartData = ref(null);
const categoryChartData = ref(null);
const salespersonChartData = ref(null);

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

onMounted(async () => {
    // Fetch KPIs
    const perfResponse = await api.getPerformanceData();
    kpiData.value = [
        { title: 'Total Sales', value: formatCurrency(perfResponse.data.total_sales), icon: 'fas fa-dollar-sign', bgColor: 'bg-gradient-1' },
        { title: 'Total Orders', value: perfResponse.data.total_orders, icon: 'fas fa-shopping-cart', bgColor: 'bg-gradient-2' },
        { title: 'Avg. Order Value', value: formatCurrency(perfResponse.data.avg_order_value), icon: 'fas fa-chart-line', bgColor: 'bg-gradient-3' },
        { title: 'Growth', value: `${perfResponse.data.growth_percentage}%`, icon: 'fas fa-rocket', bgColor: 'bg-gradient-4' },
    ];

    // Fetch Chart Data
    const salesResponse = await api.getSalesData();
    salesChartData.value = {
        labels: salesResponse.data.labels,
        datasets: [{
            label: 'Monthly Sales',
            data: salesResponse.data.values,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const productsResponse = await api.getProductsData();
    productsChartData.value = {
        labels: productsResponse.data.labels,
        datasets: [{
            data: productsResponse.data.values,
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8']
        }]
    };

    const categoryResponse = await api.getCategorySales();
    categoryChartData.value = {
        labels: categoryResponse.data.labels,
        datasets: [{
            label: 'Sales by Category',
            data: categoryResponse.data.values,
            backgroundColor: '#28a745'
        }]
    };

    const salespersonResponse = await api.getSalespersonPerformance();
    salespersonChartData.value = {
        labels: salespersonResponse.data.labels,
        datasets: [
            {
                label: 'Salesperson A',
                data: salespersonResponse.data.salesperson_a,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Salesperson B',
                data: salespersonResponse.data.salesperson_b,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
            }
        ]
    };
});
</script>
