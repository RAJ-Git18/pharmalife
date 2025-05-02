from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartModel
from .serializers import CartSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

User = get_user_model()


class CartView(APIView):
    def post(self, request):
        userid = request.data.get("userid")
        productid = request.data.get("productid")

        data = {"productid": productid, "userid": userid}

        serializer = CartSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Added to cart successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors)

    def get(self, request, *args, **kwargs):
        userid = kwargs.get("userid")
        try:
            user = User.objects.get(id=userid)
            cartid = CartModel.objects.filter(userid=user)
            serializer = CartSerializer(cartid, many=True)
            return Response({"message": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        cartid = kwargs.get("cartid")
        try:
            cartitem = CartModel.objects.filter(cartid=cartid).first()
            print(cartitem)
            if cartitem is not None:
                cartitem.delete()
            return Response(
                status=status.HTTP_201_CREATED,
            )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


