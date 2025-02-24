from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .serializer import CartItemSerializer
from .models import CartItem

# Create your views here.
# @api_view(['GET'])
# def get_cart_items(request):
#     items = CartItem.objects.all()
#     serializer = CartItemSerializer(items, ma)