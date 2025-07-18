import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db"
import { NextResponse } from "next/server";

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
        const { productName, category, productKey, price, discount, discountPrice, inStock, productImage, productDescription } = await req.json();

        const product = new Product({
            productName,
            category,
            productKey,
            price,
            discount,
            discountPrice,
            inStock,
            productImage,
            productDescription
        });

        await product.save();
        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.log("Error in add product", error);
        return NextResponse.json({ message: "Failed to add product", error: error.message }, { status: 400 });
    }
}