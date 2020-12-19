const express = require('express');
const router = express.Router();

const adminRoutes = require('./v1/admin');
const userRoutes = require('./v1/user');

router.use('/dashboard', adminRoutes);
router.use('/', userRoutes);

module.exports = router;