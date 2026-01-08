from django.contrib import admin
from .models import Disaster, Shelter, Volunteer,ContactMessage,ShelterImage,PredictedValues
from .utils import send_disaster_alert 
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

admin.site.register(Disaster)
admin.site.register(Shelter)
admin.site.register(Volunteer)
admin.site.register(ContactMessage)
admin.site.register(ShelterImage)
admin.site.register(PredictedValues)

class DisasterAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'verified')

    def save_model(self, request, obj, form, change):
        """
        Runs whenever you save a Disaster in the admin.
        """
        if change:  # Editing existing disaster, not creating new
            old_obj = Disaster.objects.get(pk=obj.pk)  # The version before saving
            if not old_obj.verified and obj.verified:
                # Just verified → send WebSocket alert
                send_disaster_alert(obj)

        super().save_model(request, obj, form, change)  # Save as normal