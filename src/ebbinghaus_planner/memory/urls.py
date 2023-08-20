from django.urls import path
from .views import MemoryListCreateView

urlpatterns = [
    path('memory/', MemoryListCreateView.as_view(), name='memory-list-create'),
]
