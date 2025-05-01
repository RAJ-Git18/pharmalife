from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PaymentSerializer
from .models import Payment
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class ListPaymentAPIView(APIView):
    def get(self,request):
        payments= Payment.objects.all()
        serializer= PaymentSerializer(payments,many= True, context={'request': request})
        return Response(serializer.data)
    

    def post(self, request):
        """Handle 'Already Scanned' submissions"""
        # Add the current user as the payer if not specified
        if 'payer' not in request.data:
            request.data['payer'] = request.user.id
        
        serializer = PaymentSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

