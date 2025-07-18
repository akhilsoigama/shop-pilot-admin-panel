'use client';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FiPlus, FiImage, FiInfo, FiDollarSign, FiTag, FiKey } from 'react-icons/fi';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import RHFDropzoneField from '@/app/components/controllers/RHFImageDropZone';
import RHFContentFiled from '@/app/components/controllers/RHFContentField';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { RHFDropdown } from '@/app/components/controllers/RHFDropdown';

const productSchema = z.object({
  productName: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  productKey: z.string().min(3, 'Product key must be at least 3 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  productImage: z.array(z.string().url()).min(1, "At least one image is required"),
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

const AddProductsNewEditForm = ({ productData }) => {

  const { createProduct, updateProduct } = useProducts();
  const isEditMode = !!productData?._id;

  const { control, handleSubmit, reset, formState: { errors }, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      category: '',
      productKey: '',
      price: 0,
      productDescription: '',
      productImage: null,
      inStock: true,
      discount: 0,
    }
  });
  useEffect(() => {

    if (productData) {
      reset(productData);
    }
  }, [productData, reset]);
  // Modify your onSubmit function
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateProduct(productData._id, data);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(data);
        toast.success('Product created successfully!');

        // Enhanced reset
        reset({
          productName: '',
          category: '',
          productKey: '',
          price: 0,
          productDescription: '',
          inStock: true,
          discount: 0,
          productImage: null
        });

        if (typeof window !== 'undefined') {
          const dropzone = document.querySelector('.dropzone');
          if (dropzone) dropzone.innerHTML = '';
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} product`);
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
            <RHFDropdown
              name="category"
              label='Category'
              control={control}
              errors={errors}
              categories={categories}
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
            key={watch('productImage')}
            name="productImage"
            control={control}
            error={errors.productImage}
          />
        </section>

        <section className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">📝 Product Description</h2>
          <RHFContentFiled
            key={watch('productDescription')}
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