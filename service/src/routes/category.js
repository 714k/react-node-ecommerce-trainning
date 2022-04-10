const express = require('express');

const {
  createCategory,
  categoryById,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const router = express.Router();

// routes
router.get('/category/:categoryId', getCategoryById);

router.get('/categories', getAllCategories);

router.post(
  '/category/create/:userId',
  requireSignin,
  isAdmin,
  isAuth,
  createCategory
);

router.put(
  '/category/update/:categoryId/:userId',
  requireSignin,
  isAdmin,
  isAuth,
  updateCategoryById
);

router.delete(
  '/category/delete/:categoryId/:userId',
  requireSignin,
  isAdmin,
  isAuth,
  deleteCategoryById
);

// middleware
router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
