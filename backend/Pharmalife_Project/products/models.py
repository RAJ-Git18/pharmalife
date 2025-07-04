from django.db import models
import uuid
from django.conf import settings
 

# Create your models here.
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable= False)
    name = models.CharField(max_length=100, unique=True)

    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_latest = models.BooleanField(default=True)
    is_featured= models.BooleanField(default = False)

    def __str__(self):
        return self.name
