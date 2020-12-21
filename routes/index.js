const express = require('express');
const router = express.Router();

const apiRoutes = require('./v1/api');
const HomeController = require('../controllers/HomeController');
const NotFoundController = require('../controllers/NotFoundController');

// Home
router.get('/', HomeController.apiHome);

// API
router.use('/api', apiRoutes);

// If route not found (404)
router.get('**', NotFoundController.api);

module.exports = router;