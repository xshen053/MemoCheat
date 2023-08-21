from rest_framework import generics, status
from .models import Memory, ReviewDate, MemoryReview
from .serializers import MemorySerializer
from .utils import calculate_review_dates
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date

class MemoryListCreateView(generics.ListCreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer

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