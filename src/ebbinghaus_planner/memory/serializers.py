from rest_framework import serializers
from .models import memory

class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = memory
        fields = '__all__'
