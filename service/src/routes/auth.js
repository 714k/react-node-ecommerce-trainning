const express = require('express');
const { check, validationResult } = require('express-validator');

const { signup, signin, signout } = require('../controllers/auth');
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
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
