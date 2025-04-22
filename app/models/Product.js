const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    // Optional: If you want to use a custom ID (e.g., "10") from your data.
    // Otherwise, MongoDB provides its own _id.
    id: { type: String, required: true, unique: true },

    name: { type: String, required: true },
    price: { type: String, required: true },
    cut: { type: String, required: true },
    shape: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    diamondCutDesign: { type: String, required: true },
    carat: { type: Number, required: true },
    measurements: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
