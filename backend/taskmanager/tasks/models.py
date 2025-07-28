from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4
User = get_user_model()


STATUS = (
    ('pending', 'Pending'),
    ('completed', 'Completed')
)

class Task(models.Model):
    task_id = models.UUIDField(default=uuid4, editable=False, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()
    priority = models.CharField(max_length=50)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS, default='pending') # pending, completed

    def __str__(self):
        return self.title