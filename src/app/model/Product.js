import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, enum: ['text', 'number', 'dropdown'], required: true }
});

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  productKey: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  discountPrice: { type: Number },
  inStock: { type: Boolean, default: true },
  productImage: {
    type: [String],
    validate: {
      validator: arrayLimit,
      message: "Maximum 5 images are allowed",
    },
    required: true,
  },
  productDescription: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  specifications: [specificationSchema],
  stripeProductId: { type: String },
  stripePriceId: { type: String },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 5 && val.length >= 1;
}

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);