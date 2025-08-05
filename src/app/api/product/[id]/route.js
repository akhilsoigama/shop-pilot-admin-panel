import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db";
import { requirePermission } from "@/lib/requirePermission";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

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

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const error = await requirePermission("delete-product")(req);
    if (error) return error;

    const { id } = await params;

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

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const error = await requirePermission("update-product")(req);
    if (error) return error;

    const id = await params.id;
    const {
      productName,
      category,
      subCategory,
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

    if (product.stripePriceId) {
      try {
        await stripe.prices.update(product.stripePriceId, { active: false });
      } catch (err) {
        console.warn("Stripe price deactivation failed:", err.message);
      }
    }

    const newStripePrice = await stripe.prices.create({
      unit_amount: Math.round((discountPrice || price) * 100),
      currency: "inr",
      product: product.stripeProductId,
    });

    try {
      await stripe.products.update(product.stripeProductId, {
        name: productName,
        description: productDescription,
        images: productImage?.length > 0 ? [productImage[0]] : [],
        active: true,
      });
    } catch (err) {
      console.warn("Stripe product update failed:", err.message);
    }

    product.productName = productName;
    product.category = category;
    product.subCategory = subCategory;
    product.productKey = productKey;
    product.price = price;
    product.discount = discount;
    product.discountPrice = discountPrice;
    product.inStock = inStock;
    product.productImage = productImage;
    product.productDescription = productDescription;
    product.stripePriceId = newStripePrice.id;

    const updatedProduct = await product.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error in update product", error);
    return NextResponse.json(
      { message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
}


