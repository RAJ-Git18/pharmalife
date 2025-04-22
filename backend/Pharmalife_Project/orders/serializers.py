from orders.models import OrdersModel
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdersModel
        fields = '__all__'