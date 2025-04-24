from django.urls import path
from .views import ask_ai

urlpatterns = [
   path("api/explain/", explain_mode),
    path("api/feedback/", feedback_mode),
]