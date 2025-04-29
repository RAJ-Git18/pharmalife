from django.db import models
import uuid

from django.contrib.auth import get_user_model
from products.models import Product


User = get_user_model()


# Create your models here.
class CartModel(models.Model):
    carid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    productid = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
