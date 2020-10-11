// Loading packages
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// const mongoose = require('mongoose');

// Import the routes
const admin = require('./routes/admin');

// Configurations
    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // express-handlebars
    app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    // mongoose


    // static public files
    app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/dashboard', admin);

// Models


// Others


// Listen
const port = 8000;
app.listen(port, () => {
    console.log('Server listening on port', port);
});