from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartModel
from .serializers import CartSerializer
from rest_framework import status


class CartView(APIView):
    def post(self, request, *args, **kwargs):
        productid = request.data.get("productid")
        userid = kwargs.get("userid")

        data = {"productid": productid, "userid": userid}

        serializer = CartSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Added to cart successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors)
