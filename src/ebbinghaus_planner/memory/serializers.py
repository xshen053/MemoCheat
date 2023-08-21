from rest_framework import serializers
from .models import Memory, ReviewDate

class ReviewDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDate
        fields = ['date']

class MemorySerializer(serializers.ModelSerializer):
    review_dates = ReviewDateSerializer(many=True, read_only=True)

    class Meta:
        model = Memory
        fields = ['id', 'title', 'created_date', 'review_dates']
