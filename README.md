# Chemical Equipment Parameter Visualizer  
(Hybrid Web + Desktop Application)

## 📌 Project Overview
This project is a hybrid application that works as both:
- A **Web Application (React.js)**  
- A **Desktop Application (PyQt5)**  

It allows users to upload a CSV file containing chemical equipment data.  
The backend analyzes the data and returns summary statistics and visualizations.

Both frontends consume the **same Django REST API**, ensuring consistency across platforms.

---

## 🧪 Sample CSV Format
```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Pump A,Pump,10,5,300
Valve A,Valve,8,4,290
Reactor A,Reactor,15,7,350
