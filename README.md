# Bike Management Club

## 📌 About the Project  
Bike Management Club is a **web-based management system** designed for a cycling club.  
The system enables the management of **members, events, and event types**, ensuring **data persistence, user interaction, and seamless CRUD operations**.

---

## 🛠 Technologies Used  
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js (Express.js)  
- **Database**: MySQL  
- **REST API**: JSON serialization for data exchange  

---

## 📂 Features  

### **1️⃣ Event Type Management**  
✔ List available event types  
✔ Create new event types  
✔ Edit existing event types  
✔ Delete event types (if not linked to events or members)  

### **2️⃣ Event Management**  
✔ List existing events  
✔ Create new events (linked to event types)  
✔ Edit event details  
✔ Delete events (if no members are registered)  

### **3️⃣ Member Management**  
✔ List club members  
✔ Register new members  
✔ Update member details  
✔ Remove members  
✔ Manage member event registrations  
   - ✅ Register for an event (validations included: future events only, no duplicate registrations, event type preference enforced)  
   - ❌ Unregister from an event  

---

## 🎨 User Interface  

### **Event Types**  
![image](https://github.com/user-attachments/assets/18b58ad3-b50f-4b2d-a420-72e57830e83e)


### **Events**  
![image](https://github.com/user-attachments/assets/3e28bfb5-4857-4971-a3fd-4178de30d352)


### **Members**  
![image](https://github.com/user-attachments/assets/7b415c74-9c90-42a3-a8e1-82d73b7ae741)


---

## 🔄 Data Persistence & API Integration  
- **MySQL Database**: Stores all members, events, and event types.  
- **Node.js REST API**: Handles all CRUD operations with secure and optimized database interactions.  
- **Asynchronous Data Fetching**: Ensures real-time updates using **fetch API**.  

---

## 🚀 Future Improvements  
- Implement **user authentication & role-based access control**.  
- Improve **error handling and validation messages**.  
- Add **event analytics and reports**.  

 
