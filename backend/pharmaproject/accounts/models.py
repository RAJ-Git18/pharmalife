from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class CustomUser(AbstractUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Add any additional fields here

    def __str__(self):
        return self.username