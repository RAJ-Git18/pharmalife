from django.urls import path
from login.views import LoginView
from accounts.views import RegisterAPI
from orders.views import OrdersView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # write the path name here!!
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("orders/", OrdersView.as_view(), name="orders"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
   
]
