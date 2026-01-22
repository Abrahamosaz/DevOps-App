# Todo App

A simple full-stack todo application with React frontend, Express backend, and MongoDB database.

## Project Structure

```
app/
├── backend/          # Express.js backend server
├── frontend/         # React frontend application
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file to customize the API URL:
```bash
VITE_API_URL=http://localhost:5000/api/todos
```

If not set, it will default to `http://localhost:5000/api/todos`

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- ✅ Create new todos with title and description
- ✅ View all todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Beautiful, modern UI with gradient design
- ✅ Responsive design for mobile devices

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /health` - Health check endpoint

## MongoDB Setup

### Local MongoDB

If you have MongoDB installed locally, make sure it's running:
```bash
mongod
```

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

## Running the Application

1. Start MongoDB (if running locally)
2. Start the backend server (from `backend/` directory)
3. Start the frontend server (from `frontend/` directory)
4. Open `http://localhost:3000` in your browser

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Styling**: CSS3 with modern gradients
