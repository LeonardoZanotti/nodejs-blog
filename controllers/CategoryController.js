const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
const categoryValidation = require('../validations/categoryValidation');

exports.categories = (req, res) => {
    Category.find().sort({name: 'asc', date: 'desc'}).lean().then(categories => {
        res.render('dashboard/categories/categories', {categories: categories});
    }).catch((err) => {
        console.log('\033[0;31mError listing the categories:', err);
        req.flash('error_msg', 'Error listing the categories.');
        res.redirect('/dashboard/categories');
    });
}

exports.addCategoryPage = (req, res) => {
    res.render('dashboard/categories/addcategory');
}

exports.newCategory = (req, res) => {
    // Validations
    var errors = [];
    categoryValidation.validateCategory(req.body, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors creating the category:');
        errors.forEach((error) => {
            console.log(error);
        });

        res.render('dashboard/categories/addcategory', {errors: errors, category: req.body});
    } else {
        // creating the category
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug,
        }

        new Category(newCategory).save().then(() => {
            console.log('\033[0;32mCategory successful created');
            req.flash('success_msg', 'Category successful created!');
            res.redirect('/dashboard/categories');
        }).catch((err) => {
            console.log('\033[0;31mError creating the category:', err);
            req.flash('error_msg', 'Error creating the category.');
            res.redirect('/dashboard/categories');
        });
    }    
}

exports.editCategoryPage = (req, res) => {
    Category.findOne({_id: req.params.id}).lean().then((category) => {
        res.render('dashboard/categories/editcategory', {category: category});
    }).catch((err) => {
        console.log('\033[0;31mError finding the category:', err);
        req.flash('error_msg', 'Error finding the category.');
        res.redirect('/dashboard/categories');
    });
}

exports.editCategory = (req, res) => {
    // Validations
    var errors = [];
    categoryValidation.validateCategory(req.body, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors editing the category:');
        errors.forEach((error) => {
            console.log(error);
        });

        res.render('dashboard/categories/editcategory', {errors: errors, category: req.body});
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
}

exports.deleteCategory = (req, res) => {
    Category.remove({_id: req.body.id}).then(() => {
        console.log('\033[0;32mCategory successful deleted');
        req.flash('success_msg', 'Category successful deleted.');
        res.redirect('/dashboard/categories');
    }).catch((err) => {
        console.log('\033[0;31mError deleting the category:', err);
        req.flash('error_msg', 'Error deleting the category.');
        res.redirect('/dashboard/categories');
    });
}