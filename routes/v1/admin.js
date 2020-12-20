const express = require('express');
const router = express.Router();

// Controllers
const CategoryController = require('../../controllers/CategoryController');
const HomeController = require('../../controllers/HomeController');
const NotFoundController = require('../../controllers/NotFoundController');
const PostController = require('../../controllers/PostController');

// Authentication
const { isAdmin } = require('../../helpers/isAdmin');

// Home
router.get('/', isAdmin, HomeController.adminHome);

// Categories
router.get('/categories', isAdmin, CategoryController.categories);
router.get('/categories/add', isAdmin, CategoryController.addCategoryPage);
router.post('/categories/new', isAdmin, CategoryController.newCategory);
router.get('/categories/edit/:id', isAdmin, CategoryController.editCategoryPage);
router.post('/categories/edit', isAdmin, CategoryController.editCategory);
router.post('/categories/delete', isAdmin, CategoryController.deleteCategory);

// Posts
router.get('/posts', isAdmin, PostController.posts);
router.get('/posts/add', isAdmin, PostController.addPostPage);
router.post('/posts/new', isAdmin, PostController.newPost);
router.get('/posts/edit/:id', isAdmin, PostController.editPostPage);
router.post('/posts/edit', isAdmin, PostController.editPost);
router.post('/posts/delete', isAdmin, PostController.deletePost);

// If route not find (404)
router.get('/categories/**',isAdmin, NotFoundController.categories);
router.get('/posts/**', isAdmin, NotFoundController.posts);
router.get('**', isAdmin, NotFoundController.dashboard);

module.exports = router;