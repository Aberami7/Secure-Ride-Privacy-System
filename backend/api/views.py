import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import RideBooking, RideUser 
from django.utils import timezone

@csrf_exempt
def login_with_otp(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            mobile = data.get('mobile')
            otp = data.get('otp')

            if otp != "123456":
                return JsonResponse({'status': 'error', 'message': 'Invalid OTP!'}, status=400)

            user, created = RideUser.objects.get_or_create(
                mobile=mobile, 
                defaults={'name': username, 'email': f"{username.lower()}@secure.ride"}
            )
            
            return JsonResponse({
                'status': 'success',
                'user': {
                    'name': user.name,
                    'mobile': user.mobile,
                }
            }, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'Invalid method'}, status=405)

@csrf_exempt
def create_ride(request):
    """
    Ride initiate aagum podhu 'Not Paid' status-oda create aagum.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_mobile = data.get('user_mobile') 
            
            user = RideUser.objects.filter(mobile=user_mobile).first()

            if not user:
                return JsonResponse({'status': 'Error', 'message': 'User not found!'}, status=404)

            new_ride = RideBooking.objects.create(
                user=user, 
                driver_name=data.get('driverName', 'Unknown'),
                vehicle_model=data.get('vehicle', 'Not Specified'),
                plate_number=data.get('plate', 'N/A'),
                fare=data.get('fare', '0'),
                distance=data.get('dist', '0.0 KM'),
                eta=data.get('eta', '0 MINS'),
                pickup_location=data.get('pickup', 'Not Provided'), 
                destination_location=data.get('destination', 'Not Provided'),
                status='Not Paid' 
            )
            
            return JsonResponse({
                'status': 'Success', 
                'message': 'Ride initiated', 
                'ride_id': new_ride.id 
            }, status=201)
        except Exception as e:
            return JsonResponse({'status': 'Error', 'message': str(e)}, status=400)

# ✅ PUTHU FUNCTION: Payment status-ai update panna
@csrf_exempt
def update_payment_status(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ride_id = data.get('ride_id')
            
            ride = RideBooking.objects.filter(id=ride_id).first()
            if ride:
                # Status-ai 'Completed' nu mathuroam
                ride.status = 'Completed'
                ride.save()
                return JsonResponse({'status': 'Success', 'message': 'Payment status updated!'}, status=200)
            
            return JsonResponse({'status': 'Error', 'message': 'Ride not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'Error', 'message': str(e)}, status=400)

def get_ride_history(request):
    if request.method == 'GET':
        try:
            mobile = request.GET.get('mobile')
            
            if mobile:
                rides = RideBooking.objects.filter(user__mobile=mobile).order_by('-created_at')
            else:
                rides = []

            ride_data = []
            for ride in rides:
                # Correct Local Time
                local_time = timezone.localtime(ride.created_at)
                
                ride_data.append({
                    'id': ride.id,
                    'driver': ride.driver_name,
                    'vehicle': ride.vehicle_model,
                    'fare': ride.fare,
                    'date': local_time.strftime("%b %d, %Y • %I:%M %p"),
                    'status': ride.status,
                    'pickup': getattr(ride, 'pickup_location', 'Unknown'),
                    'destination': getattr(ride, 'destination_location', 'Unknown')
                })
            return JsonResponse(ride_data, safe=False)
        except Exception as e:
            return JsonResponse({'status': 'Error', 'message': str(e)}, status=500)