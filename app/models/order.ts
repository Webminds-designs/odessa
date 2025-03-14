import mongoose, { Schema, Document } from "mongoose";

// Define an interface for address information
export interface IAddress {
  address: string;
  city: string;
  postalCode: string;
  country?: string; // Optional for shipping if not provided
}

// Define the Order interface
export interface IOrder extends Document {
  transactionId: string;
  userid: mongoose.Types.ObjectId; // MongoDB ObjectId
  payerName: string;
  payerEmail: string;
  payerContact: string;
  payerCountry: string;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  checkoutItems: any[]; // Adjust this type based on your checkoutData structure
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
}

// Create a reusable address schema
const AddressSchema: Schema = new Schema({
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

// Define the Order schema
const OrderSchema: Schema = new Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Updated here
    payerName: { type: String, required: true },
    payerEmail: { type: String, required: true },
    payerContact: { type: String },
    payerCountry: { type: String, required: true },
    billingAddress: { type: AddressSchema },
    shippingAddress: { type: AddressSchema, required: true },
    checkoutItems: { type: Array, required: true },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
