# C:\security\backend\api\admin.py

from django.contrib import admin
# DashboardItem-ah remove pannitu 'RideBooking' nu maathunga
from .models import RideBooking 

# Ippo antha model-ah register pannunga
admin.site.register(RideBooking)