from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from tasks.models import Task
from datetime import date, timedelta
from faker import Faker
import random

User = get_user_model()

fake = Faker()

class Command(BaseCommand):
    help ="Seed tasks using Faker"
    
    def handle(self, *args, **kwargs):
        # create sample users
        user1, _ = User.objects.get_or_create(username='adminuser', defaults={'is_admin':True, 'is_superuser':True, 'is_staff':True})
        user2, _ = User.objects.get_or_create(username='regularuser')
        user1.set_password('admin123')
        user2.set_password('user123')
        user1.save()
        user2.save()
        
        Task.objects.all().delete()
        priorities = ['low', 'medium', 'high']
        statuses = ['pending', 'completed']
        
        for i in range(100):
            Task.objects.create(
                title=fake.sentence(nb_words=4),
                description=fake.paragraph(nb_sentences=3),
                due_date=fake.date_between(start_date='-10d', end_date='+30d'),
                priority=random.choice(priorities),
                status=random.choice(statuses),
                assigned_to=random.choice([user1, user2])
            )

        self.stdout.write(self.style.SUCCESS("Seeded 100 tasks with Faker."))