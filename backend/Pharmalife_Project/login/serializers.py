from rest_framework import serializers  
from django.contrib.auth import authenticate

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
           print("the authentication was successful")