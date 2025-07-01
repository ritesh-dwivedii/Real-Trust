# Admin Username and Password(For Testing Purpose)
- User = Ritesh
- Password = 445566
# Real Trust Real Estate Web Application

A full-stack real estate web application featuring a modern landing page and a secure admin panel. Built with React (Vite, Material UI) for the frontend and Node.js (Express, MongoDB, JWT) for the backend.

---

## Features
- Modern, responsive landing page
- Project and client carousels (react-slick)
- Contact and newsletter forms
- Admin panel with JWT authentication
- Manage projects and clients (CRUD)
- View contact submissions and newsletter subscribers
- Material UI for consistent design
- Input validation and secure password hashing

---

## Project Structure
```
real-trust/
  frontend/   # React + Vite + Material UI (client)
  backend/    # Express + MongoDB + JWT (server)
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd real-trust
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
MONGODB_URI=mongodb://localhost:27017/realtrust
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
node app.js
```
The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173` by default.

---

## API Overview

### Public Endpoints
- `POST /api/admin/login` — Admin login
- `POST /api/admin/register` — Register first admin (subsequent registrations require authentication)
- `GET /api/projects` — List all projects
- `GET /api/clients` — List all clients
- `POST /api/contacts` — Submit a contact form
- `POST /api/subscriptions` — Subscribe to newsletter

### Protected Endpoints (require JWT in `Authorization` header)
- `POST /api/projects` — Add a project
- `DELETE /api/projects/:id` — Delete a project
- `POST /api/clients` — Add a client
- `DELETE /api/clients/:id` — Delete a client
- `GET /api/contacts` — List all contact submissions
- `GET /api/subscriptions` — List all newsletter subscribers

---

## Usage
- Visit the landing page to view projects, clients, and contact/subscribe.
- Admins can log in at `/admin/login` to manage content.

---

## License
This project is for educational/demo purposes. 
