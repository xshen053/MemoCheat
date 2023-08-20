from django.urls import path
from .views import MemoryListCreateView

urlpatterns = [
    path('memory/', TaskListCreateView.as_view(), name='memory-list-create'),
]
