from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def LoginView(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is None:
            return Response(
                {"message": "User doesnot exist"}, status=status.HTTP_404_NOT_FOUND
            )
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "is_admin": user.is_superuser,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "user is logged in",
            }
        )
