const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');

const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorhandler');

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
