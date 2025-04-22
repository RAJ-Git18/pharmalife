import uuid
from django.db import models
from products.models import products
from django.utils import timezone


# Create your models here.
class OrdersModel(models.Model):
    order_id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    product_id = models.ForeignKey(products, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    @property
    def total_price(self):
        return self.quantity * self.price
