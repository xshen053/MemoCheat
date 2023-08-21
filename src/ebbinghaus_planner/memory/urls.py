from django.urls import path
from .views import MemoryListCreateView
from . import views

urlpatterns = [
    path('memory/', MemoryListCreateView.as_view(), name='memory-list-create'),
    path('mark_as_reviewed/<int:memory_id>/', views.mark_as_reviewed, name='mark_as_reviewed'),

]
