const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const auction = require('./routes/auction');
const authentication = require('./routes/authentication');
const category = require('./routes/category');
const order = require('./routes/order');
const user = require('./routes/user');

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
app.use(express.static('upload/images'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// TODO: Do we even need this?
app.use(cors());

// Routes
app.use('/auctions', auction);
app.use('/authentication', authentication);
app.use('/categories', category);
app.use('/orders', order);
app.use('/users', user);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});