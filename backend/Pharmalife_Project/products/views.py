from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Product
from .serializers import ProductSerializer


class ProductListCreateAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def get(self, request):
        is_latest = request.query_params.get('is_latest',None)
        products = Product.objects.filter(stock__gt=0)
        if is_latest is not None:
            is_latest_bool = is_latest.lower()=='false'
            products = products.filter(is_latest=is_latest_bool)
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ToggleLatestProductView(APIView):
    def patch(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.is_latest = not product.is_latest  # Toggle the value
            product.save()
            serializer = ProductSerializer(product, context={'request': request})
            return Response(serializer.data)
        except Product.DoesNotExist:
            raise Http404
class LatestProductListView(APIView): 
    def get(self, request):
        latest_products = Product.objects.filter(is_latest=True, stock__gt=0)
        serializer = ProductSerializer(latest_products, many=True, context={'request': request})
        return Response(serializer.data)
    
    


class ToggleFeatureProductView(APIView):
    def patch(self,request,pk):
        try:
            product= Product.objects.get(pk=pk)
            product.is_featured = not product.is_featured
            product.save()
            serializer = ProductSerializer(product, context={'request': request})
            return Response(serializer.data)
        except Product.DoesNotExist:
            raise Http404
        
class FeaturedProductListView(APIView):
    def get(self,request):
        featured_products = Product.objects.filter(is_featured= True,stock__gt=0)
        serializer = ProductSerializer(featured_products, many=True, context={'request': request})
        return Response(serializer.data)

class RetrieveDeleteUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)