require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a db connection file

const app = express();

// Connect to Database
connectDB(); // Uncomment this if you have a database connection setup

// --- MIDDLEWARE ---
// Enable CORS for all routes. This will allow your client at localhost:3000 (or other port)
// to make requests to your server at localhost:5000.
app.use(cors());

// Init Middleware to accept JSON body
app.use(express.json({ extended: false }));

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses')); // Assuming you have expense routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));