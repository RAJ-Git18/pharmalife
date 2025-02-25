from django.urls import path
from .views import get_cart_items

urlpatterns = [
    path("cart/", get_cart_items, name="get_cart_items"),
]
