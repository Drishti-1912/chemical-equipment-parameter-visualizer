# Chemical Equipment Parameter Visualizer  
**Hybrid Web + Desktop Application**

---

## 📌 Project Overview

The **Chemical Equipment Parameter Visualizer** is a hybrid application that works as both:

- 🌐 **Web Application (React.js)**
- 🖥️ **Desktop Application (PyQt5)**

The application allows users to upload a CSV file containing chemical equipment data.  
A single **Django REST backend** processes the data, performs analytics using **Pandas**, and exposes APIs that are consumed by both the web and desktop clients.

The project demonstrates **proper data handling**, **API integration**, and **UI/UX consistency** across platforms.

---

## 📄 Sample CSV Format

The application expects a CSV file with the following columns:
```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Pump A,Pump,10,5,300
Valve A,Valve,8,4,290
Reactor A,Reactor,15,7,350
```

A sample file **sample_equipment_data.csv** is included in the repository for testing and demo purposes.

---

## 🏗️ Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | Django, Django REST Framework |
| Data Handling | Pandas |
| Database | SQLite |
| Web Frontend | React.js, Chart.js |
| Desktop Frontend | PyQt5, Matplotlib |
| Authentication | Basic Authentication (DRF) |
| Version Control | Git & GitHub |

---

## ⚙️ Key Features

- CSV upload from **Web and Desktop**
- Data analytics using **Pandas**
- Summary statistics:
  - Total equipment count
  - Average flowrate
  - Average pressure
  - Average temperature
  - Equipment type distribution
- Interactive visualizations:
  - Chart.js (Web)
  - Matplotlib (Desktop)
- History management (last 5 uploads)
- PDF report generation
- Common backend API for all clients

---

## 📂 Project Structure
```
chemical-equipment-visualizer/
├── backend/
│ ├── backend/
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── equipment/
│ │ ├── models.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ └── utils.py
│ ├── db.sqlite3
│ └── manage.py
├── web-frontend/
│ └── src/
│ └── App.js
├── desktop-app/
│ └── app.py
├── sample_equipment_data.csv
└── README.md
```

## 🚀 Setup Instructions
1️⃣ Backend Setup (Django)
cd backend
pip install django djangorestframework pandas reportlab django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


Backend runs at:
http://127.0.0.1:8000

2️⃣ Web Frontend Setup (React)
cd web-frontend
npm install
npm start


Web application runs at:
http://localhost:3000

3️⃣ Desktop Application Setup (PyQt5)
cd desktop-app
pip install pyqt5 matplotlib requests
python app.py

##🔐 Authentication Note

The backend APIs are secured using Basic Authentication via Django REST Framework.

Web (React) and Desktop (PyQt) clients send credentials programmatically.

API access without credentials will result in 401 Unauthorized.

When downloading PDF reports directly via the browser, a standard Basic Authentication prompt may appear.

This setup is intentional and suitable for demonstration purposes.

## 🔗 API Endpoints

Method	Endpoint	Description

POST	/api/upload/	Upload CSV and receive summary

GET	/api/history/	Retrieve last 5 uploads

GET	/api/report/<id>/	Download PDF report

## 📊 Demo

A short demo video (2–3 minutes) demonstrates:

CSV upload via Web app

Data summary and charts

Upload history and PDF download

Desktop application using the same backend

## 📹 Demo Video Link: (add link here)

## 🧠 Design Highlights

Single backend serving multiple clients

Backend as the single source of truth

Stateless REST APIs

Consistent data representation across Web and Desktop

Clear separation of concerns

## ✅ Conclusion

This project demonstrates:

Full-stack development

Proper data handling and analytics

REST API design and integration

Cross-platform application development

It fulfills all requirements specified in the intern screening task.


