from rest_framework import serializers
from .models import CartItem, ButtonColor


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"


# class ButtonColorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ButtonColor
#         fields = '__all__'
