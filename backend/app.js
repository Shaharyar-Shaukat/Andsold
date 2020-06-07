const express = require('express');
const mongoose = require('mongoose');
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});