from django.urls import path
from .views import ProductListCreateAPIView, RetrieveDeleteUpdateView 

urlpatterns = [
    path('',ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('<int:pk>/', RetrieveDeleteUpdateView.as_view(), name= 'update-delete')
    ]
