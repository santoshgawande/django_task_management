from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Task
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


@receiver(post_save, sender=Task)
def broadcast_task_update(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "tasks",
        {
            "type": "send_task_update",
            "message": {
                "id": str(instance.id),
                "title": instance.title,
                "status": instance.status
            }
        }
    )
