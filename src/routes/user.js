const express = require('express');
const { check, validationResult } = require("express-validator");

const { requireSignin, isAdmin, isAuth } = require('../controllers/auth')
const { findById } = require('../controllers/user')

const router = express.Router();

// routes
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  req.profile.password = undefined;
  
  res.json({
    user: req.profile
  })
})

// middleware
router.param('userId', findById);

module.exports = router;