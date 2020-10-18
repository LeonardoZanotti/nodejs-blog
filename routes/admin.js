const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
const slugModule = require('../validations/slugValidation');

// Home
router.get('/', (req, res) => {
    res.render('dashboard/index');
});


// Categories
router.get('/categories', (req, res) => {
    res.render('dashboard/categories');
});

router.get('/categories/add', (req, res) => {
    res.render('dashboard/addcategory');
});

router.post('/categories/new', (req, res) => {
    // Validations
    var errors = [];

    if (
        !req.body.name ||
        req.body.name === null ||
        typeof req.body.name === 'undefined'
    ) {
        errors.push({text: 'Invalid name!'});
    }

    if (
        !req.body.slug ||
        req.body.slug === null ||
        typeof req.body.slug === 'undefined'
    ) {
        errors.push({text: 'Invalid slug!'});
    }

    if (req.body.name.length < 3) {
        errors.push({text: 'Category name is too small!'});
    }

    if (req.body.slug.length < 3) {
        errors.push({text: 'Category slug is too small!'});
    }

    if (req.body.slug.indexOf(' ') >= 0) {
        errors.push({text: 'Slug cannot have spaces'});
    }

    slugModule.validateSlug(req.body.slug, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors creating the category:');
        errors.forEach(error => {
            console.log(error);
        });

        res.render('dashboard/addcategory', {errors: errors});
    } else {
        // creating the category
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug,
        }

        new Category(newCategory).save().then(() => {
            console.log('\033[0;32mCategory successful saved');
            req.flash('success_msg', 'Category successful created!');
            res.redirect('/dashboard/categories');
        }).catch((err) => {
            console.log('\033[0;31mError saving the category:', err);
            req.flash('error_msg', 'Error creating the category.');
            res.redirect('/dashboard');
        });
    }    
});


// If route not find
router.get('/categories/**', (req, res) => {
    res.redirect('/dashboard/categories');
});

router.get('**', (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;