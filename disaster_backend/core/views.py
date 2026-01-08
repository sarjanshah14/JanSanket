from rest_framework import status,generics,viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserRegisterSerializer,ShelterSerializer,VolunteerSerializer,DisasterSerializer,ContactMessageSerializer,PredictedValuesSerializer
from django.conf import settings
from django.http import JsonResponse
from .models import Disaster,Shelter,Volunteer,ContactMessage,PredictedValues
import requests
import os 
import joblib
import numpy as np
import pandas as pd
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json,os
import logging
from django.views.decorators.http import require_POST, require_GET



stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
def geocode_address(address):
    key = 'ee92ecdd73ea4e38b10bd8553e5f0856'
    url = f"https://api.opencagedata.com/geocode/v1/json"
    params = {'q': address, 'key': key}
    r = requests.get(url, params=params)
    results = r.json()
    if results['results']:
        latlng = results['results'][0]['geometry']
        return latlng['lat'], latlng['lng']
    return None, None


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_disaster(request):
    address = request.data.get('address')
    print("📮 Received address from frontend:", address)

    lat, lon = geocode_address(address)
    print("📍 Geocoded lat/lon:", lat, lon)

    if not lat or not lon:
        return Response({"error": "Could not locate address."}, status=400)

    data = request.data.copy()
    data['latitude'] = lat
    data['longitude'] = lon

    serializer = DisasterSerializer(data=data)
    if serializer.is_valid():
        serializer.save(reported_by=request.user)
        return Response(serializer.data, status=201)
    else:
        print("❌ Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=400)

class ListDisastersView(generics.ListAPIView):
    queryset = Disaster.objects.filter(is_verified=True).order_by('-timestamp')
    serializer_class = DisasterSerializer
    permission_classes = [AllowAny]
    
@api_view(['GET'])
def list_shelters(request):
    shelters = Shelter.objects.all()
    serializer = ShelterSerializer(shelters, many=True)
    return Response(serializer.data)

class ShelterViewSet(viewsets.ModelViewSet):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_volunteer(request):
    user = request.user
    data = request.data.copy()

    serializer = VolunteerSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # You can change to IsAuthenticated if you want to protect it
def list_volunteers(request):
    volunteers = Volunteer.objects.all()
    serializer = VolunteerSerializer(volunteers, many=True)
    permission_classes = [AllowAny]  # ✅ This makes it public
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_disasters(request):
    disasters = Disaster.objects.all()

    # Get query params safely
    disaster_type = request.query_params.get('type', None)
    verified = request.query_params.get('verified', None)

    # Filter by disaster_type
    if disaster_type:
        disasters = disasters.filter(type__iexact=disaster_type)


    # Filter by verified
    if verified is not None:
        if verified.lower() == 'true':
            disasters = disasters.filter(is_verified=True)
        elif verified.lower() == 'false':
            disasters = disasters.filter(is_verified=False)

    serializer = DisasterSerializer(disasters, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def submit_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message submitted successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        print("🔥 Volunteers fetched:", Volunteer.objects.all())
        return super().get(request, *args, **kwargs)


def predict_resources(request):
    model_path = os.path.join(settings.BASE_DIR, 'core', 'scripts', 'shelter_resources.pkl')
    model = joblib.load(model_path)
    
    shelters = Shelter.objects.all()
    results = []
    for shelter in shelters:
        try:
            current_occupancy = shelter.current_occupancy
            capacity = shelter.capacity

            # Derived features
            occupancy_rate = current_occupancy / capacity
            empty_beds = capacity - current_occupancy
            is_full = int(current_occupancy == capacity)

            input_data = pd.DataFrame([{
                'current_occupancy': current_occupancy,
                'capacity': capacity,
                'occupancy_rate': occupancy_rate,
                'empty_beds': empty_beds,
                'is_full': is_full
            }])

            prediction = model.predict(input_data)[0]
            food, water, kits_per_person, volunteers_per_person = prediction

            medical_kits = int(kits_per_person * current_occupancy)
            volunteers_required = int(volunteers_per_person * current_occupancy)

            # Save prediction
            prediction_obj, created = PredictedValues.objects.update_or_create(
                name=shelter,
                defaults={
                    'food_needed': round(food),
                    'water_required': round(water),
                    'medical_kits': medical_kits,
                    'Volunteers_required': volunteers_required
                }
            )

            results.append({
                'shelter': shelter.name,
                'food_needed': prediction_obj.food_needed,
                'water_required': prediction_obj.water_required,
                'medical_kits': prediction_obj.medical_kits,
                'Volunteers_required': prediction_obj.Volunteers_required
            })

        except Exception as e:
            results.append({'shelter': shelter.name, 'error': str(e)})

    return JsonResponse({'predictions': results})

# price_lookup = {
#     'free':'price_1Rtphq1yRBtzWAxgFFrCCxI2',
#     'verified-org': 'price_1RtoTB1yRBtzWAxgXWH5GlY1',
#     'shelter-promo': 'price_1RtoUE1yRBtzWAxgAQ6pDfeq',
#     'analytics': 'price_1RtoUk1yRBtzWAxgekYuOdgM',
#     'enterprise': 'price_1RtoVB1yRBtzWAxghL3PHL9R',
# }


# Set up logging
logger = logging.getLogger(__name__)

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            plan_id = data.get('plan_id')
            billing_period = data.get('billing_period')
            customer_email = data.get('customer_email')
            
            print(f"Received request: plan_id={plan_id}, billing_period={billing_period}, email={customer_email}")
            
            # Validate required parameters
            if not plan_id or not billing_period:
                return JsonResponse(
                    {'error': 'Missing required parameters: plan_id and billing_period'}, 
                    status=400
                )
            
            # Define your plans and prices
            plans = {
                'free': {
                    'monthly': 'price_1Rtphq1yRBtzWAxgFFrCCxI2',
                    'yearly': 'price_1RyehM1yRBtzWAxgUMQhEdQE'
                },
                'shelter-promo': {
                    'monthly': 'price_1RtoUE1yRBtzWAxgAQ6pDfeq',
                    'yearly': 'price_1Ryejd1yRBtzWAxgWBHqxV9G'
                },
                'analytics': {
                    'monthly': 'price_1RtoUk1yRBtzWAxgekYuOdgM',
                    'yearly': 'price_1RyejB1yRBtzWAxgGfjGX4V4'
                },
                'enterprise': {
                    'monthly': 'price_1RtoVB1yRBtzWAxghL3PHL9R',
                    'yearly': 'price_1RtoVB1yRBtzWAxghL3PHL9R'
                },
                'verified-org': {
                    'monthly': 'price_1RtoTB1yRBtzWAxgXWH5GlY1',
                    'yearly': 'price_1RyeiP1yRBtzWAxgIh4bMtLL'
                }
            }
            
            # Check if plan exists
            if plan_id not in plans:
                return JsonResponse({'error': 'Invalid plan ID'}, status=400)
                
            # Check if billing period exists for this plan
            if billing_period not in plans[plan_id]:
                return JsonResponse({'error': 'Invalid billing period for this plan'}, status=400)
            
            # Get the price ID
            price_id = plans[plan_id][billing_period]
            
            # Create checkout session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price_id,
                    'quantity': 1,
                }],
                mode='subscription',
                success_url='http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:3000/pricing',
                customer_email=customer_email,
                metadata={
                    'plan_id': plan_id,
                    'billing_period': billing_period
                }
            )
            
            print(f"Created Stripe session: {session.id}")
            return JsonResponse({'sessionId': session.id})
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)
        except Exception as e:
            print(f"Error creating checkout session: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def verify_payment(request):
    if request.method == 'GET':
        session_id = request.GET.get('session_id')
        
        if not session_id:
            return JsonResponse({'error': 'Missing session_id parameter'}, status=400)
        
        try:
            session = stripe.checkout.Session.retrieve(
                session_id,
                expand=['subscription']
            )
            
            response_data = {
                'status': 'success',
                'payment_id': session.id,
                'payment_status': session.payment_status,
                'amount': session.amount_total / 100 if session.amount_total else 0,
                'currency': session.currency.upper() if session.currency else 'USD',
                'plan_id': session.metadata.get('plan_id', ''),
                'billing_period': session.metadata.get('billing_period', ''),
            }
            
            if session.subscription and hasattr(session.subscription, 'current_period_end'):
                response_data['next_billing_date'] = session.subscription.current_period_end
            
            return JsonResponse(response_data)
            
        except stripe.error.InvalidRequestError:
            return JsonResponse({'error': 'Invalid session ID'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)