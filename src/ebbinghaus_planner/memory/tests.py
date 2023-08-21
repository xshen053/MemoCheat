from datetime import date
from django.test import TestCase
from .models import Memory, ReviewDate, MemoryReview

class MemoryReviewTest(TestCase):
    
    def setUp(self):
        self.memory = Memory.objects.create(title="Test Memory")
        today_date = ReviewDate.objects.create(date=date.today())
        MemoryReview.objects.create(memory=self.memory, review_date=today_date)

    def test_mark_as_reviewed(self):
        response = self.client.post(f'/api/mark_as_reviewed/{self.memory.id}/')
        print(response.content)
        self.assertEqual(response.status_code, 200)
        memory_review = MemoryReview.objects.get(memory=self.memory, review_date__date=date.today())
        self.assertTrue(memory_review.reviewed)
