import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const { image } = await req.json();

        const uploadImage = await cloudinary.uploader.upload(image, { folder: 'products' })
        return NextResponse.json({ url: uploadImage.secure_url }, { status: 200 });
    } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json({ message: "Image upload failed", error: error.message }, { status: 500 });
    }
}
