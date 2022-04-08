const Product = require('../models/product');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    req.profile = product;
    next();
  });
};
