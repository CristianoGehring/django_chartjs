from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

class CustomLoginView(LoginView):
    template_name = 'registration/login.html'

@login_required
def dashboard_home(request):
    return render(request, 'dashboard/home.html')

@login_required
def detailed_analysis(request):
    return render(request, 'dashboard/details.html')
