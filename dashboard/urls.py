from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import CustomLoginView, dashboard_home, detailed_analysis

urlpatterns = [
    path('', dashboard_home, name='dashboard_home'),
    path('details/', detailed_analysis, name='detailed_analysis'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
