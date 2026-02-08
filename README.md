🌱 Organic Hub – Farmer-to-Customer E-Commerce Platform
Organic Hub is a full-stack e-commerce web application designed to connect Farmers, Shopkeepers, and Customers on a single digital marketplace.
The platform enables the sale of organic products directly from producers to consumers, reducing middlemen and ensuring fair pricing, transparency, and better income for farmers.

🎯 Project Purpose
The goal of Organic Hub is to digitize the organic product supply chain by enabling direct farmer-to-customer transactions.
It reduces dependency on intermediaries, improves farmers’ profit margins, and provides customers with fresh and trusted organic products using a secure, scalable, and role-based system.

🏗️ Project Architecture
The application follows a decoupled and layered architecture for scalability, security, and maintainability.

Frontend: React.js (Vite)
Backend: Spring Boot REST APIs
(Controller → Service → Repository)
Database: MySQL (Relational Database)

🛠️ Tech Stack
Frontend
Framework: React.js (Vite)
HTTP Client: Axios
Routing: React Router DOM
Styling: Bootstrap

Backend
Framework: Spring Boot 3.x
ORM: Spring Data JPA (Hibernate)
Database: MySQL
Security: Spring Security with JWT
Documentation: Swagger / OpenAPI
Object Mapping: ModelMapper

👥 User Roles & Features
👨‍🌾 Farmer
Secure registration and role-based login
Add, update, and delete organic products
Manage product stock and pricing
View listed products

🏪 Shopkeeper
Manage shop inventory
Add and update products
Handle product availability

🛒 Customer
Browse and search organic products
Place orders and make payments
Track order and payment status

👨‍💼 Admin
Activate or deactivate user accounts
Manage product categories
Monitor all orders and payments

Oversee overall system activity
🚀 Installation & Setup
1. Backend (Spring Boot)
Clone the repository:

Update MySQL credentials in
src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/organichub
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

Run the application:
mvn spring-boot:run

2. Frontend (React + Vite)
Navigate to frontend folder:
cd frontend
Install dependencies and run:
npm install
npm run dev

Access the application:
Open http://localhost:5173 in your browser.
