from rest_framework import serializers
from .models import CartModel
from products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):

    productid = ProductSerializer(read_only=True)

    class Meta:
        model = CartModel
        fields = '__all__'

    def create(self,data):
        cart_productid = CartModel.objects.filter(userid = data['userid'],productid = data['productid']).first()

        if cart_productid is not None:
            cart_productid.quantity = cart_productid.quantity + 1
            cart_productid.save()
            return cart_productid

        return CartModel.objects.create(**data)
