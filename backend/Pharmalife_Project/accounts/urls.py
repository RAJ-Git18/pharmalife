from django.urls import path
from .views import RegisterAPI  # Import your view

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
]