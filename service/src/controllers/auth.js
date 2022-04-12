const express = require('express');
const expressJwt = require('express-jwt'); // to authorization check
const jwt = require('jsonwebtoken'); // To generate signed token

const User = require('../models/user');
const { errorHandler } = require('../utils/dbErrorhandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  console.log('body', req.body);

  user.save((error, user) => {
    if (error) {
      console.log({ error });
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    // Do not expose hashed password
    user.password = undefined;

    res.status(200).json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find user based on email
  const { email: emailUser, password } = req.body;

  User.findOne({ email: emailUser }, async (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'User with this email does not exist',
      });
    }

    // if user is found make sure the email and password match
    // create authenticate method in User model
    if ((await user.authenticate(password)) === false) {
      return res.status(401).json({
        error: 'email and password not match',
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token in cookie with expire date (1 day)
    res.cookie('token', token, { expire: new Date() + 86400 });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;

    res.status(200).json({
      user: {
        id: _id,
        name,
        email,
        role,
      },
      token,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');

  res.status(200).json({
    message: 'Signout success',
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    res.status(403).json({
      error: 'access denied',
    });
  }

  // authorized
  next();
};

exports.isAdmin = (req, res, next) => {
  // regular user
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Access only for Admin users',
    });
  }

  next();
};
