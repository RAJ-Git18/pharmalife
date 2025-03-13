from .models import CustomUser
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['user_id','username', 'email', 'password']