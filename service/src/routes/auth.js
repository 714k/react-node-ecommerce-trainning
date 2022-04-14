const express = require('express');
const { check, validationResult } = require('express-validator');

const { signup, login, signout } = require('../controllers/auth');
const {
  signupValidations,
  validationsResults,
} = require('../utils/validators');
const router = express.Router();

// routes
router.post(
  '/signup',
  signupValidations,
  (req, res, next) => validationsResults(req, res, next),
  signup
);
router.post('/login', login);
router.get('/signout', signout);

module.exports = router;
