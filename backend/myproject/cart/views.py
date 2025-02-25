from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .serializer import CartItemSerializer,ButtonColorSerializer
from .models import CartItem

# Create your views here.
@api_view(['GET','POST'])
def get_cart_items(request):
    if request.method == 'GET':
        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many = True)
        return Response(serializer.data)

    # if request.method == 'POST':
    #     serializer = ButtonColorSerializer(data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors)