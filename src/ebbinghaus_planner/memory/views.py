from rest_framework import generics, status
from .models import Memory, ReviewDate, MemoryReview
from .serializers import MemorySerializer
from .utils import calculate_review_dates
from .utils import create_daily_dates
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from django.utils import timezone

class MemoryListCreateView(generics.ListCreateAPIView):
    serializer_class = MemorySerializer
    def get_queryset(self):
        '''
        This method is called during a GET request to determine which objects should be listed.

        Here, apprently, all are listed
        '''
        return Memory.objects.all()

    def perform_create(self, serializer):
        '''
        This method is called by the ListCreateAPIView when a POST request is made. 
        It's responsible for actually saving the object to the database. 
        The provided perform_create method in your MemoryListCreateView takes the saved memory and calculates its review dates.
        '''
        memory = serializer.save()
        
        # Your algorithm to calculate the review dates goes here.
        review_dates_list = calculate_review_dates(memory.created_date)
        
        if memory.type == 1:
            review_dates_list = create_daily_dates(memory.created_date)

        for review_date in review_dates_list:
            rd, _ = ReviewDate.objects.get_or_create(date=review_date)
            '''
             The ReviewDate object (rd) is then associated with the memory instance. 
             This is made possible because of the ManyToMany relationship 
             between Memory and ReviewDate (specified in the Memory model). 
             The add method is used to associate the ReviewDate instance with the Memory instance, 
             effectively creating an en try in the intermediate join table (in this case, the MemoryReview table).
            '''
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
