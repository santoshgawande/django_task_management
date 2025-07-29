
# from channels.generic.websocket import AsyncWebsocketConsumer
# import json

# class TaskConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.channel_layer.group_add("tasks", self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard("tasks", self.channel_name)

#     async def receive(self, text_data):
#         print("🔌 WebSocket message received")


from channels.generic.websocket import AsyncWebsocketConsumer
import json


class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("✅ WebSocket connected")

    async def disconnect(self, close_code):
        print("❌ WebSocket disconnected")

    async def receive(self, text_data):
        print("📩 Received:", text_data)
