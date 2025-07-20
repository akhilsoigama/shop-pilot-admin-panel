import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const query = {};

        const name = searchParams.get("name");
        if (name) {
            query.productName = { $regex: name, $options: "i" };
        }

        const brand = searchParams.get("brand");
        if (brand) {
            query.brand = brand;
        }

        const category = searchParams.get("category");
        if (category) {
            query.category = category;
        }

        const subcategory = searchParams.get("subcategory");
        if (subcategory) {
            query.subCategory = subcategory;
        }
        
        const inStock = searchParams.get("inStock");
        if (inStock !== null) {
            query.inStock = inStock === "true";
        }

        const priceGt = searchParams.get("price[gt]");
        const priceLt = searchParams.get("price[lt]");
        if (priceGt || priceLt) {
            query.price = {};
            if (priceGt) query.price.$gt = parseFloat(priceGt);
            if (priceLt) query.price.$lt = parseFloat(priceLt);
        }

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        let sort = {};
        const sortParam = searchParams.get("sort");
        if (sortParam) {
            const [field, order] = sortParam.split(":");
            sort[field] = order === "desc" ? -1 : 1;
        } else {
            sort.createdAt = -1;
        }

        const products = await Product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(query);

        return NextResponse.json({
            data: products,
            page,
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error in product search API:", error);
        return NextResponse.json(
            { message: "Failed to fetch products", error: error.message },
            { status: 500 }
        );
    }
}
