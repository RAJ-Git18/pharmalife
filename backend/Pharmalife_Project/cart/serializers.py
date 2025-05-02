from rest_framework import serializers
from .models import CartModel
from products.models import Product
from products.serializers import ProductSerializer


class CartSerializer(serializers.ModelSerializer):

    product = ProductSerializer(source="productid", read_only=True)

    class Meta:
        model = CartModel
        fields = ["cartid", "userid", "productid", "quantity", "product"]

    def create(self, data):
        # Check for existing cart item
        cart_productid = CartModel.objects.filter(
            userid=data["userid"], productid=data["productid"]
        ).first()

        if cart_productid is not None:
            cart_productid.quantity += 1
            cart_productid.save()
            return cart_productid

        return CartModel.objects.create(**data)



