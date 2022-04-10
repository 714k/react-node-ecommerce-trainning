const Category = require('../models/category');
const { errorHandler } = require('../utils/dbErrorhandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    if (!category) {
      return res.status(404).json({
        message: `Category ${category} does not exist`,
      });
    }

    req.category = category;

    next();
  });
};

exports.getCategoryById = (req, res) => {
  res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(500).json({
        error: errorHandler(error),
      });
    }

    res.status(200).json(categories);
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.status(200).json({ data });
  });
};

exports.updateCategoryById = (req, res) => {
  const category = req.category;

  category.name = req.body.name;

  category.save((error, data) => {
    if (error) {
      return res.status(500).json({
        error: errorHandler(error),
      });
    }

    res.status(200).json(data);
  });
};

exports.deleteCategoryById = (req, res) => {
  const category = req.category;

  category.remove((error, data) => {
    if (error) {
      return res.status(500).json({
        error: errorHandler(error),
      });
    }

    res.status(200).json({
      message: `Category '${category.name}' removed successfully`,
    });
  });
};
