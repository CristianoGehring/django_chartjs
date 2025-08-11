from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from dashboard.auth_views import MyTokenObtainPairView # Import our custom view

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # App URLs
    path('', include('dashboard.urls')),
    path('api/', include('dashboard.api_urls')),
    
    # JWT Token Endpoints
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Use our custom view
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
