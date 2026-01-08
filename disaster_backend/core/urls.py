from django.urls import path
from .views import (
    register_user,  # This is a function, not a class
    report_disaster,
    ListDisastersView,  # This is a class
    register_volunteer,
    list_shelters,
    list_volunteers,
    list_disasters,
    submit_contact_message,
    VolunteerListView,  # This is a class
    predict_resources,
    create_checkout_session,
    verify_payment
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('register/', register_user, name='register'),  # Function-based view
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Disasters
    path('disasters/report/', report_disaster, name='report_disaster'),  # Function-based view
    path('disasters/', ListDisastersView.as_view(), name='list_disasters'),  # Class-based view
    path('disasters/list/', list_disasters, name='filtered_disasters'),  # Function-based view

    # Volunteers
    path('volunteer/register/', register_volunteer, name='register_volunteer'),  # Function-based view
    path('volunteers/', VolunteerListView.as_view(), name='volunteer-list'),  # Class-based view

    # Shelters
    path('shelters/', list_shelters, name='list_shelters'),  # Function-based view
    
    path('contact/', submit_contact_message, name='submit-contact'),  # Function-based view
    path('predict/', predict_resources, name='predict_resources'),  # Function-based view
    path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),  # Function-based view
    path('verify-payment/', verify_payment, name='verify_payment'),  # Function-based view
]