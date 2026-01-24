const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["cash", "bank", "person", "other"], default: "cash" },
    isDefault: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    lastReportSentAt: { type: Date, default: null },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model("Account", accountSchema);
