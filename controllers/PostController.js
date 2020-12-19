const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
require('../models/Post');
const Post = mongoose.model('posts');
const postValidation = require('../validations/postValidation');

exports.posts = (req, res) => {
    Post.find().populate('category').sort({name: 'asc', date: 'desc'}).lean().then((posts) => {
        res.render('dashboard/posts/posts', {posts: posts});
    }).catch((err) => {
        console.log('\033[0;31mError listing the posts:', err);
        req.flash('error_msg', 'Error listing the posts.');
        res.redirect('/dashboard');
    });
}

exports.addPostPage = (req, res) => {
    Category.find().sort({name: 'asc', date: 'desc'}).lean().then((categories) => {
        res.render('dashboard/posts/addpost', {categories: categories});
    }).catch((err) => {
        console.log('\033[0;31mError listing the categories:', err);
        req.flash('error_msg', 'Error listing the categories.');
        res.redirect('/dashboard/posts/posts');
    });
}

exports.newPost = (req, res) => {
    var errors = [];
    postValidation.validatePost(req.body, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors editing the post:');
        errors.forEach((error) => {
            console.log(error);
        });

        Category.find().sort({name: 'asc', date: 'desc'}).lean().then((categories) => {
            res.render('dashboard/posts/addpost', {errors: errors, post: req.body, categories: categories});
        }).catch((err) => {
            console.log('\033[0;31mError listing the categories:', err);
            req.flash('error_msg', 'Error listing the categories.');
            res.redirect('/dashboard/posts/posts');
        });
    } else {
        // creating the post
        const newPost = {
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content
        }

        new Post(newPost).save().then(() => {
            console.log('\033[0;32mPost successful created');
            req.flash('success_msg', 'Post successful created!');
            res.redirect('/dashboard/posts/posts');
        }).catch((err) => {
            console.log('\033[0;31mError saving the post:', err);
            req.flash('error_msg', 'Error creating the post.');
            res.redirect('/dashboard/posts/posts');
        });
    }
}

exports.editPostPage = (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then((post) => {
        Category.find().sort({name: 'asc', date: 'desc'}).lean().then((categories) => {
            res.render('dashboard/posts/editpost', {post: post, categories: categories});
        }).catch((err) => {
            console.log('\033[0;31mError listing the categories:', err);
            req.flash('error_msg', 'Error listing the categories.');
            res.redirect('/dashboard/posts/posts');
        });
    }).catch((err) => {
        console.log('\033[0;31mError finding the post:', err);
        req.flash('error_msg', 'Error finding the post.');
        res.redirect('/dashboard/posts/posts');
    });
}

exports.editPost = (req, res) => {
    var errors = [];
    postValidation.validatePost(req.body, errors);

    if (errors.length > 0) {
        console.log('\033[0;31mErrors creating the post:');
        errors.forEach((error) => {
            console.log(error);
        });

        Category.find().sort({name: 'asc', date: 'desc'}).lean().then((categories) => {
            res.render('dashboard/posts/editpost', {errors: errors, post: req.body, categories: categories});
        }).catch((err) => {
            console.log('\033[0;31mError listing the categories:', err);
            req.flash('error_msg', 'Error listing the categories.');
            res.redirect('/dashboard/posts/posts');
        });
    } else {
        // updating the post
        Post.findOne({_id: req.body.id}).then((post) => {
            post.title = req.body.title,
            post.slug = req.body.slug,
            post.description = req.body.description,
            post.category = req.body.category,
            post.content = req.body.content
            post.save().then(() => {
                console.log('\033[0;32mPost successful edited');
                req.flash('success_msg', 'Post successful edited.');
                res.redirect('/dashboard/posts/posts');
            }).catch((err) => {
                console.log('\033[0;31mError saving the post:', err);
                req.flash('error_msg', 'Error saving the post.');
                res.redirect('/dashboard/posts/posts');
            });
        }).catch((err) => {
            console.log('\033[0;31mError finding the post:', err);
            req.flash('error_msg', 'Error finding the post.');
            res.redirect('/dashboard/posts/posts');
        });
    }    
}

exports.deletePost = (req, res) => {}