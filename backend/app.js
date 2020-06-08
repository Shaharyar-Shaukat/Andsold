const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// Import Routes
const authenticationRoutes = require('./routes/authentication');

// app
const app = express();
const port = process.env.PORT || 8000;

// Database Connection

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));
    

// Routes Middleware
app.use('/api/authentication',authenticationRoutes);

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});