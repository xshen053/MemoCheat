from rest_framework import serializers
from .models import Memory, ReviewDate, MemoryReview
from datetime import datetime, timedelta

class ReviewDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDate
        fields = ['date']

class MemorySerializer(serializers.ModelSerializer):
    review_dates = serializers.SerializerMethodField()
    is_coding_problem = serializers.SerializerMethodField()
    class Meta:
        model = Memory
        fields = ['id', 'title', 'created_date', 'review_dates', 'is_coding_problem']

    def get_review_dates(self, obj):
        # Retrieve all reviewed dates for the current memory object from the MemoryReview model
        reviewed_dates = MemoryReview.objects.filter(memory=obj, reviewed=True).values_list('review_date__date', flat=True)
        
        # Filter out the reviewed dates from the memory's review_dates
        unreviewed_dates = [review_date for review_date in obj.review_dates.all() if review_date.date not in reviewed_dates]

        # Serialize and return the unreviewed dates
        return ReviewDateSerializer(unreviewed_dates, many=True).data

    def get_is_coding_problem(self, obj):
        """
        append 1 or 0 to json when sending the response to frontend

        Returns:
            1 if current obj is a coding problem, 0 otherwise
        """
        return 1 if self._is_valid_coding_problem(obj.title) else 0

    def _is_valid_coding_problem(self, title):
        """
        Check if a title represents a coding problem.

        The title is considered a coding problem if it matches the following pattern:
        - A single digit (from 0 to 9)
        - Followed by a dot (.)
        - Followed by another single digit (from 0 to 9)
        OR
        - Starting from Coding

        valid str:
        9.1, 9.2, 13.1, Codingxxxxxx

        Returns:
            bool: True if the title matches the pattern, otherwise False.
        """
        if title.startswith("Coding"):
            return True
        else:
            s_wo_space = title.replace(" ", "")
            s_wo_space_dot = s_wo_space.replace(".", "")
            return s_wo_space_dot.isdigit()

