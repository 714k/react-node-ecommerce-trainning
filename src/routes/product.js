const express = require('express');

const { createProduct } = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { findById, productById } = require('../controllers/user');

const router = express.Router();

// routes
router.post(
  '/product/create/:userId',
  requireSignin,
  isAdmin,
  isAuth,
  createProduct
);

// middleware
router.param('userId', findById);
router.param('productId', productById);

module.exports = router;
