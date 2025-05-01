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
        request = self.context.get("request")

        if instance.image and hasattr(instance.image, "url"):
            if request is not None:
                representation["image"] = request.build_absolute_uri(instance.image.url)
            else:
                representation["image"] = instance.image.url

        return representation
