from django.urls import path
from login.views import LoginView

urlpatterns = [
    # write the path name here!!
    path('login/', LoginView.as_view(), name='login'),
]
