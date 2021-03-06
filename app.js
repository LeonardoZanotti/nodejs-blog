// Loading packages
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/auth')(passport);

// Import the database configuration
const db = require('./config/db');

// Import the routes
const routes = require('./routes/index');

// Import the modules
const loadingModule = require('./helpers/loading');

// Configurations
    // session
    app.use(session({
        secret: 'lxcAX0Yx6AdWC',     // session key (generate a random string here: https://www.random.org/strings/)
        resave: true,
        saveUninitialized: true
    }));

    // passport
    app.use(passport.initialize());
    app.use(passport.session());

    // flash
    app.use(flash());

    // moment
    moment.locale('pt-BR');

    // middleware -> all app.use are middleware actually
    app.use((req, res, next) => {
        // global variables
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;

        console.log('\033[34mMiddleware control - Access granted');
        next();     // go ahead and do all the other things of the project
    });

    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // express-handlebars
    const exphbs = handlebars.create({
        defaultLayout: 'main',
        helpers: {
            dateFormat: function(date, options) {
                const format = options.name === 'dateFormat' ? 'DD/MM/YYYY - HH:mm' : options;
                return moment(date).format(format);
            },
            ifEqual: function(arg1, arg2, options) {
                return arg1.toString() === arg2.toString() ? options.fn(this) : options.inverse(this);
            }
        }
    });
    app.engine('handlebars', exphbs.engine);
    app.set('view engine', 'handlebars');

    // mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(
        db.mongoURI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => {
            console.log('Replica active -', db.connection.replica);
            console.log('Connection name -', db.connection.name);
            console.log('Connection -', db.connection._connectionString);
            console.log('Driver info -', db.connection._connectionOptions.driverInfo);
            console.log('Host -', db.connection.host);
            console.log('Port -', db.connection.port);
            console.log('\033[0;35mLoading Mongoose models...');
            console.log('\033[0;32mLoaded -', db.models);
            console.log(db.options);
            console.log('\033[0;35mMongoose connected');
        }).catch((err) => {
            console.log('\033[0;31mMongoose error:', err);
        });
    console.log('Using ', db.mongoURI);

    // static public files
    app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', routes);

// Listen
const port = process.env.PORT || 8000;
app.listen(port, async () => {
    await loadingModule.loadDir('./');        // list the files in this directory
    console.log('\033[0;32mServer listening on port', port);
});