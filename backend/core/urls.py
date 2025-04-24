from django.urls import path
from .views import explain_mode, feedback_mode

urlpatterns = [
    path("api/explain/", explain_mode, name="explain"),
    path("api/feedback/", feedback_mode, name="feedback"),
]