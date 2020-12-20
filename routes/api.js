const express = require('express');
const router = express.Router();

const adminRoutes = require('./v1/admin');
const authRoutes = require('./v1/auth');
const userRoutes = require('./v1/user');

router.use('/dashboard', adminRoutes);
router.use('/auth', authRoutes);
router.use('/', userRoutes);

module.exports = router;