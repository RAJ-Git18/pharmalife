from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, UserSerializer, CartCountSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create token for the new user

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User created successfully",
        }, status=status.HTTP_201_CREATED)


class CartCountView(APIView):

    def post(self, request,*args, **kwargs):
        userid = kwargs.get('userid')
        cartcount = request.data.get('cart_count')
        user = CustomUser.objects.filter(id = userid).first()
        if user:
            user.cartcount = cartcount
            user.save()
            return Response(status=status.HTTP_200_OK)
            
        return Response(status=status.HTTP_404_NOT_FOUND)
