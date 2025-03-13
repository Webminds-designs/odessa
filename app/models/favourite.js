const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);