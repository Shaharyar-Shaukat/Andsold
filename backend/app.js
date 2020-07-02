const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const authentication = require("./routes/authentication")

// App
const app = express();
const port = process.env.PORT || 8000;

// DB
mongoose
    .connect(
        process.env.DATABASE,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(expressValidator());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/authentication',authentication);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});