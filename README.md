

### **Hospital Booking System Features**  

Your application should contain all the necessary features of a hospital booking business. Below are some example use cases and models that you might need.  

---

### **Hospital Location**  
A place where patients can book appointments and receive treatment.  

---

### **Doctor**  
Different doctor properties like: name, specialization, experience, consultation fees, available timings, location, patient reviews, etc.  

---

### **Patient**  
A patient is a person who will book an appointment with a doctor at your hospital. You need to plan what the patient can do in your hospital booking app.  

#### **Example Use Cases:**  
- Can register and unregister (removes all patient data)  
- Can update own data (phone, email, medical history, etc.)  
- Can see a list of available doctors in a selected hospital/location  
- Can see details of a selected doctor (name, specialization, consultation fees, available timings, reviews, etc.)  
- Can see a list of past appointments with statistics (total visits, total amount spent, etc.)  
- Can book an appointment with a doctor  
- Can cancel an appointment  
- Can leave a review for a doctor (date, patient name, doctor, feedback, etc.)  

---

### **Receptionist**  
A receptionist is an employee working at the hospital who handles patient bookings and cancellations.  

#### **Example Use Cases:**  
- Can update own data (name, phone, etc.)  
- Can add/remove/update doctor details (name, specialization, fees, availability, etc.)  
- Can see a list of all doctors  
- Can filter doctors based on different parameters (specialization, available today, fees, etc.)  
- Can accept or reject appointment requests  
- Can see a list of past appointments  
- Can see details of a selected doctor (all doctor details, list of treated patients, reviews, etc.)  
- Can lock a patient from the system (needs to contact the hospital again to unlock)  
- Can see different statistics with graphs:  
  - Total appointments booked  
  - Most frequently booked doctors  
  - Patient visit trends  

---

### **Hospital Director**  
The hospital director oversees hospital operations and finances.  

#### **Example Use Cases:**  
- All that a receptionist can do  
- Can add a new receptionist  
- Can remove a receptionist  
- Can view more financial details (total earnings from consultations, highest-earning doctors, etc.)  
- Can update own details (name, phone, etc.)  

---

### **Hospital Administration**  
Use hospital details in your app's About page.  

#### **Example Information:**  
- List of hospital directors  
- List of receptionists  
- Basic information about the hospital (location, contact details, services offered, etc.)  

---

### **Admin (Super User)**  
The root user of the system who has full control over all features.  

#### **Example Use Cases:**  
- Can do/see/use all the features in the system  
- Can add a new hospital director  
- Can remove a hospital director  
- Can reset the entire system (**USE WITH CAUTION!**)  

