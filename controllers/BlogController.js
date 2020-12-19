const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
require('../models/Post');
const Post = mongoose.model('posts');

exports.posts = (req, res) => {
    Post.find().populate('category').sort({name: 'asc', date: 'desc'}).lean().then((posts) => {
        res.render('user/posts/posts', {posts: posts});
    }).catch((err) => {
        console.log('\033[0;31mError listing the posts:', err);
        req.flash('error_msg', 'Error listing the posts.');
        res.redirect('/api/NotFound');
    });
}

exports.postBySlug = (req, res) => {
    Post.findOne({slug: req.params.slug}).populate('category').lean().then(post => {
        if (post) {
            res.render('user/posts/post', {post: post});
        } else {
            console.log('\033[0;31mPost not found');
            req.flash('error_msg', 'Post not found.');
            res.redirect('/api/posts');
        }
    }).catch((err) => {
        console.log('\033[0;31mError finding the post:', err);
        req.flash('error_msg', 'Error finding the post.');
        res.redirect('/api/posts');
    });
}

exports.categories = (req, res) => {
    Category.find().sort({name: 'asc', date: 'desc'}).lean().then(categories => {
        res.render('user/categories/categories', {categories: categories});
    }).catch((err) => {
        console.log('\033[0;31mError listing the categories:', err);
        req.flash('error_msg', 'Error listing the categories.');
        res.redirect('/api');
    });
}

exports.categoryBySlug = (req, res) => {
    Category.findOne({slug: req.params.slug}).lean().then(category => {
        if (category) {
            Post.find({category: category._id}).populate('category').lean().then(posts => {
                res.render('user/categories/category', {category: category, posts: posts});
            }).catch((err) => {
                console.log('\033[0;31mError listing the posts:', err);
                req.flash('error_msg', 'Error listing the posts.');
                res.redirect('/api/categories');
            });
        } else {
            console.log('\033[0;31mCategory not found', );
            req.flash('error_msg', 'Category not found.');
            res.redirect('/api/categories');
        }
    }).catch((err) => {
        console.log('\033[0;31mError finding the category:', err);
        req.flash('error_msg', 'Error finding the category.');
        res.redirect('/api/categories');
    });
}