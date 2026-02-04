from django.urls import path
from .views import CSVUploadView, HistoryView, ReportView

urlpatterns = [
    path("upload/", CSVUploadView.as_view()),
    path("history/", HistoryView.as_view()),
    path("report/<int:id>/", ReportView.as_view()),
]
