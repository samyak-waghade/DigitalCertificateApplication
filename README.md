# 🏛️ Digital Certificate Generator  
A full-stack Government E-Certificate Generator system built with **ReactJS**, **ASP.NET Core 8 Web API**, and **SQL Server**, enabling citizens to apply for certificates online and allowing government officers & supervisors to review, approve, reject, and manage requests digitally.

---

## 🚀 Features

### 👤 **User (Citizen)**
- Register & Login using JWT Authentication  
- Apply for certificates (Domicile, Caste, Income, etc.)
- Upload supporting documents  
- Track application status  
- Receive notifications (Email / In-App)

### 🧑‍✒️ **Officer**
- View assigned applications  
- Verify details & uploaded documents  
- Approve/Reject certificates  
- Add comments or request corrections  
- Generate certificate PDFs

### 🧑‍💼 **Supervisor**
- View all applications  
- Assign applications to specific officers  
- Monitor workflow progress  
- Communicate with users & officers

---

## 🧱 **Tech Stack**

### **Frontend**
- ReactJS (JavaScript – `.jsx`)
- Axios for API calls  
- React Router  
- Tailwind / Bootstrap (optional)
- JWT handling & Protected Routes  

### **Backend (API)**
- ASP.NET Core 8 Web API  
- Entity Framework Core  
- Repository + Service Pattern  
- SQL Server  
- JWT Authentication  
- AutoMapper  
- Serilog

### **Database**
- SQL Server  
- Tables: `Users`, `Certificates`, `Applications`, `Roles`, `Grievances`, etc.

---

## 🗂️ **Project Structure**

### **Frontend**
/frontend
├── /src
│ ├── components/
│ ├── pages/
│ ├── services/api.js
│ ├── context/AuthContext.jsx
│ ├── App.jsx
│ └── index.jsx
└── package.json


### **Backend**
/backend
├── Controllers/
├── Services/
├── Repositories/
├── Models/
├── DTOs/
├── Mappings/
├── Data/ApplicationDbContext.cs
└── Program.cs


---

## 🔗 **Flow (Frontend → Backend → DB)**

### Login Flow
Login.jsx → /api/auth/login → AuthController → AuthService → UserRepository → DB


### User Applies for Certificate
ApplyCertificate.jsx → /api/certificates/apply
→ CertificateController → CertificateService → ApplicationRepository → DB


### Officer Approval
OfficerDashboard.jsx → /api/certificates/pending
→ CertificateController → OfficerService → ApplicationRepository → DB
