from rest_framework import serializers
from .models import DashboardItem

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardItem
        fields = '__all__'