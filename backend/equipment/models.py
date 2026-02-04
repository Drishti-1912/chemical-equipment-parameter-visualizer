from django.db import models

class Dataset(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='csvs/')
    summary = models.JSONField()

    def __str__(self):
        return f"Dataset {self.id} - {self.uploaded_at}"
