from django.contrib import admin
from .models import Disaster, Shelter, Volunteer, ContactMessage, PredictedValues

admin.site.register(Disaster)
admin.site.register(Shelter)
admin.site.register(Volunteer)
admin.site.register(ContactMessage)
admin.site.register(PredictedValues)

class DisasterAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'verified')
    # Removed save_model with WebSocket alert logic as WebSockets are deprecated.
