from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer
from .models import Task


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return Task.objects.all()
        return Task.objects.filter(assigned_to=user)
    
    
    