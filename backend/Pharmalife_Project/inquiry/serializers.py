from .models import CustomerInquiryModel
from rest_framework import serializers


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerInquiryModel
        fields = "__all__"
