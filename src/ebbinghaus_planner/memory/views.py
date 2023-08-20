from rest_framework import generics
from .models import memory
from .serializers import MemorySerializer

class MemoryListCreateView(generics.ListCreateAPIView):
    queryset = memory.objects.all()
    serializer_class = MemorySerializer
