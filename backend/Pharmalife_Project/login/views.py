from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


class LoginView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)
        if user is None:
            return Response(
                {"message": "Username or password is incorrect"}, status=401
            )

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        # Create response
        response = Response(
            {
                "message": "Login successful",
                "isadmin": user.is_superuser,
            }
        )

        response.set_cookie(
            key="access",
            value=str(access),
            max_age=60 * 60 * 24 * 7,  # 1 week
            httponly=True,
            secure=False,  # False for localhost
            samesite="Strict",
            path="/",
        )

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Strict",
            max_age=60 * 60 * 24 * 7,  # 7 days
            path="/auth/refresh/",  # Only sent to refresh endpoint
        )

        return response
    



    def get(self, request):
        return Response({'message' : 'authenticated'})
    

