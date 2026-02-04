import sys
import requests

from PyQt5.QtWidgets import (
    QApplication, QWidget, QPushButton, QLabel,
    QVBoxLayout, QFileDialog
)

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure


API_URL = "http://127.0.0.1:8000/api/upload/"


class ChartCanvas(FigureCanvas):
    def __init__(self):
        self.fig = Figure(figsize=(5, 4))
        self.ax = self.fig.add_subplot(111)
        super().__init__(self.fig)

    def plot(self, data):
        self.ax.clear()
        self.ax.bar(data.keys(), data.values())
        self.ax.set_title("Equipment Type Distribution")
        self.ax.tick_params(axis='x', rotation=45)
        self.draw()


class App(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer (Desktop)")
        self.resize(600, 500)

        self.label = QLabel("Upload a CSV file")
        self.summary_label = QLabel("")

        self.button = QPushButton("Select CSV")
        self.button.clicked.connect(self.upload_csv)

        self.chart = ChartCanvas()

        layout = QVBoxLayout()
        layout.addWidget(self.label)
        layout.addWidget(self.button)
        layout.addWidget(self.summary_label)
        layout.addWidget(self.chart)

        self.setLayout(layout)

    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV File", "", "CSV Files (*.csv)"
        )

        if not file_path:
            return

        files = {"file": open(file_path, "rb")}

        response = requests.post(API_URL, files=files,auth=("admin","admin"))

        if response.status_code != 201:
            self.summary_label.setText("Upload failed")
            return

        data = response.json()

        self.summary_label.setText(
            f"""
Total Equipment: {data['total_equipment']}
Avg Flowrate: {data['avg_flowrate']}
Avg Pressure: {data['avg_pressure']}
Avg Temperature: {data['avg_temperature']}
"""
        )

        self.chart.plot(data["type_distribution"])


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = App()
    window.show()
    sys.exit(app.exec_())
