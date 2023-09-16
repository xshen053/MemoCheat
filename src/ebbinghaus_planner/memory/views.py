from rest_framework import generics, status
from .models import Memory, ReviewDate, MemoryReview
from .serializers import MemorySerializer
from .utils import calculate_review_dates
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from django.utils import timezone

class MemoryListCreateView(generics.ListCreateAPIView):
    serializer_class = MemorySerializer

    # def get_queryset(self):
    #     today_date = timezone.now().date()
        
    #     # Get memories that have a review scheduled for today
    #     memories_with_today_review = Memory.objects.filter(memoryreview__review_date__date=today_date)
        
    #     # Exclude memories that have been reviewed today
    #     # memories_to_review_today = memories_with_today_review.exclude(memoryreview__reviewed=True, memoryreview__review_date__date=today_date)

    #     return memories_with_today_review
    def get_queryset(self):
        return Memory.objects.all()

    def perform_create(self, serializer):
        memory = serializer.save()
        
        # Your algorithm to calculate the review dates goes here.
        review_dates_list = calculate_review_dates(memory.created_date)
        
        for review_date in review_dates_list:
            rd, _ = ReviewDate.objects.get_or_create(date=review_date)
            memory.review_dates.add(rd)


@api_view(['POST'])
def mark_as_reviewed(request, memory_id):
    try:
        memory = Memory.objects.get(id=memory_id)
        review_date_today = ReviewDate.objects.get(date=date.today())
        memory_review = MemoryReview.objects.get(memory=memory, review_date=review_date_today)
        memory_review.reviewed = True
        memory_review.save()
        return Response({"message": "Memory marked as reviewed."}, status=status.HTTP_200_OK)
    except Memory.DoesNotExist:
        return Response({"message": "Memory not found."}, status=status.HTTP_404_NOT_FOUND)
    except ReviewDate.DoesNotExist:
        return Response({"message": "Review date for today not found."}, status=status.HTTP_404_NOT_FOUND)
    except MemoryReview.DoesNotExist:
        return Response({"message": "Memory review for today not found."}, status=status.HTTP_404_NOT_FOUND)