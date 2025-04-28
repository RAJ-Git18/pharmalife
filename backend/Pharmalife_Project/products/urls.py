from django.urls import path
from .views import ProductListCreateAPIView, RetrieveDeleteUpdateView, ToggleLatestProductView,LatestProductListView,ToggleFeatureProductView,FeaturedProductListView

urlpatterns = [
    path('',ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('<uuid:pk>/', RetrieveDeleteUpdateView.as_view(), name= 'update-delete'),
    path('/<uuid:pk>/toggle-latest/', ToggleLatestProductView.as_view(), name='toggle-latest'),
    path('latest/', LatestProductListView.as_view(), name='latest-products'),
    path('<uuid:pk>/toggle-featured/', ToggleFeatureProductView.as_view(), name='toggle-featured'),
    path('featured/', FeaturedProductListView.as_view(), name='featured-products'),
    ]
