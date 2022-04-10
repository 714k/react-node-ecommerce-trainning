const User = require('../models/user');
const { errorHandler } = require('../utils/dbErrorhandler');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    req.profile = user;

    next();
  });
};

exports.getUserById = (req, res) => {
  req.profile.password = undefined;
  req.profile.salt = undefined;

  res.status(200).json(req.profile);
};

exports.updateUserById = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (error, user) => {
      if (error) {
        return res.status(500).json({
          error: 'You are not authorized to perform this action',
        });
      }

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      user.salt = undefined;
      user.password = undefined;

      res.status(200).json(user);
    }
  );
};
