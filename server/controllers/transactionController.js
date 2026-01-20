const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, userId: req.user._id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate("categoryId")
      .populate("itemId");

    const formattedTransactions = transactions.map(t => {
      const trans = t.toObject();
      trans.id = trans._id;

      if (trans.categoryId) {
        trans.categoryId.id = trans.categoryId._id;
      }
      if (trans.itemId && trans.itemId._id) {
        trans.itemId.id = trans.itemId._id;
      }

      return trans;
    });

    res.json(formattedTransactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

