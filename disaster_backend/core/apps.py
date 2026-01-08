# core/apps.py
from django.apps import AppConfig

class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        # import signals so they're registered
        import core.signals  # noqa
