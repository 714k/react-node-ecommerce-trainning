const { check, validationResult } = require('express-validator');

exports.signupValidations = [
  check('firstName')
    .isLength({ min: 3 })
    .withMessage('the first name must have minimum length of 3')
    .trim(),
  check('lastName')
    .isLength({ min: 3 })
    .withMessage('the last name must have minimum length of 3')
    .trim(),

  check('email')
    .isEmail()
    .withMessage('invalid email address')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8, max: 15 })
    .withMessage('your password should have min and max length between 8-15')
    .matches(/\d/)
    .withMessage('your password should have at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('your password should have at least one special character'),
];

exports.validationsResults = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !errors.isEmpty();

  if (hasError) {
    res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
