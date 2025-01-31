// server.js (or app.js)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/category', categoryRoutes);

const sliderRoutes = require('./routes/sliderRoutes');
app.use('/slider', sliderRoutes);

const logoRoutes = require('./routes/logoRoutes');
app.use('/logo', logoRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/contact', contactRoutes);

// Sample route to test if the API is running
app.get('/', (req, res) => {
    res.send('API is Running');
});

// Middleware for handling errors (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Define the port for the server
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
