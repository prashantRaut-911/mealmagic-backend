const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

// ROUTES
const dishRouter = require('./routes/dishRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRouter');

const app = express();


// ===============================
// CORS CONFIGURATION
// ===============================

const allowOrigins = [
    'https://8081-fefddffbfaca336401112efcbebfbcceafone.premiumproject.examly.io',
    'http://localhost:4200',
    'https://mealmagic-frontend-iqq4.vercel.app',
    'https://mealmagic-io.vercel.app'
];

app.use(cors({
    origin: allowOrigins,
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
    morgan('combined', {
        stream: logger.stream
    })
);

app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
);


// ===============================
// HEALTH CHECK
// ===============================

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Meal Magic backend is running',
        timestamp: new Date().toISOString()
    });
});


// ===============================
// API ROUTES
// ===============================

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/user', userRouter);

app.use('/api/v1/dishes', dishRouter);

app.use('/api/v1/review', reviewRouter);

app.use('/api/v1/order', orderRouter);

// Cart currently disabled
// app.use('/api/v1/cart', cartRouter);


// ===============================
// ERROR HANDLER
// ===============================

app.use(errorHandler);


module.exports = app;