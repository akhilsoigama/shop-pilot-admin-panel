import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db";
import { requirePermission } from "@/lib/requirePermission";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" });

function getCorsHeaders(origin) {
  const allowedOrigins = ["http://localhost:3000", "https://shop-pilot-xi.vercel.app"];
  return {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function GET(req) {
  await connectDB();
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const specification = searchParams.get("specification");

  const filter = {};
  if (category) filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  if (subcategory) filter.subCategory = { $regex: new RegExp(`^${subcategory}$`, "i") };
  if (specification) {
    const [name, value] = specification.split(':');
    filter['specifications'] = { $elemMatch: { name, value } };
  }

  try {
    const products = await Product.find(filter);
    return NextResponse.json(products, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    await connectDB();
    const error = await requirePermission("create-product")(req);
    if (error) return error;

    const body = await req.json();

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
      specifications = [],
      variants = []
    } = body;

    const slugify = (str) =>
      str.toLowerCase().replace(/[^\w\s]/gi, "").trim().replace(/\s+/g, "-");

    const generatedProductKey = productKey || `${slugify(productName)}-${Date.now()}`;

    const actualPrice = Number(price);
    const discountPercent = Number(discount) || 0;
    const discountPrice =
      discountPercent > 0 ? actualPrice - (actualPrice * discountPercent) / 100 : actualPrice;

    // Create Stripe product
    const stripeMetadata = {
      category,
      subCategory: subCategory || "",
      productKey: generatedProductKey,
      ...specifications.reduce((acc, spec) => {
        acc[`spec_${spec.name}`] = spec.value;
        return acc;
      }, {})
    };

    const stripeProduct = await stripe.products.create({
      name: productName,
      images: productImage?.length > 0 ? [productImage[0]] : [],
      metadata: stripeMetadata,
    });

    // Process variants with stock information
    const variantsWithStripe = await Promise.all(
      (variants || []).map(async (v) => {
        const vPrice = Number(v.price) || discountPrice || actualPrice;
        const newPrice = await stripe.prices.create({
          unit_amount: Math.round((vPrice || actualPrice) * 100),
          currency: "inr",
          product: stripeProduct.id,
        });
        return {
          ...v,
          discountPrice: v.discount
            ? vPrice - (vPrice * Number(v.discount || 0)) / 100
            : vPrice,
          stripePriceId: newPrice.id,
          inStock: (v.availableStock || 0) > 0
        };
      })
    );

    let topStripePriceId = null;
    if (!variants || variants.length === 0) {
      const topPrice = await stripe.prices.create({
        unit_amount: Math.round(discountPrice * 100),
        currency: "inr",
        product: stripeProduct.id,
      });
      topStripePriceId = topPrice.id;
    }

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
      specifications,
      variants: variantsWithStripe,
      stripeProductId: stripeProduct.id,
      stripePriceId: topStripePriceId,
    });

    await product.save();
    return NextResponse.json(product, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error in add product", error);
    return NextResponse.json({ message: "Failed to add product", error: error.message }, { status: 400, headers: corsHeaders });
  }
}