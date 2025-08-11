from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.mixins import PermissionRequiredMixin

class SalesDataAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'values': [12000, 19000, 15000, 25000, 22000, 30000]
        }
        return Response(data)

class ProductsDataAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'labels': ['Product A', 'Product B', 'Product C', 'Product D'],
            'values': [35, 25, 25, 15]
        }
        return Response(data)

class PerformanceDataAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'total_sales': 123000,
            'total_orders': 456,
            'avg_order_value': 269.74,
            'growth_percentage': 12.5
        }
        return Response(data)

# New APIs for additional charts
class CategorySalesAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {
            'labels': ['Electronics', 'Books', 'Home Goods', 'Clothing', 'Toys'],
            'values': [25000, 18000, 22000, 15000, 9000]
        }
        return Response(data)

class SalespersonPerformanceAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {
            'labels': ['Communication', 'Teamwork', 'Closing', 'Negotiation', 'Product Knowledge'],
            'salesperson_a': [90, 75, 85, 80, 95],
            'salesperson_b': [80, 85, 70, 90, 80],
        }
        return Response(data)

class UserGrowthAPI(PermissionRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]
    permission_required = 'dashboard.view_detailed_analysis'
    def get(self, request):
        data = {
            'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'values': [150, 220, 300, 280, 400, 450]
        }
        return Response(data)

class TrafficSourceAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {
            'labels': ['Organic Search', 'Direct', 'Referral', 'Social Media'],
            'values': [45, 25, 20, 10]
        }
        return Response(data)

class FeatureSatisfactionAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {
            'labels': ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
            'values': [4.5, 3.8, 2.9, 4.1, 3.5] # Avg rating out of 5
        }
        return Response(data)

class AcquisitionCostAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Data format for scatter plot: array of {x, y} objects
        data = [
            {'x': 20, 'y': 300}, {'x': 25, 'y': 320}, {'x': 30, 'y': 400},
            {'x': 35, 'y': 380}, {'x': 40, 'y': 550}, {'x': 42, 'y': 560},
            {'x': 50, 'y': 600}, {'x': 55, 'y': 610}, {'x': 60, 'y': 700},
        ]
        return Response(data)
