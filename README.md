# 🌱 Organic Hub – Farmer-to-Customer E-Commerce Platform

**Organic Hub** is a full-stack e-commerce web application designed to connect Farmers, Shopkeepers, and Customers on a single digital marketplace. It streamlines the organic product supply chain, ensuring fair pricing and transparency.

---

## 🎯 Project Purpose
* **Direct Trade:** Eliminates middlemen to increase farmer profit margins.
* **Freshness:** Provides customers with direct access to fresh organic produce.
* **Transparency:** Secure, role-based system for tracking orders and payments.

---

## 🏗️ Project Architecture
The application follows a decoupled and layered architecture:
* **Frontend:** React.js (Vite)
* **Backend:** Spring Boot REST APIs (Controller → Service → Repository)
* **Database:** MySQL (Relational Database)

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Styling:** Bootstrap 5

### **Backend**
- **Framework:** Spring Boot 3.x
- **ORM:** Spring Data JPA (Hibernate)
- **Security:** Spring Security with JWT (JSON Web Tokens)
- **Documentation:** Swagger / OpenAPI
- **Object Mapping:** ModelMapper

---

## 👥 User Roles & Features

### 👨‍🌾 Farmer
- Role-based registration and secure login.
- **Product Management:** Add, update, and delete organic products.
- **Inventory:** Real-time stock and pricing management.

### 🏪 Shopkeeper
- Manage shop inventory.
- Update product availability and shop details.

### 🛒 Customer
- Browse/Search organic products.
- Place orders and process secure payments.
- Track order history and payment status.

### 👨‍💼 Admin
- **User Control:** Activate/Deactivate user accounts.
- **Category Management:** Create and manage product categories.
- **Monitoring:** Oversee all transactions and system activities.

---

## 📂 Database Schema (Key Entities)
- **User:** Stores credentials and roles (Farmer, Customer, Admin).
- **Product:** Details about organic items, price, and stock.
- **Category:** Classification of products (e.g., Vegetables, Fruits, Grains).
- **Order:** Records customer purchases and delivery status.
- **Payment:** Tracks transaction success/failure.

---


## 🚀 Installation & Setup

### **1. Backend (Spring Boot)**
1. **Clone the repository:**
2. Configure MySQL: Update src/main/resources/application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/organichub
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

3.  *Run the application:*
    bash
    mvn spring-boot:run
    

### *2. Frontend (React + Vite)*
1.  *Navigate to frontend folder:*
    bash
    cd frontend
    npm install
    npm run dev
    
2.  *Access the app:* Open http://localhost:5173 in your browser.
