import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

/* ✅ Register Chart.js components */
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ✅ Fetch history on page load */
  useEffect(() => {
    fetchHistory();
  }, []);

  /* ✅ Chart data (safe) */
  const chartData = summary
    ? {
        labels: Object.keys(summary.type_distribution),
        datasets: [
          {
            label: "Equipment Count",
            data: Object.values(summary.type_distribution),
          },
        ],
      }
    : null;

  /* ✅ Upload CSV */
  const uploadCSV = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );

      setSummary(res.data);
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Fetch upload history */
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/history/",
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      setHistory(res.data);
    } catch (err) {
      console.error("History fetch failed", err);
    }
  };

  /* ✅ Download PDF */
  const downloadPDF = (id) => {
    window.open(
      `http://127.0.0.1:8000/api/report/${id}/`,
      "_blank"
    );
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Chemical Equipment Parameter Visualizer</h2>

      {/* FILE INPUT */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />

      {/* UPLOAD BUTTON */}
      <button onClick={uploadCSV}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      <hr />

      {/* ================= SUMMARY SECTION ================= */}
      {summary && (
        <div>
          <h3>Summary Table</h3>

          {/* SUMMARY TABLE */}
          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              marginBottom: "20px",
              width: "500px",
            }}
          >
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Equipment</td>
                <td>{summary.total_equipment}</td>
              </tr>
              <tr>
                <td>Average Flowrate</td>
                <td>{summary.avg_flowrate}</td>
              </tr>
              <tr>
                <td>Average Pressure</td>
                <td>{summary.avg_pressure}</td>
              </tr>
              <tr>
                <td>Average Temperature</td>
                <td>{summary.avg_temperature}</td>
              </tr>
            </tbody>
          </table>

          {/* TYPE DISTRIBUTION TABLE */}
          <h4>Type Distribution Table</h4>
          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              marginBottom: "20px",
              width: "500px",
            }}
          >
            <thead>
              <tr>
                <th>Equipment Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.type_distribution).map(
                ([type, count]) => (
                  <tr key={type}>
                    <td>{type}</td>
                    <td>{count}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* BAR CHART */}
          <h4>Type Distribution Chart</h4>
          <div style={{ width: "600px", height: "350px" }}>
            {chartData && <Bar data={chartData} />}
          </div>
        </div>
      )}

      <hr />

      {/* ================= HISTORY SECTION ================= */}
      <h3>Upload History (Last 5)</h3>
      {history.length === 0 && <p>No uploads yet</p>}

      {history.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            width: "500px",
          }}
        >
          <p><b>ID:</b> {item.id}</p>
          <p><b>Uploaded At:</b> {item.uploaded_at}</p>
          <p><b>Total Equipment:</b> {item.summary.total_equipment}</p>
          <p><b>Avg Flowrate:</b> {item.summary.avg_flowrate}</p>
          <p><b>Avg Pressure:</b> {item.summary.avg_pressure}</p>
          <p><b>Avg Temperature:</b> {item.summary.avg_temperature}</p>

          <button onClick={() => downloadPDF(item.id)}>
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
