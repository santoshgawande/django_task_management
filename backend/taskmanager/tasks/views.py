from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action

from django.core.cache import cache
from rest_framework.response import Response
import hashlib
import time

from .serializers import TaskSerializer
from .models import Task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'priority', 'due_date', 'assigned_to']
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return Task.objects.all()
        return Task.objects.filter(assigned_to=user)

    def list(self, request, *args, **kwargs):
        start = time.time()
        print("Query time: ", time.time() - start)
        raw_key = f"task_list:{request.query_params.urlencode()}"

        cache_key = hashlib.md5(raw_key.encode()).hexdigest()

        cached = cache.get(cache_key)
        if cached:
            print("Served from cache")
            return Response(cached)
        start = time.time()
        response = super().list(request, *args, **kwargs)
        print("  No cache DB + serialize time:", time.time() - start)
        cache.set(cache_key, response.data, timeout=60)
        return response

    def perform_update(self, serializer):
        instance = serializer.save()
        # broadcast the newly-updated task
        channel_layer = get_channel_layer()
        data = TaskSerializer(instance).data
        async_to_sync(channel_layer.group_send)(
            "tasks",
            {"type": "send_task_update", "data": data}
        )

    @action(detail=True, methods=['patch'])
    def status(self, request, pk=None):
        """
        PATCH /api/tasks/{pk}/status/   payload: {"completed": true}
        """
        task = self.get_object()
        completed = request.data.get('completed')
        if completed is None:
            return Response(
                {"detail": "Missing 'completed' field."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # update and save
        task.completed = bool(completed)
        task.save()

        # return updated data
        serializer = self.get_serializer(task)
        return Response(serializer.data)
