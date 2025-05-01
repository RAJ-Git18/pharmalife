from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "stock",
            "image",
            "is_latest",
            "is_featured",
        ]
        extra_kwargs = {"image": {"required": False}}

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation["image"] = instance.image.url
        return representation

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return request.build_absolute_uri(obj.image.url)
        return None
