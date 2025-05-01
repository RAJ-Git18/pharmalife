# models.py
import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone

class Payment(models.Model):
    """
    Tracks payments from users and admin verification actions
    """
    # Payment Identification
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_id = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Payer Information (user who made payment)
    payer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='payments_made',
        verbose_name="Paying User"
    )
    payment_method = models.CharField(
        max_length=50,
        default='esewa',
        choices=[('esewa', 'eSewa'), ('khalti', 'Khalti'), ('cash', 'Cash')]
    )
    
    # Admin Verification
    is_verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='verified_payments'
    )
    verification_date = models.DateTimeField(null=True, blank=True)
    
    # Delivery Tracking
    is_delivered = models.BooleanField(default=False)
    delivered_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='deliveries_processed'
    )
    delivery_date = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment #{self.order_id} by {self.payer}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def save(self, *args, **kwargs):
        if self.is_verified and not self.verification_date:
            self.verification_date = timezone.now()
        if self.is_delivered and not self.delivery_date:
            self.delivery_date = timezone.now()
        super().save(*args, **kwargs)