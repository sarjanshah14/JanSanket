# core/utils.py
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def send_disaster_alert(message, data=None):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "disasters",
        {
            "type": "disaster_alert",  # maps to DisasterConsumer.disaster_alert
            "message": message,
            "data": data or {}
        }
    )
