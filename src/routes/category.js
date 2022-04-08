const express = require('express');

const { createCategory } = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { findById } = require('../controllers/user');

const router = express.Router();

// routes
router.post(
  '/category/create/:userId',
  requireSignin,
  isAdmin,
  isAuth,
  createCategory
);

// middleware
router.param('userId', findById);

module.exports = router;
