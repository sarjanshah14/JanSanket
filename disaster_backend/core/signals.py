from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Disaster
from .utils import send_disaster_alert

@receiver(pre_save, sender=Disaster)
def disaster_pre_save(sender, instance, **kwargs):
    # Store previous verified state on instance for post_save to read
    if instance.pk:
        try:
            old = Disaster.objects.get(pk=instance.pk)
            instance._pre_save_is_verified = old.is_verified
        except Disaster.DoesNotExist:
            instance._pre_save_is_verified = False
    else:
        instance._pre_save_is_verified = False

@receiver(post_save, sender=Disaster)
def disaster_post_save(sender, instance, created, **kwargs):
    prev = getattr(instance, "_pre_save_is_verified", False)
    # If was not verified before and now is verified, broadcast alert
    if not prev and instance.is_verified:
        message = f"🚨 Status: {instance.description}"
        data = {
            "id": instance.pk,
            "type": instance.type,
            "address": instance.address,
            "severity_level": instance.severity_level,
            "description": instance.description,
            "timestamp": instance.timestamp.isoformat(),
        }
        send_disaster_alert(message, data)
