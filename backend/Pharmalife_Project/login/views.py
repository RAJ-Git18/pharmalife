from rest_framework.response import Response
from rest_framework.views import APIView
from login.serializers import LoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {
                    "message": "Login successful!"
                }
            )
        return Response({"message": "Username or password is incorrect"})
