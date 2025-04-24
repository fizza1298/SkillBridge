from django.urls import path
from .views import explain_mode, feedback_mode

urlpatterns = [
    path("explain/", explain_mode, name="explain"),
    path("feedback/", feedback_mode, name="feedback"),
]