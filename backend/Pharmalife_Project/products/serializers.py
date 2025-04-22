from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image']
        extra_kwargs = {
            'image': {'required': False}
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = instance.image.url
        return representation