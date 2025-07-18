'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FiPlus, FiImage, FiInfo, FiDollarSign, FiTag, FiKey } from 'react-icons/fi';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import RHFDropzoneField from '@/app/components/controllers/RHFImageDropZone';
import RHFContentFiled from '@/app/components/controllers/RHFContentField';
import { toast } from 'sonner';
import axios from 'axios';

// Zod schema for form validation
const productSchema = z.object({
  productName: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  productKey: z.string().min(3, 'Product key must be at least 3 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  productImage: z.any().refine((file) => file !== null, 'Image is required'),
  productDescription: z.string().min(10, 'Description must be at least 10 characters'),
  inStock: z.boolean().default(true),
  discount: z.coerce.number().min(0).max(100).optional(),
});

const categories = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Health & Wellness',
]

const AddProductsNewEditForm = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      category: '',
      productKey: '',
      price: 0,
      productDescription: '',
      inStock: true,
      discount: 0,
    }
  });

 const handleImageUpload = async (files) => {
    if (files.length !== 4) return toast.error('Exactly 4 images required');

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg' ,'image/webp' ];
    const tooLarge = [...files].some((file) => file.size > 5 * 1024 * 1024);

    if (tooLarge) return toast.error('Each image must be less than 5MB');
    if (![...files].every((file) => validTypes.includes(file.type)))
      return toast.error('Only JPG, JPEG, PNG, and WebP formats are allowed');

    const imageUrls = [];

    for (const file of files) {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      const base64 = await promise;
      const res = await axios.post('/api/image-upload', { image: base64 });
      imageUrls.push(res.data.url);
    }

    return imageUrls;
  };

  const onSubmit = async (data) => {
    try {
      const uploadedImages = await handleImageUpload(data.productImage);

      const productPayload = {
        productName: data.productName,
        category: data.category,
        productKey: data.productKey,
        price: data.price,
        discount: data.discount,
        productDescription: data.productDescription,
        productImage: uploadedImages,
        inStock: data.inStock,
      };

      await axios.post('/api/product', productPayload);
      toast.success('Product added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error adding product');
    }
  };

  const price = watch('price');
  const discount = watch('discount') || 0;
  const discountedPrice = price - (price * (discount / 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mt-4 mx-auto p-2 md:p-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <FiPlus className="text-blue-500" /> Add New Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the details below to list a new product in your inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* Basic Information Section */}
        <section className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FiInfo className="text-blue-500" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RHFFormField
              name="productName"
              control={control}
              label="Product Name"
              icon={<FiTag />}
              error={errors.productName}
            />
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    {...field}
                    className="p-2 rounded-md border dark:border-neutral-700 dark:bg-neutral-800 bg-white text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-sm text-red-500 mt-1">{errors.category.message}</span>
                  )}
                </div>
              )}
            />
            <RHFFormField
              name="productKey"
              control={control}
              label="Product Key"
              icon={<FiKey />}
              error={errors.productKey}
            />
            <RHFFormField
              name="price"
              control={control}
              label="Price (₹)"
              type="number"
              icon={<FiDollarSign />}
              error={errors.price}
            />
            <RHFFormField
              name="discount"
              control={control}
              label="Discount (%)"
              type="number"
              min={0}
              max={100}
              error={errors.discount}
            />
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discounted Price
              </label>
              <div className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-md">
                ₹{discountedPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                {...control.register('inStock')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                In Stock
              </label>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FiImage className="text-blue-500" /> Product Image
          </h2>
          <RHFDropzoneField
            name="productImage"
            control={control}
            error={errors.productImage}
          />
        </section>

        <section className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">📝 Product Description</h2>
          <RHFContentFiled
            name="productDescription"
            control={control}
            error={errors.productDescription}
          />
        </section>

        <div className="flex justify-end gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 rounded-md font-medium shadow-sm"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md font-medium shadow-sm flex items-center gap-2"
          >
            <FiPlus /> Add Product
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProductsNewEditForm;