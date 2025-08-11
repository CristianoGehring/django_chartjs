from django.urls import path
from .api_views import (
    SalesDataAPI, ProductsDataAPI, PerformanceDataAPI, CategorySalesAPI,
    SalespersonPerformanceAPI, UserGrowthAPI, TrafficSourceAPI,
    FeatureSatisfactionAPI, AcquisitionCostAPI
)

urlpatterns = [
    path('sales-data/', SalesDataAPI.as_view(), name='api_sales_data'),
    path('products-data/', ProductsDataAPI.as_view(), name='api_products_data'),
    path('performance-data/', PerformanceDataAPI.as_view(), name='api_performance_data'),
    path('category-sales/', CategorySalesAPI.as_view(), name='api_category_sales'),
    path('salesperson-performance/', SalespersonPerformanceAPI.as_view(), name='api_salesperson_performance'),
    path('user-growth/', UserGrowthAPI.as_view(), name='api_user_growth'),
    path('traffic-source/', TrafficSourceAPI.as_view(), name='api_traffic_source'),
    path('feature-satisfaction/', FeatureSatisfactionAPI.as_view(), name='api_feature_satisfaction'),
    path('acquisition-cost/', AcquisitionCostAPI.as_view(), name='api_acquisition_cost'),
]
