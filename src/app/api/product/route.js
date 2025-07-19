import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
});

export async function GET(req) {
    try {
        await connectDB();

        const product = await Product.find();
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.log("Error in get all products", error);
        return NextResponse.json({ message: "Failed to get all product" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();

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
            quantity
        } = await req.json();
        const slugify = (str) =>
            str
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .trim()
                .replace(/\s+/g, '-');
        const generatedProductKey = productKey || `${slugify()}`;

        const stripeProduct = await stripe.products.create({
            name: productName,
            images: productImage?.length > 0 ? [productImage[0]] : [],
            metadata: {
                category,
                productKey: generatedProductKey,
            },
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: Math.round(discountPrice || price) * 100,
            currency: 'inr',
            product: stripeProduct.id,
        });

        const product = new Product({
            productName,
            category,
            productKey: generatedProductKey,
            price,
            discount,
            discountPrice,
            inStock,
            productImage,
            quantity,
            productDescription,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
        });

        await product.save();
        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.log("Error in add product", error);
        return NextResponse.json({ message: "Failed to add product", error: error.message }, { status: 400 });
    }
}
