const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('../../controllers/AuthController');
const HomeController = require('../../controllers/HomeController');
const NotFoundController = require('../../controllers/NotFoundController');

// Home
router.get('/', HomeController.authHome);

// Authentication
router.get('/register', AuthController.registerPage);
router.post('/register', AuthController.register);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);

// Logout
router.get('/logout', AuthController.logout);

// If route not find (404)
router.get('**', NotFoundController.auth);

module.exports = router;