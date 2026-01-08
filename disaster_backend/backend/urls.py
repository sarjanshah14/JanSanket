from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views import create_superuser_temp

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # 👈 This includes all API routes from the core app
    path('api/create-superuser/', create_superuser_temp), # Temporary route
    # path('', include('core.urls')),  # ✅ Include your app routes
]

# Media URL serving removed
