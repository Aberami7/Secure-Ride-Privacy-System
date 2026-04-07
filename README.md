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
 This project demonstrates a practical approach to securing digital payments in ride services by integrating a payment gateway and eliminating direct user-driver    interaction. It enhances privacy,security, and overall user safety.

          * Signin Page *
 <img width="1895" height="884" alt="Screenshot 2026-04-06 223732" src="https://github.com/user-attachments/assets/b5d44201-4c94-40d0-b4c7-edc7935c46fb" />
 <img width="1892" height="898" alt="Screenshot 2026-04-07 100046" src="https://github.com/user-attachments/assets/d795d592-e160-4f06-8668-327b01526012" />
 
          * Dashboard *
 <img width="1902" height="896" alt="Screenshot 2026-04-07 100129" src="https://github.com/user-attachments/assets/08fc5476-f031-4655-b91c-8b6ff4f00238" />

          * Book Now page *
 <img width="1889" height="894" alt="Screenshot 2026-04-07 100613" src="https://github.com/user-attachments/assets/3606365e-f2a4-4e2b-bb4a-4ed2ec965e21" />

          * Active Ride page *
  <img width="1889" height="891" alt="Screenshot 2026-04-07 100803" src="https://github.com/user-attachments/assets/e7bc7517-d90b-4367-a6c8-cfc9b7ad3267" />
  <img width="1887" height="896" alt="Screenshot 2026-04-07 101300" src="https://github.com/user-attachments/assets/9ee636b0-dee1-4840-bce3-9d318b4b7567" />
  <img width="1888" height="890" alt="Screenshot 2026-04-07 101355" src="https://github.com/user-attachments/assets/fe7fcbab-9836-4d83-ac86-5b181da39160" />

          * Payment Page *
  <img width="1889" height="892" alt="Screenshot 2026-04-07 101540" src="https://github.com/user-attachments/assets/611b9ce9-8169-4922-ae8f-96346753e2cd" />
  <img width="1886" height="903" alt="Screenshot 2026-04-07 101719" src="https://github.com/user-attachments/assets/c28fed1b-b960-4188-8ad8-862555fa0127" />
  <img width="1193" height="651" alt="Screenshot 2026-04-07 102217" src="https://github.com/user-attachments/assets/e861e347-0394-4ba6-8a9f-a8bd89f91ddf" />
  <img width="1900" height="890" alt="image" src="https://github.com/user-attachments/assets/e9f7ab9c-2389-47cc-a21e-db0307c4582b" />
  <img width="1882" height="897" alt="image" src="https://github.com/user-attachments/assets/6f6e06d9-81d8-4966-9395-a8e96b8815db" />

         * History page *
  <img width="1894" height="891" alt="Screenshot 2026-04-07 102845" src="https://github.com/user-attachments/assets/c75ea2d2-31fd-422a-a746-08586cf768e1" />

        * Chat Page *
  <img width="1893" height="896" alt="Screenshot 2026-04-06 210949" src="https://github.com/user-attachments/assets/a4e5b458-c775-4057-ab6d-57f43e884907" />

        * Safety Center *
   <img width="1887" height="893" alt="Screenshot 2026-04-07 103727" src="https://github.com/user-attachments/assets/a032eba3-bc5e-43d1-b634-7c77bf22b09e" />
   <img width="1920" height="1020" alt="Screenshot 2026-04-07 103623" src="https://github.com/user-attachments/assets/2e883f82-7699-4d82-90a3-43ba3c714acb" />

        * Help and Support *
  <img width="1891" height="885" alt="Screenshot 2026-04-07 103908" src="https://github.com/user-attachments/assets/c037b7d7-165a-4b59-a7bf-0df61b48a859" />
  <img width="1878" height="895" alt="Screenshot 2026-04-07 104134" src="https://github.com/user-attachments/assets/a615138a-170c-4d4e-aaad-1ae3dcf0186a" />

        * Profile *
  <img width="1884" height="882" alt="Screenshot 2026-04-07 104317" src="https://github.com/user-attachments/assets/64795c45-fe39-47aa-b084-89ad325c6c3e" />
  <img width="1891" height="885" alt="Screenshot 2026-04-07 104618" src="https://github.com/user-attachments/assets/decb5565-6557-4703-ad36-91a565894aa3" />

        * Settings *
  <img width="1886" height="892" alt="Screenshot 2026-04-07 104737" src="https://github.com/user-attachments/assets/9f11f960-b13e-4d2b-a7a3-b53cd731d8ac" />






        







  

  


