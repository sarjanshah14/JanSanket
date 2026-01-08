from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

DISASTER_TYPES = [
    ('Fire', 'Fire'),
    ('Flood', 'Flood'),
    ('Earthquake', 'Earthquake'),
    ('Storm/Hurricane','Storm/Hurricane'),
    ('Tornado','Tornado'),
    ('Landslide','Landslide'),
    ('Tsunami','Tsunami'),
    ('Volcanic Eruption','Volcanic Eruption'),
    ('Drought','Drought'),
    ('Other', 'Other'),
]

class Disaster(models.Model):
    type = models.CharField(max_length=20, choices=DISASTER_TYPES)
    severity_level = models.CharField(max_length=100, default='Moderate')  # optional
    description = models.TextField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address=models.CharField(max_length=200)
    image = models.ImageField(upload_to='disaster_images/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} at {self.address}"


class Shelter(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=255)  # new
    latitude = models.FloatField()
    longitude = models.FloatField()
    capacity = models.IntegerField(default=50)
    current_occupancy = models.IntegerField(default=0)  # new
    contact = models.CharField(max_length=100, blank=True, null=True)  # new
    verified = models.BooleanField(default=False)  # new
    amenities = models.JSONField(default=list, blank=True)  # new
    shelter_type = models.CharField(max_length=50, default="community")  # new
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class ShelterImage(models.Model):
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='shelter_images/')

    def __str__(self):
        return f"Image for {self.shelter.name}"

class Volunteer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    specialization = models.CharField(max_length=200, blank=True)
    contact = models.EmailField()  # ✅ Only one contact field now
    phone = models.CharField(max_length=15)
    availability = models.CharField(max_length=50)
    location = models.CharField(max_length=200)
    experience = models.TextField(blank=True)
    certifications = models.JSONField(blank=True, default=list)
    languages = models.JSONField(blank=True, default=list)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    URGENCY_LEVELS = [
        ('low', 'Low - General inquiry'),
        ('normal', 'Normal - Standard support'),
        ('high', 'High - Urgent issue'),
        ('critical', 'Critical - Emergency'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    urgency = models.CharField(max_length=10, choices=URGENCY_LEVELS, default='normal')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject} ({self.urgency})"

class PredictedValues(models.Model):
    name = models.OneToOneField(Shelter, related_name='predictions', on_delete=models.CASCADE)
    food_needed = models.IntegerField()
    water_required = models.IntegerField()
    Volunteers_required = models.IntegerField()
    medical_kits = models.IntegerField()
    
    def __str__(self):
        return f"{self.name.name}"