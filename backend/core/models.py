from django.db import models

class QuizResult(models.Model):
    user_id = models.CharField(max_length=64, db_index=True)
    quiz_key = models.CharField(max_length=100)
    answers = models.JSONField(default=list)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_id} - {self.quiz_key}"

# Create your models here.
