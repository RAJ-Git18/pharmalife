from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email = email, password = password)
        if user is None:
            return Response({"message": "Username or password is incorrect"})
        
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        return Response(
            {
                "message": "Login successful!",
                "refresh" : str(refresh),
                "access" : str(access),
                "isadmin" : user.is_superuser
            }
        )
