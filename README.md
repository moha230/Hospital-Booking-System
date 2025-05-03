# 🏥 Hospital Booking System

A full-featured Hospital Booking System designed to manage appointments, doctor listings, and hospital operations efficiently. The system supports multiple user roles including **patients**, **hospital directors**, and **super admins**, each with their own functionalities.

---

## 🔧 Core Features

### 🏨 Hospital Location
Hospitals where patients can register, find doctors, and book appointments.

---

### 👨‍⚕️ Doctor
Each doctor has the following properties:
- Name
- Specialization
- Experience
- Consultation fees
- Available timings
- Location
- Patient reviews

---

### 👤 Patient
Patients can:
- Register and delete their account
- Update personal details (e.g., phone, email, medical history)
- View a list of available doctors per hospital/location
- View details of selected doctors
- View past appointments with stats (e.g., total visits, amount spent)
- Book or cancel appointments
- Leave reviews for doctors

---

### 🧾 Receptionist
Receptionists can:
- Update their profile
- Add, update, or remove doctor details
- View and filter the doctor list
- Approve or reject appointments
- View past appointments
- View detailed doctor information and patient reviews
- Lock patient accounts (patients must contact hospital to unlock)
- View statistics with graphs:
  - Total appointments
  - Most booked doctors
  - Patient visit trends

---

### 👨‍💼 Hospital Director
Directors can:
- Perform all receptionist tasks
- Add or remove receptionists
- View financial reports:
  - Total consultation earnings
  - Highest-earning doctors
- Update their profile

---

### 🏢 Hospital Administration
Used in the "About" section of the app:
- List of hospital directors and receptionists
- Basic hospital details (location, contact info, services offered)

---

### 🔐 Admin (Super User)
The system root user with full access:
- Perform all actions available to all other roles
- Add or remove hospital directors
- **Reset the entire system (use with caution!)**

---

> ⚙️ Built for learning and demonstration purposes. 
