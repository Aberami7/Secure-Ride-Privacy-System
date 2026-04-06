                                                     Secure-Ride-Privacy-System

         * Abstract *
This project is a secure ride-booking application designed to protect user privacy during ride transactions. It eliminates direct user-driver payment interaction by integrating a secure payment gateway, ensuring that sensitive information such as phone numbers and UPI IDs are not exposed.

        * Problem Statement *
In many ride-hailing systems, users often pay drivers directly using UPI applications. This leads to:
- Exposure of personal phone numbers  
- Exposure of UPI IDs  
- Risk of misuse, harassment, or unwanted contact  
- Lack of privacy control after payment  

        * Proposed Solution *
This project introduces a **privacy-preserving payment mechanism** using a payment gateway.

- Payments are processed through the platform instead of directly to drivers  
- User and driver identities are hidden during transactions  
- No direct sharing of phone numbers or UPI IDs  
- A secure and controlled payment flow is maintained  

        * Secure Payment Integration *
The system integrates **Razorpay** as the payment gateway.
Payment Flow:
1. User books a ride  
2. User initiates payment via Razorpay  
3. Payment is securely processed  
4. Amount is credited to the platform account  
5. Platform deducts commission  
6. Remaining amount is transferred to the driver  

        * Benefits *
- No direct UPI ID exposure  
- No phone number leakage  
- Secure and trusted transaction handling  
- Real-world payment architecture  

         * System Workflow *
1. User enters pickup and drop location  
2. Ride is created in the system  
3. Driver is assigned  
4. User completes payment through Razorpay  
5. Payment is stored and processed in backend  
6. Ride status is updated

          * Key Features *
- 🚕 Ride Booking System  
- 🔒 Phone Number Masking  
- 💳 Secure Payment via Razorpay  
- 🔁 Proxy-Based Transaction Flow  
- 💬 In-App Communication  
- 🚨 Safety & Reporting Feature  

        * Technology Stack *
- Frontend: React.js  
- Backend: Django (Python)  
- Database: MySQL  
- Payment Gateway: Razorpay  

         * System Architecture *
  User → React Frontend → Django Backend → MySQL Database  
  User → Razorpay Payment Gateway → Platform Account → Driver  

           * Key Innovation *
  The system removes direct financial interaction between user and driver, ensuring:

- Complete privacy protection  
- No identity leakage through payments  
- Secure and scalable transaction model  

           * Advantages *
- Strong user privacy protection  
- Prevents misuse of personal data  
- Secure payment handling  
- Real-world applicable system  

           * Conclusion *
This project demonstrates a practical approach to securing digital payments in ride services by integrating a payment gateway and eliminating direct user-driver interaction. It enhances privacy,security, and overall user safety.
