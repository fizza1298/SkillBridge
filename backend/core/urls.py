from django.urls import path
from . import views
from .views import explain_mode, feedback_mode, speak

urlpatterns = [
    path("explain/", explain_mode, name="explain"),
    path("feedback/", feedback_mode, name="feedback"),
    path('quiz/<str:quiz_key>/', views.quiz_result, name='quiz_result'),
    path("speak/",  speak, name='speak'),
]
