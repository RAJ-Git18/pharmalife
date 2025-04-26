import uuid
from django.db import models
from products.models import Product
from accounts.models import CustomUser
from django.utils import timezone


# Create your models here.
class OrdersModel(models.Model):
    order_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    @property
    def total_price(self):
        return self.quantity * self.price
