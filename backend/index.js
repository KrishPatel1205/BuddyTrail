
const express = require('express');
const connectDB = require('./config/db');  // Database connection
const authRoutes = require('./routes/authRoutes');  // Authentication routes
const ContactRoutes = require('./routes/ContactRoutes');  
const RatingRoutes = require('./routes/RatingRoutes');  
const SubscribeRoute = require('./routes/SubscribeRoute');  
const cookieParser = require('cookie-parser');  // Middleware for parsing cookies
const config = require('./config/config');  // Config file for environment variables
const cors = require('cors');  // Middleware for Cross-Origin Resource Sharing



// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration

const allowedOrigins = [
    'http://127.0.0.1:5505',
    'https://deploy-preview-1740--buddytrail.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true  // Allow credentials (cookies) to be sent with requests
}));


// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Enable cookie parsing

//API routes
app.use('/api/auth', authRoutes); 
app.use('/api/contact', ContactRoutes); 
app.use('/api/rating', RatingRoutes); 
app.use("/api/subscribe", SubscribeRoute )


// Server listening on configured port
const PORT = config.port || 5000; // Use config for port, default to 5000 if undefined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
