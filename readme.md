# Crowd-Sourced Business Review Platform (MERN)

A full-stack **MERN application** that allows users to discover local businesses, post reviews and ratings, and ensures review authenticity through **admin moderation**.

---

## Features Implemented

### Authentication & Authorization
- User **Sign Up / Login / Logout**
- **Admin Login**
- Role-based access (User / Admin)

### Business Management
- Add a new business (sight / place)
- View all businesses
- Search businesses by **name**
- Filter businesses by:
  - Location
  - Category

### Reviews & Ratings
- Users can post **reviews and ratings**
- Reviews are **not visible immediately**
- **Admin approval required** before publishing
- Approved reviews are displayed on business cards
- Average rating is **auto-calculated** from approved reviews

### Admin Dashboard
- View all **pending reviews**
- Approve reviews with one click
- Approved reviews update business ratings dynamically

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## 📂 Project Structure
crowd-review/
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ ├── Business.js
│ │ └── Review.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── business.js
│ │ └── review.js
│ ├── middleware/
│ │ └── auth.js
│ ├── server.js
│ └── .env
│
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── App.jsx
│ └── main.jsx

## 🔗 API Endpoints & Role-Based Access

### Authentication APIs

| Method | Endpoint | Access | Description |
|------|---------|--------|------------|
| POST | `/api/auth/register` | Public | Register a new user or admin |
| POST | `/api/auth/login` | Public | Login user/admin and receive JWT token |

---

### Business APIs

| Method | Endpoint | Access | Description |
|------|---------|--------|------------|
| GET | `/api/business` | Public | Get all businesses |
| POST | `/api/business` | Admin | Add a new business |

---

### Review APIs

| Method | Endpoint | Access | Description |
|------|---------|--------|------------|
| POST | `/api/review` | User | Submit a review and rating |
| GET | `/api/review/pending` | Admin | Fetch all pending reviews |
| POST | `/api/review/approve/:id` | Admin | Approve a review using review ID |

---

**Screenshots:**

Link : https://drive.google.com/drive/folders/1rC4pUzCjLXqgqjQXlBHb2kDRUnZgmSBY?usp=sharing


## ▶️ How to Run the Project Locally

### Backend
cd backend
npm install
npx nodemon server.js

### Frontend
cd frontend
npm install
npm run dev

