from django.db import models

class memory(models.Model):
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    review_date = models.DateTimeField()  # You'll calculate this based on the Ebbinghaus curve
