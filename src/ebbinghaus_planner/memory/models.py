from django.db import models

class ReviewDate(models.Model):
    date = models.DateField()

class Memory(models.Model):
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    review_dates = models.ManyToManyField(ReviewDate, through='MemoryReview', related_name='memories')

class MemoryReview(models.Model):
    memory = models.ForeignKey(Memory, on_delete=models.CASCADE)
    review_date = models.ForeignKey(ReviewDate, on_delete=models.CASCADE)
    reviewed = models.BooleanField(default=False)
