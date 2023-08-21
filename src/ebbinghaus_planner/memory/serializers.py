from rest_framework import serializers
from .models import Memory, ReviewDate, MemoryReview

class ReviewDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDate
        fields = ['date']

class MemorySerializer(serializers.ModelSerializer):
    review_dates = serializers.SerializerMethodField()

    class Meta:
        model = Memory
        fields = ['id', 'title', 'created_date', 'review_dates']

    def get_review_dates(self, obj):
        # Retrieve all reviewed dates for the current memory object from the MemoryReview model
        reviewed_dates = MemoryReview.objects.filter(memory=obj, reviewed=True).values_list('review_date__date', flat=True)
        
        # Filter out the reviewed dates from the memory's review_dates
        unreviewed_dates = [review_date for review_date in obj.review_dates.all() if review_date.date not in reviewed_dates]

        # Serialize and return the unreviewed dates
        return ReviewDateSerializer(unreviewed_dates, many=True).data

