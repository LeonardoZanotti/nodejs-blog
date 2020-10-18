// Loading packages
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

// Import the routes
const admin = require('./routes/admin');

// Import the modules
const loadingModule = require('./loading/loading');

// Configurations
    // session
    app.use(session({
        secret: 'lxcAX0Yx6AdWC',     // session key (generate a random string here: https://www.random.org/strings/)
        resave: true,
        saveUninitialized: true
    }));

    // flash
    app.use(flash());

    // middleware -> all app.use are middleware actually
    app.use((req, res, next) => {
        // global variables
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');

        console.log('\033[34mMiddleware control - Access granted');
        next();     // go ahead and do all the other things of the project
    });

    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // express-handlebars
    app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    // mongoose
    mongoose.Promise = global.Promise;
     mongoose.connect(
        'mongodb://localhost/blogapp',
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
        console.log('\033[0;35mMongoose connected');
    }).catch((err) => {
        console.log('\033[0;31mMongoose error:', err);
    });

    // static public files
    app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/dashboard', admin);

// Models


// Others


// Listen
const port = 8000;
app.listen(port, async () => {
    await loadingModule.loadDir('./');        // list the files in this directory
    console.log('\033[0;32mServer listening on port', port);
});