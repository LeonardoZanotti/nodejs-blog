const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const userValidation = require('../validations/userValidation');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.registerPage = (req, res) => {
    res.render('user/auth/register');
}

exports.register = (req, res) => {
    // Validations
    var errors = [];
    userValidation.validateUser(req.body, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors registering the user:');
        errors.forEach((error) => {
            console.log(error);
        });

        res.render('user/auth/register', {errors: errors, user: req.body});
    } else {
        User.findOne({email: req.body.email}).lean().then((user) => {
            if (user) {
                console.log('\033[0;31mThis email is already in use!');
                req.flash('error_msg', 'This email is already in use.');
                res.redirect('/api/auth/register');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log('\033[0;31mError generating the password salt:', err);
                        req.flash('error_msg', 'Error generating the password salt.');
                        res.redirect('/api/auth/register');
                    } else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                console.log('\033[0;31mError hashing the password:', err);
                                req.flash('error_msg', 'Error hashing the password.');
                                res.redirect('/api/auth/register');
                            } else {
                                newUser.password = hash;
                                newUser.save().then(() => {
                                    req.flash('success_msg', 'User successfull created.');
                                    res.redirect('/api/posts');
                                }).catch((err) => {
                                    console.log('\033[0;31mError saving the user:', err);
                                    req.flash('error_msg', 'Error saving the user.');
                                    res.redirect('/api/auth/register');
                                });
                            }
                        });
                    }
                });
            }
        }).catch((err) => {
            console.log('\033[0;31mError registering the user:', err);
            req.flash('error_msg', 'Error registering the user.');
            res.redirect('/api/auth/register');
        });
    }
}

exports.loginPage = (req, res) => {
    res.render('user/auth/login');
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/posts',
        failureRedirect: '/api/auth/login',
        failureFlash: true
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'User successfull logout.');
    res.redirect('/api/posts');
}