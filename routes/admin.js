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
    Category.find().sort({name: 'asc', date: 'desc'}).lean().then(categories => {
        res.render('dashboard/categories', {categories: categories});
    }).catch((err) => {
        console.log('\033[0;31mError listing the categories:', err);
        req.flash('error_msg', 'Error listing the categories.');
        res.redirect('/dashboard/categories');
    });
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
        errors.forEach((error) => {
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
            res.redirect('/dashboard/categories');
        });
    }    
});

router.get('/categories/edit/:id', (req, res) => {
    Category.findOne({_id: req.params.id}).lean().then((category) => {
        res.render('dashboard/editcategory', {category: category});
    }).catch((err) => {
        console.log('\033[0;31mError finding the category:', err);
        req.flash('error_msg', 'Error finding the category.');
        res.redirect('/dashboard/categories');
    });
});

router.post('/categories/edit', (req, res) => {
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
        console.log('\033[0;31mErrors editing the category:');
        errors.forEach((error) => {
            console.log(error);
        });

        res.render('dashboard/editcategory', {errors: errors, category: req.body});
    } else {
        // editing the category
        Category.findOne({_id: req.body.id}).then((category) => {
            category.name = req.body.name;
            category.slug = req.body.slug;
            category.save().then(() => {
                console.log('\033[0;32mCategory successful edited');
                req.flash('success_msg', 'Category successful edited.');
                res.redirect('/dashboard/categories');
            }).catch((err) => {
                console.log('\033[0;31mError saving the category:', err);
                req.flash('error_msg', 'Error saving the category.');
                res.redirect('/dashboard/categories');
            });
        }).catch((err) => {
            console.log('\033[0;31mError finding the category:', err);
            req.flash('error_msg', 'Error finding the category.');
            res.redirect('/dashboard/categories');
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