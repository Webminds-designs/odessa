const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Favourite", FavouriteSchema);