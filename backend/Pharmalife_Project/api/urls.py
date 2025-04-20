from django.urls import path
from login.views import LoginView
from accounts.views import RegisterAPI

urlpatterns = [
    # write the path name here!!
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterAPI.as_view(), name='register'),
]
