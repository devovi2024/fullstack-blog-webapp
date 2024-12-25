const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');

dotenv.config();  // Load environment variables from .env file

// Connect to the database
connectDB();

// Initialize express application
const app = express();

// Middleware for parsing incoming JSON data
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Set the allowed frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Use the routes
app.use('/api/auth', userRoutes);  // Authentication routes
app.use('/api/posts', postRoutes); // Post-related routes

// Use error handling middleware for centralized error handling
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
