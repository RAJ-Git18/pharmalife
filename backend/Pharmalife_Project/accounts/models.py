from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    # Add custom fields (optional)
    age = models.PositiveIntegerField(null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    cartcount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
