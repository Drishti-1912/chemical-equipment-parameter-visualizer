# Create your views here.
from rest_framework.authentication import BasicAuthentication
# from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from django.http import HttpResponse
from reportlab.pdfgen import canvas



from .models import Dataset
from .utils import analyze_csv


def cleanup_old_datasets():
    """
    Keep only the latest 5 datasets.
    Delete older ones.
    """
    datasets = Dataset.objects.order_by('-uploaded_at')

    if datasets.count() > 5:
        for ds in datasets[5:]:
            ds.delete()


class CSVUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Analyze CSV using Pandas
        summary, df = analyze_csv(file)

        # Save dataset
        dataset = Dataset.objects.create(
            file=file,
            summary=summary
        )

        # 👇 THIS IS WHERE "KEEP LAST 5" IS CALLED
        cleanup_old_datasets()

        return Response(summary, status=status.HTTP_201_CREATED)

class HistoryView(APIView):
    def get(self, request):
        datasets = Dataset.objects.order_by('-uploaded_at')[:5]

        data = []
        for ds in datasets:
            data.append({
                "id": ds.id,
                "uploaded_at": ds.uploaded_at,
                "summary": ds.summary
            })

        return Response(data)

class ReportView(APIView):
    def get(self, request, id):
        dataset = Dataset.objects.get(id=id)
        summary = dataset.summary

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="report.pdf"'

        p = canvas.Canvas(response)
        p.drawString(50, 800, "Chemical Equipment Report")

        y = 760
        for key, value in summary.items():
            p.drawString(50, y, f"{key}: {value}")
            y -= 20

        p.showPage()
        p.save()

        return response
