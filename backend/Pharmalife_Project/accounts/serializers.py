from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import CustomUser

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'age', 'bio']  
        extra_kwargs = {
            'password': {'write_only': True}  
        }

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'age', 'bio']  # All registration fields
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            age=validated_data.get('age'),  
            bio=validated_data.get('bio')   
        )
        return user