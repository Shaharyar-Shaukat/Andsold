const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');

const passport = require("./controllers/passport")
const authentication = require("./routes/authentication")

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// Database Connection

// db
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
app.use(session({
    secret: "group37",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true
}));
app.use(expressValidator());

app.use(morgan('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes Middleware
app.use('/authentication',authentication);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});