# Expense Tracker MERN

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to track their daily expenses. It features user authentication, full CRUD functionality for expenses, and a dashboard with data visualization.

## Features

- **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens).
- **Expense Management**: Full CRUD (Create, Read, Update, Delete) functionality for expenses.
- **Interactive Dashboard**: A central dashboard to view a summary of total expenses and a list of recent transactions.
- **Data Visualization**: A responsive pie chart that provides a visual breakdown of expenses by category.
- **Modern UI**: A clean, responsive, and user-friendly interface built with React and a custom CSS design system.
- **Secure API**: A RESTful API built with Express.js, with protected routes to ensure users can only access their own data.

---

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Recharts**: A composable charting library built on React components.
- **Lucide React**: A library of simply beautiful and consistent icons.

### Backend
- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Authentication
- **bcrypt.js**: A library for hashing passwords.
- **jsonwebtoken (JWT)**: For creating access tokens for secure authentication.
- **express-validator**: For server-side data validation.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)
- **MongoDB**: You'll need a MongoDB database. You can use a local instance or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2.  **Set up the Backend:**
    ```sh
    # Navigate to the server directory
    cd server

    # Install server dependencies
    npm install

    # Create a .env file in the /server directory
    # (See the Environment Variables section below)

    # Start the backend server
    npm start 
    # The server will run on http://localhost:5000
    ```

3.  **Set up the Frontend:**
    ```sh
    # Open a new terminal and navigate to the client directory
    cd client

    # Install client dependencies
    npm install

    # Start the frontend development server
    npm run dev
    # The application will be available at http://localhost:5173 (or another port if 5173 is busy)
    ```

---

## Environment Variables

For the server to work, you need to create a `.env` file in the `/server` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

- `MONGO_URI`: Your connection string for the MongoDB database.
- `JWT_SECRET`: A long, random, and secret string used to sign the JSON Web Tokens.

---

## License

This project is licensed under the MIT License.