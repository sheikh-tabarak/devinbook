const Item = require("../models/Item");
const Transaction = require("../models/Transaction");

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, userId: req.user._id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id });
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      id: item._id
    }));
    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user._id;

    console.log(`🗑️ Attempting to delete item: ${itemId} for user: ${userId}`);

    // Check if item is used in any transactions
    const transactionCount = await Transaction.countDocuments({ itemId, userId });
    if (transactionCount > 0) {
      console.log(`❌ Item in use: ${itemId} has ${transactionCount} transactions`);
      return res.status(400).json({
        message: `Cannot delete item. It is being used in ${transactionCount} transactions.`
      });
    }

    const item = await Item.findOneAndDelete({ _id: itemId, userId });
    if (!item) {
      console.log(`❌ Item not found: ${itemId}`);
      return res.status(404).json({ message: "Item not found" });
    }

    console.log(`✅ Item deleted: ${itemId}`);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(`Error deleting item:`, err);
    res.status(500).json({ message: err.message });
  }
};
