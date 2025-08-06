'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import UpdateIcon from '@mui/icons-material/Update';
import { IoReloadOutline } from "react-icons/io5";
import { FiPlus, FiImage, FiInfo, FiDollarSign, FiTag, FiKey } from 'react-icons/fi';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import RHFDropzoneField from '@/app/components/controllers/RHFImageDropZone';
import RHFContentFiled from '@/app/components/controllers/RHFContentField';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { RHFDropdown } from '@/app/components/controllers/RHFDropdown';
import { useRouter } from 'next/navigation';
import RHFCheckboxField from '@/app/components/controllers/RHFCheckboxField';
import { categories, getFieldsForSubcategory, Subcategories } from '@/lib/category';

const productSchema = z.object({
  productName: z.string().min(3, 'Name must be at least 3 characters'),
  brand: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Category is required'),
  productKey: z.string().min(3, 'Product key must be at least 3 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  productImage: z.array(z.string().url()).min(1, "At least one image is required"),
  productDescription: z.string().min(10, 'Description must be at least 10 characters'),
  inStock: z.boolean().default(true),
  discountPrice: z.coerce.number().default(0),
  discount: z.coerce.number().min(0).max(100).optional(),
  quantity: z.number().default(1),
}).passthrough();

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-');

export const AddProductsNewEditForm = ({ productData }) => {
  const { createProduct, updateProduct } = useProducts();
  const isEditMode = !!productData?._id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const initializingRef = useRef(true);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      brand: '',
      category: '',
      subCategory: '',
      productKey: '',
      price: 0,
      productDescription: '',
      productImage: null,
      inStock: true,
      discount: 0,
      discountPrice: 0,
      quantity: 1,
      extraFields: {},
    },
  });

  const productName = watch('productName');
  const price = watch('price');
  const discount = watch('discount');
  const selectedCategory = watch('category');
  const selectedSubcategory = watch('subCategory');
  // const extraFields = getFieldsForSubcategory(selectedCategory, selectedSubcategory);

  const extraFields = useMemo(() => {
    return getFieldsForSubcategory(selectedCategory, selectedSubcategory);
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    if (productData) {
      const specifications = productData.specifications || [];

      const extraFieldValues = specifications.reduce((acc, spec) => {
        acc[spec.name] = spec.value;
        return acc;
      }, {});

      reset({
        ...productData,
        extraFields: extraFieldValues,
      });

      setValue('category', productData.category);
      setValue('subCategory', productData.subCategory);

      if (productData.category) {
        const found = Subcategories.find(item => item.name === productData.category);
        const subs = found ? found.subcategories : [];
        setFilteredSubcategories(subs);

        const subcategoryMatch = subs.find(
          sub => (typeof sub === 'string' ? sub : sub.name) === productData.subCategory
        );

        if (subcategoryMatch) {
          setTimeout(() => {
            setValue('subCategory', productData.subCategory);
          }, 0);
        }
      }
    }

    const timer = setTimeout(() => {
      initializingRef.current = false;
    }, 0);

    return () => clearTimeout(timer);
  }, [productData, reset, setValue]);

  useEffect(() => {
    const discountValue = price * (discount / 100);
    const calculatedPrice = price - discountValue;
    setValue('discountPrice', parseFloat(calculatedPrice.toFixed(2)));
  }, [price, discount, setValue]);

  // Handle initial data setup for edit mode
  useEffect(() => {
    if (productData) {
      if (productData.category) {
        const found = Subcategories.find(item => item.name === productData.category);
        const subs = found ? found.subcategories : [];
        setFilteredSubcategories(subs);

        if (productData.subCategory && subs.includes(productData.subCategory)) {
          setValue('subCategory', productData.subCategory);
        }
      }
    }

    // Mark initialization complete after all effects
    const timer = setTimeout(() => {
      initializingRef.current = false;
    }, 0);

    return () => clearTimeout(timer);
  }, [productData, reset, setValue]);

  // Handle category changes (only after initialization)
  useEffect(() => {
    if (selectedCategory && !initializingRef.current) {
      const found = Subcategories.find(item => item.name === selectedCategory);
      setFilteredSubcategories(found ? found.subcategories : []);
      setValue('subCategory', ''); // Only reset when not initializing
    }
  }, [selectedCategory, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // 1. Extract values from extraFields and transform to `specifications`
      const specifications = extraFields.map(field => ({
        name: field.name,
        value: data?.extraFields?.[field.name] || '',
        type: field.type,
      }));

      const finalData = {
        ...data,
        specifications,
      };

      //  Create or update the product
      if (isEditMode) {
        await updateProduct(productData._id, finalData);
        toast.success('Product updated successfully!');
        router.push('/dashboard/product');
      } else {
        await createProduct(finalData);
        toast.success('Product created successfully!');
        reset({
          productName: '',
          brand: '',
          category: '',
          subCategory: '',
          productKey: '',
          price: 0,
          productDescription: '',
          inStock: true,
          discount: 0,
          discountPrice: 0,
          quantity: 0,
          productImage: null,
          extraFields: {},
        });

        if (typeof window !== 'undefined') {
          const dropzone = document.querySelector('.dropzone');
          if (dropzone) dropzone.innerHTML = '';
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} product`
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = () => {
    router.push('/dashboard/product');
  };

  const SectionTitle = ({ icon, title }) => (
    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
      {icon} {title}
    </h2>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-6xl w-full mx-auto mt-6 p-4 md:p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-lg"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          {isEditMode ? <UpdateIcon className="text-blue-500" /> : <FiPlus className="text-blue-500" />}
          {isEditMode ? 'Update Product' : 'Add New Product'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
          Fill in the details below to {isEditMode ? 'update your product' : 'add a new product to your inventory'}.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        {/* Basic Info */}
        <section className="form-section">
          <SectionTitle icon={<FiInfo />} title="Basic Information" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RHFFormField
              name="productName"
              control={control}
              label="Product Name"
              icon={<FiTag />}
              error={errors.productName}
            />
            <RHFFormField
              name="brand"
              control={control}
              label="Brand"
              error={errors.brand}
            />
            <RHFDropdown
              name="category"
              label="Category"
              control={control}
              errors={errors}
              categories={categories}
            />
            <RHFDropdown
              name="subCategory"
              label="SubCategory"
              control={control}
              errors={errors}
              categories={filteredSubcategories.map(sub => typeof sub === 'string' ? sub : sub.name)}
            />
            <RHFFormField
              name="productKey"
              control={control}
              label="Product Key"
              icon={<FiKey />}
              error={errors.productKey}
              isDisabled
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
            <RHFFormField
              name="quantity"
              control={control} label="Quantity"
              type="number"
              isDisabled
              error={errors.quantity}
            />
            <RHFFormField
              name="discountPrice"
              control={control}
              label="Discounted Price (₹)"
              type="number"
              isDisabled
              error={errors.discountPrice}
            />
            <RHFCheckboxField
              name="inStock"
              control={control} label="In Stock" />
          </div>
        </section>


        {/* Additional Fields */}
        {extraFields.length > 0 && (
          <section className="form-section">
            <SectionTitle title="📦 Additional Specifications" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extraFields.map((field, index) => {
                const fieldName = `extraFields.${field.name}`;
                if (field.type === 'dropdown') {
                  return (
                    <RHFDropdown
                      key={index}
                      name={fieldName}
                      label={field.name}
                      control={control}
                      errors={errors}
                      categories={field.options || []}
                    />
                  );
                }
                return (
                  <RHFFormField
                    key={index}
                    name={fieldName}
                    control={control}
                    label={field.name}
                    placeholder={`Enter ${field.name}${field.unit ? ` (${field.unit})` : ''}`}
                    error={errors?.[fieldName]}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Product Image */}
        <section className="form-section">
          <SectionTitle icon={<FiImage />} title="Product Image" />
          <RHFDropzoneField
            key={watch('productImage')}
            name="productImage"
            control={control}
            error={errors.productImage}
          />
        </section>

        {/* Description */}
        <section className="form-section">
          <SectionTitle title="📝 Product Description" />
          <RHFContentFiled
            name="productDescription"
            control={control}
            error={errors.productDescription}
          />
        </section>

        {/* Actions */}
        <div className="flex justify-end flex-wrap gap-4 mt-6">
          {isEditMode && (
            <motion.button
              type="button"
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 rounded-md font-medium shadow-sm"
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            className={`px-6 py-2 rounded-md font-medium shadow-sm flex items-center gap-2 
            ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
            text-white dark:bg-blue-500 dark:hover:bg-blue-600`}
          >
            {isSubmitting ? (
              <IoReloadOutline size={20} className='text-white animate-spin' />
            ) : (
              <>
                {isEditMode ? <UpdateIcon /> : <FiPlus />}
                {isEditMode ? 'Update Product' : 'Add Product'}
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

