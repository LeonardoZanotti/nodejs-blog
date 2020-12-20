const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/User');
const User = mongoose.model('users');

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        User.findOne({email: email}).lean().then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (success) {
                        return done(null, user);
                    } else {
                        return done(err, false, {message: 'Incorrect password!'});
                    }
                });
            } else {
                return done(null, false, {message: 'This account does not exist!'});
            }
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        } else {
            done(null, false, {message: 'User to serialize not found!'})
        }
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (user) {
                done(null, user);
            } else {
                done(err, false, {message: 'User to deserialize not found!'});
            }
        });
    });
}
