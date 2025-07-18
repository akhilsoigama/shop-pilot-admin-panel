import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const { image } = await req.json();

        const upload = await cloudinary.uploader.upload(image, {
            folder: "products",
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
        });

        return NextResponse.json({ url: upload.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Image upload failed", error: error.message }, { status: 500 });
    }
}
