const express = require('express');
const router = express.Router();

// Controllers
const BlogController = require('../../controllers/BlogController');
const HomeController = require('../../controllers/HomeController');
const NotFoundController = require('../../controllers/NotFoundController');

// Home
router.get('/', HomeController.userHome);

// Posts
router.get('/posts', BlogController.posts);
router.get('/posts/:slug', BlogController.postBySlug);

// Categories
router.get('/categories', BlogController.categories);
router.get('/categories/:slug', BlogController.categoryBySlug);

// If route not find (404)
router.get('/notFound', NotFoundController.notFound);
router.get('**', NotFoundController.api);

module.exports = router;