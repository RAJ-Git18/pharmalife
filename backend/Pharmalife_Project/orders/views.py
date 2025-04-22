from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import timedelta
from django.utils import timezone
import calendar
from .serializers import OrderSerializer
from .models import OrdersModel


@api_view(["GET"])
def weekly_sales(request):
    today = timezone.now().date()
    start_of_week = today - timedelta(days=today.weekday())  # Monday as start
    end_of_week = start_of_week + timedelta(days=6)

    orders = OrdersModel.objects.filter(
        created_at__date__range=[start_of_week, end_of_week]
    )

    # Serialize the data
    serializer = OrderSerializer(orders, many=True)

    # Calculate daily sales
    sales_data = []
    daily_sales = {day: 0 for day in calendar.day_name}

    for order in orders:
        day_name = calendar.day_name[order.created_at.weekday()]
        daily_sales[day_name] += float(order.total_price)

    # Format for response
    sales_data = [{"day": day, "sales": amount} for day, amount in daily_sales.items()]
    total_week_sales = sum(daily_sales.values())

    return Response(
        {
            "sales_data": sales_data,
            "total_week_sales": total_week_sales,
            "orders": serializer.data,  # Include serialized order details
        }
    )
