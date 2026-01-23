const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

exports.createAccount = async (req, res) => {
    try {
        const { name, type, isDefault, isFeatured } = req.body;

        // If isDefault is true, unset other default accounts
        if (isDefault) {
            await Account.updateMany({ userId: req.user._id }, { isDefault: false });
        }

        const account = await Account.create({
            userId: req.user._id,
            name,
            type,
            isDefault: isDefault || false,
            isFeatured: isFeatured || false
        });

        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        let accounts = await Account.find({ userId: req.user._id });

        // If no accounts exist, create a default "Main Wallet"
        if (accounts.length === 0) {
            const defaultAccount = await Account.create({
                userId: req.user._id,
                name: "Main Wallet",
                type: "cash",
                isDefault: true
            });
            accounts = [defaultAccount];
        }

        // Calculate balances
        const transactions = await Transaction.find({ userId: req.user._id });

        const accountsWithBalance = accounts.map(account => {
            const accountTransactions = transactions.filter(t =>
                t.accountId && t.accountId.toString() === account._id.toString()
            );

            const balance = accountTransactions.reduce((acc, t) => {
                return t.type === "income" ? acc + t.amount : acc - t.amount;
            }, 0);

            return {
                ...account.toObject(),
                id: account._id,
                balance
            };
        });

        res.json(accountsWithBalance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const { name, type, isDefault, isFeatured } = req.body;

        // If isDefault is being set to true, unset other default accounts
        if (isDefault) {
            await Account.updateMany({ userId: req.user._id }, { isDefault: false });
        }

        const account = await Account.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { name, type, isDefault, isFeatured },
            { new: true }
        );

        if (!account) return res.status(404).json({ message: "Account not found" });
        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const userId = req.user._id;

        // Check if account has transactions
        const transactionCount = await Transaction.countDocuments({ accountId, userId });
        if (transactionCount > 0) {
            return res.status(400).json({
                message: `Cannot delete account. It is used in ${transactionCount} transactions.`
            });
        }

        // Don't allow deleting the last account
        const accountCount = await Account.countDocuments({ userId });
        if (accountCount <= 1) {
            return res.status(400).json({
                message: "Cannot delete the only account."
            });
        }

        const account = await Account.findOneAndDelete({ _id: accountId, userId });
        if (!account) return res.status(404).json({ message: "Account not found" });

        // If we deleted the default account, make the first available account default
        if (account.isDefault) {
            const remainingAccount = await Account.findOne({ userId });
            if (remainingAccount) {
                remainingAccount.isDefault = true;
                await remainingAccount.save();
            }
        }

        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
