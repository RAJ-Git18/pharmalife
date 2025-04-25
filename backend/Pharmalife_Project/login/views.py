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

        user = authenticate(email=email, password=password)
        if user is None:
            return Response(
                {"message": "Username or password is incorrect"}, status=401
            )

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        # Create response
        res = Response(
            {
                "message": "Login successful",
                "isadmin": user.is_superuser,
            }
        )

        # Set tokens as HTTP-only cookies
        res.set_cookie(
            key="access",
            value=str(access),
            samesite="Lax",
            httponly=True,
            secure=False,
            path='/',
            domain='localhost',
            max_age=60 * 60 * 24 * 7  # 7 days (in seconds)
        )

        res.set_cookie(
            key="refresh",
            value=str(refresh),
            samesite="Lax",
            httponly=True,
            secure=False,
            path="/",
            domain='localhost',
            max_age=60 * 60 * 24 * 30  # 30 days
        )

        return res
