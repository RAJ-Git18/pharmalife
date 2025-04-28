from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import InquirySerializer


class CustomerInquiryView(APIView):
    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "inquiry submitted"})
        return Response(serializer.errors)
