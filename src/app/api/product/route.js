import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000"||"https://shop-pilot-xi.vercel.app", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}




export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  try {
    let products;
    if (category) {
      products = await Product.find({
        category: { $regex: new RegExp(`^${category}$`, 'i') }, 
      });
    } else {
      products = await Product.find();
    }

    return NextResponse.json(products, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}


export async function POST(req) {
  try {
    await connectDB();

    const {
      productName,
      brand,
      category,
      subCategory,
      productKey,
      price,
      discount,
      inStock,
      productImage,
      productDescription,
      quantity,
    } = await req.json();

    const slugify = (str) =>
      str
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .replace(/\s+/g, "-");

    const generatedProductKey = productKey || `${slugify(productName)}-${Date.now()}`;

    const actualPrice = Number(price);
    const discountPercent = Number(discount) || 0;
    const discountPrice =
      discountPercent > 0 ? actualPrice - (actualPrice * discountPercent) / 100 : actualPrice;

    const stripeProduct = await stripe.products.create({
      name: productName,
      images: productImage?.length > 0 ? [productImage[0]] : [],
      metadata: {
        category,
        subCategory: subCategory || "",
        productKey: generatedProductKey,
      },
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(discountPrice * 100),
      currency: "inr",
      product: stripeProduct.id,
    });

    const product = new Product({
      productName,
      brand,
      category,
      subCategory,
      productKey: generatedProductKey,
      price: actualPrice,
      discount: discountPercent,
      discountPrice,
      inStock,
      productImage,
      quantity,
      productDescription,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });

    await product.save();

    return NextResponse.json(product, { status: 201, headers: corsHeaders, });
  } catch (error) {
    console.error("Error in add product", error);
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 400, headers: corsHeaders, }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
