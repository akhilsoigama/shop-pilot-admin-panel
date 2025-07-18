import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    productKey: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    discountPrice: { type: Number },
    inStock: { type: Boolean, required: true },
    productImage: {
        type: [String],
        validate: [arrayLimit, 'Exactly 5 images are required'],
        required: true
    },
    productDescription: { type: String, required: true },
}, { timestamps: true })

function arrayLimit(val) {
    return val.length === 5;
}

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);