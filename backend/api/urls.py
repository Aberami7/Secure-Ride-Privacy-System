from django.urls import path
from . import views

urlpatterns = [
    # Login and OTP logic
    path('signin/', views.login_with_otp, name='signin'), 
    
    # Ride creation
    path('create-ride/', views.create_ride, name='create_ride'),
    
    # Ride history fetching
    path('ride-history/', views.get_ride_history, name='ride_history'),
    
    # ✅ Ippo sethurukura puthu path: Payment status-ai update panna
    path('update-payment/', views.update_payment_status, name='update_payment'),
]