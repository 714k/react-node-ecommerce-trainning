const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');

const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorhandler');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: 'Product not found',
      });
    }

    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    // check fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let product = new Product(fields);

    console.log('product', product);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      product.photo.contentType = files.photo.mimetype; // change type to mimetype
    }

    product.save((error, data) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }

      res.status(200).json({ product });
    });
  });
};

exports.getProductById = (req, res) => {
  req.product.photo = undefined;

  return res.status(200).json(req.product);
};

exports.getAllProducts = (req, res) => {
  const { query } = req;
  let order = query.order ? query.order : 'asc';
  let sortBy = query.sortBy ? query.sortBy : '_id';
  let limit = query.limit ? query.limit : 50;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(500).json({
          error: errorHandler(error),
        });
      }

      if (!products) {
        return res.status(404).json({
          error: 'Not found products',
        });
      }

      res.status(200).json(products);
    });
};

/**
 * It will find products based on the req product category
 * other products with same category will be returned
 */
exports.getProductsRelatedById = (req, res) => {
  const { query } = req;
  let limit = query.limit ? query.limit : 10;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .select('-photo')
    .populate('category', '_id name')
    .exec((error, products) => {
      if (error) {
        return res.status(500).json({
          error: errorHandler(error),
        });
      }

      if (!products) {
        return res.status(404).json({
          message: 'Products not founded',
        });
      }

      res.status(200).json(products);
    });
};

/**
 * Get products by category
 * @param {*} req
 * @param {*} res
 */
exports.getProductsByCategory = (req, res) => {
  Product.distinct('category', {}, (error, categories) => {
    if (error) {
      return res.status(500).json({
        error: errorHandler(error),
      });
    }

    if (!categories) {
      return res.status(404).json({
        message: 'Categories not founded',
      });
    }

    res.status(200).json(categories);
  });
};

exports.updateProductById = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      console.error(error);
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    // check fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    console.log('product updated', product);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      product.photo.contentType = files.photo.mimetype; // change type to mimetype
    }

    product.save((error, data) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }

      res
        .status(200)
        .json({ product, message: 'Product updated successfully' });
    });
  });
};

exports.deleteProductById = (req, res) => {
  let product = req.product;

  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.status(200).json({
      message: `Product deleted successfully`,
    });
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.getProductsBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? req.body.skip : 0;
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    // .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

/**
 * Returns Photo from product id to optimize the timing of requests for products
 * @param {*} req
 * @param {*} res
 */
exports.getPhotoByProductId = (req, res, next) => {
  const photo = req.product.photo;

  if (photo.data) {
    res.set('Content-Type', photo.contentType);

    return res.send(photo.data);
  }

  next();
};
