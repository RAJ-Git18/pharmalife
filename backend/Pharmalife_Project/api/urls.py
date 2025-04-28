from django.urls import path
from login.views import LoginView, ProtectedView
from accounts.views import RegisterAPI
from orders.views import OrdersView
from inquiry.views import CustomerInquiryView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # write the path name here!!
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("orders/", OrdersView.as_view(), name="orders"),
    path("protected/", ProtectedView.as_view(), name="protected"),
    path("submitinquiry/", CustomerInquiryView.as_view(), name="inquiry"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
