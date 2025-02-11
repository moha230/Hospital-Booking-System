# Doctors management system

 A small doctor management system that has admin users managers. Using the new framework.

# Back end stack used 
* Hono 
* Deno 
* eta 
* zod 


## commands needed to run the server 

* deno run --watch --allow-net --allow-read --unstable-kv  app.js  


## API testing tools 

### curl 

* curl http://0.0.0.0:8000/

### postman 


## database 

* initial database 



# Use Cases for Hospital Management System

## 1. Register and Unregister
- Users can register as patients in the system and unregister (removes all patient data, including medical records).

## 2. Update Own Data
- Users can update their personal information, such as phone number, email, address, emergency contact, etc.

## 3. View Available Doctors and Specializations
- Users can see a list of available doctors in the hospital, filtered by specialization (e.g., cardiologist, dermatologist) or city/location.

## 4. View Doctor Details
- Users can see the details of a selected doctor, including their name, specialization, experience, schedule, patient reviews, and consultation fees.

## 5. View Past Appointments and Medical History
- Users can see a list of their past appointments, along with details such as the diagnosis, prescribed treatment, and medications. They can also view medical history, including any previous surgeries or treatments.

## 6. Book an Appointment
- Users can book an appointment with a doctor, select a time slot, and receive appointment confirmation along with costs.

## 7. Cancel or Reschedule an Appointment
- Users can cancel or reschedule their appointments based on hospital policies.

## 8. Leave a Review for Doctor or Treatment
- After receiving treatment or consultation, users can leave a review of their experience with the doctor or the hospital's services (including text feedback and rating).

## 9. Access Medical Reports
- Users can access their lab reports, X-rays, or any other medical documents through their account.

## 10. Request Prescriptions or Refills
- Users can request a refill of prescribed medications or ask for a new prescription from their doctors (with appropriate approval).

## 11. Pay for Medical Services
- Users can pay for consultations, treatments, surgeries, or other hospital services directly through the app (with different payment methods).

## 12. Track Billing and Insurance Claims
- Users can view the detailed billing information for their medical services, and track the progress of insurance claims.

## 13. Emergency Assistance
- Users can contact emergency services or request emergency medical assistance directly from the app in case of critical situations.


User Management
POST /users/register → Register new users (patients, doctors, admins)
POST /users/login → Authenticate users
GET /users/:id → Get user details
PUT /users/:id → Update user profile
