from django.db import models

# 1. User Details
class RideUser(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15, unique=True) 
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.mobile})"

# 2. Ride Details
class RideBooking(models.Model):
    user = models.ForeignKey(RideUser, on_delete=models.CASCADE, related_name='rides', null=True, blank=True)
    
    driver_name = models.CharField(max_length=100)
    vehicle_model = models.CharField(max_length=100)
    plate_number = models.CharField(max_length=20)
    
    fare = models.CharField(max_length=20) 
    distance = models.CharField(max_length=20)
    eta = models.CharField(max_length=20)

    # ✅ INTHA RENDU LINE THAAN MISSING - IPPO ADD PANNIYACHU
    pickup_location = models.CharField(max_length=255, default="Unknown Start")
    destination_location = models.CharField(max_length=255, default="Unknown End")
    
    status = models.CharField(max_length=20, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        user_name = self.user.name if self.user else "Unknown User"
        return f"{user_name} - {self.driver_name} ({self.status})"