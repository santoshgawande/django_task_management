from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from tasks.models import Task
from datetime import date

User = get_user_model()

class TaskTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='santosh', password='testpass123')
        self.client.force_authenticate(user=self.user)
    
    
    def test_create_task(self):
        url = reverse('task-list')
        data = {
            "title":"Test Task",
            "description": "Test description",
            "due_date":date.today(),
            "priority": "high",
            "assigned_to":self.user.id,
            "status":"pending"
        }
        
        response = self.client.post(url,data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(),1)
        
    
    def test_list_tasks(self):
        Task.objects.create(
            title="Existing Task",
            description="Description",
            due_date=date.today(),
            priority="medium",
            assigned_to=self.user,
            status="pending"
        )
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data),1)
        
