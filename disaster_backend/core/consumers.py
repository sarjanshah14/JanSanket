import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DisasterConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Join "disasters" group to receive broadcast alerts
        await self.channel_layer.group_add("disasters", self.channel_name)
        await self.accept()
        # Optional: send connection confirmation
        await self.send(text_data=json.dumps({"message": "✅ connected to disasters"}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("disasters", self.channel_name)

    # This method matches the "type" sent in group_send
    async def disaster_alert(self, event):
        await self.send(text_data=json.dumps({
            "type": "disaster_alert",
            "message": event.get("message"),
            "data": event.get("data", {})
        }))
