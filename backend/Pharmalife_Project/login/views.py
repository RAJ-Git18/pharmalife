from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from accounts.models import CustomUser


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        myuser = CustomUser.objects.filter(email=email).first()
        print(myuser)

        user = authenticate(email=email, password=password)
        if user is None:
            return Response(
                {"message": "Username or password is incorrect"}, status=401
            )

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        if myuser:

            # Create response
            return Response(
                {
                    "message": "Login successful",
                    "isadmin": user.is_superuser,
                    "access": str(access),
                    "refresh": str(refresh),
                    "status": "Logged In",
                    "userid": user.pk,
                    "cartcount": myuser.cartcount,
                }
            )


class ProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_superuser:
            return Response(
                {"message": "admin", "user.id": user.id}, status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "user", "userid": user.id}, status=status.HTTP_201_CREATED
        )
