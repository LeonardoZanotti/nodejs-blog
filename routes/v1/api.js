const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/dashboard', adminRoutes);
router.use('/auth', authRoutes);
router.use('/', userRoutes);

module.exports = router;