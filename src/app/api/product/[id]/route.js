import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

// GET product by ID
export async function GET(req, context) {
  try {
    await connectDB();
    const id = context.params.id;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error in GET /product/[id]", error);
    return NextResponse.json({ message: "Failed to get product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req, context) {
  try {
    await connectDB();
    const id = context.params.id;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.stripeProductId) {
      try {
        await stripe.products.update(product.stripeProductId, { active: false });
      } catch (err) {
        console.warn("Stripe deactivation failed:", err.message);
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /product/[id]", error);
    return NextResponse.json({ message: "Failed to delete", error: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();
    const id = context.params.id;

    const {
      productName,
      category,
      productKey,
      price,
      discount,
      discountPrice,
      inStock,
      productImage,
      productDescription,
    } = await req.json();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Handle missing Stripe product
    if (!product.stripeProductId) {
      const stripeProduct = await stripe.products.create({
        name: productName,
        description: productDescription,
        images: Array.isArray(productImage) ? productImage : [productImage],
        metadata: {
          category,
          productKey,
        },
      });
      product.stripeProductId = stripeProduct.id;
    } else {
      // Update Stripe product
      try {
        await stripe.products.update(product.stripeProductId, {
          name: productName,
          description: productDescription,
          images: Array.isArray(productImage) ? productImage : [productImage],
          active: true,
        });
      } catch (err) {
        console.warn("Stripe product update failed:", err.message);
      }
    }

    // Deactivate old Stripe price
    if (product.stripePriceId) {
      try {
        await stripe.prices.update(product.stripePriceId, { active: false });
      } catch (err) {
        console.warn("Stripe price deactivate failed:", err.message);
      }
    }

    // ✅ Create new Stripe price with valid product ID
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round((discountPrice || price) * 100),
      currency: "inr",
      product: product.stripeProductId, // ✅ Now definitely defined
    });

    // Update local DB
    product.productName = productName;
    product.category = category;
    product.productKey = productKey;
    product.price = price;
    product.discount = discount;
    product.discountPrice = discountPrice;
    product.inStock = inStock;
    product.productImage = productImage;
    product.productDescription = productDescription;
    product.stripePriceId = stripePrice.id;

    const updated = await product.save();

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /product/[id]", error);
    return NextResponse.json(
      { message: "Failed to update", error: error.message },
      { status: 500 }
    );
  }
}
