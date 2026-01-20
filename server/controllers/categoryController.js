const Category = require("../models/Category");
const Item = require("../models/Item");
const Transaction = require("../models/Transaction");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body, userId: req.user._id });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user?._id });
    const formattedCategories = categories.map(cat => ({
      ...cat.toObject(),
      id: cat._id
    }));
    res.json(formattedCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;

    // Check if category has transactions
    const transactionCount = await Transaction.countDocuments({ categoryId, userId });
    if (transactionCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. It is used in ${transactionCount} transactions.`
      });
    }

    const category = await Category.findOneAndDelete({ _id: categoryId, userId });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
