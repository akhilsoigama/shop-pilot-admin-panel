import Product from "@/app/model/Product";
import { connectDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const product = await Product.findById(id);
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.log("Error in get product by id", error);
        return NextResponse.json({ message: "Failed to get product by id" }, { status: 404 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const deleteProduct = await Product.findByIdAndDelete(id)
        return NextResponse.json(deleteProduct, { status: 200 })

    } catch (error) {
        console.log("Error in delete product", error)
        return NextResponse.json({ message: "Failed to delete product", message: error.message }, { status: 404 })
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const { productName, category, productKey, price, discount, discountPrice, inStock, productImage, productDescription } = await req.json();

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 400 })
        };

        product.productName = productName;
        product.category = category;
        product.productKey = productKey;
        product.price = price;
        product.discount = discount;
        product.discountPrice = discountPrice;
        product.inStock = inStock;
        product.productImage = productImage;
        product.productDescription = productDescription;

        const updateProduct = await product.save();
        return NextResponse.json(updateProduct, { status: 200 })

    } catch (error) {
        console.log("Error in update product", error);
        return NextResponse.json({ message: "Failed to update product", message: error.message }, { status: 404 });
    }
}