const express = require('express');
const router = express.Router();

// Controllers
const HomeController = require('../../controllers/HomeController');
const CategoryController = require('../../controllers/CategoryController');
const PostController = require('../../controllers/PostController');
const NotFoundController = require('../../controllers/NotFoundController');

// Home
router.get('/', HomeController.adminHome);

// Categories
router.get('/categories', CategoryController.categories);
router.get('/categories/add', CategoryController.addCategoryPage);
router.post('/categories/new', CategoryController.newCategory);
router.get('/categories/edit/:id', CategoryController.editCategoryPage);
router.post('/categories/edit', CategoryController.editCategory);
router.post('/categories/delete', CategoryController.deleteCategory);

// Posts
router.get('/posts', PostController.posts);
router.get('/posts/add', PostController.addPostPage);
router.post('/posts/new', PostController.newPost);
router.get('/posts/edit/:id', PostController.editPostPage);
router.post('/posts/edit', PostController.editPost);
router.post('/posts/delete', PostController.deletePost);

// If route not find (404)
router.get('/categories/**', NotFoundController.categories);
router.get('/posts/**', NotFoundController.posts);
router.get('**', NotFoundController.dashboard);

module.exports = router;