# Minimal Library Management System
Boi Dokan is a clean, functional, and responsive **Library Management System** built with **React + TypeScript**, **Redux Toolkit Query**, **Node.js**, and **MongoDB**. The system allows users to manage books and borrowing activities with full CRUD support—all without login or authentication.

##  Live Demo
- **Frontend**: [View Frontend](https://your-frontend-link.com)  
- **Backend API**: [View Server](https://library-management-api-fawn.vercel.app/)

## API Endpoints
### Books
- `GET /api/books`
- `POST /api/books`
- `PATCH /api/books/:id`
- `DELETE /api/books/:id`

### Borrows
- `POST /api/borrow`
- `GET /api/borrow-summary`


### Book Management
- **List View**: View all books in a responsive table layout.
- **Add Book**: Create a new book with all necessary fields.
- **Edit Book**: Update book details inline via form.
- **Delete Book**: Remove a book with confirmation.
- **Borrow Book**: Borrow books with quantity and due date.

### Borrow Summary
- View an aggregated summary of borrowed books.
- Shows book title, ISBN, and total borrowed count.

## Tech Stack

- **Frontend**: React + TypeScript
- **State Management**: Redux Toolkit + RTK Query 
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose


## Environment Variables
### Frontend
VITE_MAIN_SERVER_URI=

### Backend
MONGODB_URI=


## Installation
### Backend + Frontend
```bash
cd library-management-api
npm install
npm run dev


cd library-management-frontend
npm install
npm run dev


