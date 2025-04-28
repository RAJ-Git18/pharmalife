from django.db import models
import uuid


# Create your models here.
class CustomerInquiryModel(models.Model):
    inquiry_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.firstName
