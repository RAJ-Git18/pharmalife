from rest_framework import serializers  
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password :
           user = authenticate(email=email, password=password)
           if user is None:
              raise serializers.ValidationError("Invalid email or password")

           data['refresh'] = RefreshToken.for_user(user)
           data['access'] = RefreshToken.for_user(user).access_token
           data['isadmin'] = user.is_superuser

         #   print(data)

           return data
