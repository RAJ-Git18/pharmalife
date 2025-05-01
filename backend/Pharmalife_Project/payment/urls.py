from django.urls import path, include
from .views import ListPaymentAPIView
urlpatterns = [
    path('',ListPaymentAPIView.as_view())
]
