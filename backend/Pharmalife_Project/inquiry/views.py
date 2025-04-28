from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import InquirySerializer
from .models import CustomerInquiryModel


class CustomerInquiryView(APIView):
    def post(self, request):
        try:
            serializer = InquirySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "inquiry submitted"})
        except:
            return Response(serializer.errors)

    def delete(self, *args, **kwargs):
        inquiry_id = kwargs.get("inquiry_id")
        try:
            inquiry_object = CustomerInquiryModel.objects.filter(
                inquiry_id=inquiry_id
            ).first()
            if not inquiry_object is None:
                inquiry_object.delete()

            return Response({"message": True})
        except:
            return Response({"message": False})


class GetInquiryView(APIView):
    def get(self, request):
        try:
            queryset = CustomerInquiryModel.objects.all()
            serializer = InquirySerializer(queryset, many=True)
            return Response(
                {"message": "Data fetched successfully", "data": serializer.data}
            )
        except:
            return Response(serializer.errors)
