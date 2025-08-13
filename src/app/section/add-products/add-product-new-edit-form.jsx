'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import UpdateIcon from '@mui/icons-material/Update';
import { IoReloadOutline } from "react-icons/io5";
import { FiPlus, FiImage, FiInfo, FiDollarSign, FiTag, FiKey, FiTrash2, FiCheck } from 'react-icons/fi';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import RHFDropzoneField from '@/app/components/controllers/RHFImageDropZone';
import RHFContentFiled from '@/app/components/controllers/RHFContentField';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { RHFDropdown } from '@/app/components/controllers/RHFDropdown';
import { useRouter } from 'next/navigation';
import RHFCheckboxField from '@/app/components/controllers/RHFCheckboxField';
import { categories, getFieldsForSubcategory, Subcategories, getVariantAttributesForSubcategory } from '@/lib/category';
import RHFVariantField from '@/app/components/controllers/RHFVariantField';
import { Button } from '@/components/ui/button';

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

const generateVariantCombinations = (attributes, basePrice = 0) => {
  const selectedAttributes = attributes.filter(attr => attr.selected);

  if (selectedAttributes.length === 0) {
    toast.error('Please select at least one attribute for variants');
    return [];
  }

  let combinations = [{}];

  selectedAttributes.forEach(attr => {
    const temp = [];
    combinations.forEach(comb => {
      attr.values.forEach(value => {
        if (value.trim()) {
          temp.push({
            ...comb,
            [attr.name]: value.trim()
          });
        }
      });
    });
    combinations = temp;
  });

  return combinations.map(comb => {
    const attributes = Object.entries(comb)
      .filter(([name, value]) => name && value)
      .map(([name, value]) => ({ name, value }));

    return {
      attributes,
      price: basePrice,
      discount: 0,
      discountPrice: basePrice,
      quantity: 1,
      availableStock: 0, // Default to 0 stock
      inStock: false, // Default to out of stock
      sku: `SKU-${Math.random().toString(36).substring(2, 8)}`
    };
  });
};

const MotionButton = motion(Button);

export const AddProductsNewEditForm = ({ productData }) => {
  const { createProduct, updateProduct } = useProducts();
  const isEditMode = !!productData?._id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [variants, setVariants] = useState([]);
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
      productImage: [],
      inStock: true,
      discount: 0,
      discountPrice: 0,
      quantity: 1,
      extraFields: {},
      variants: [],
    },
  });

  const productName = watch('productName');
  const price = watch('price');
  const discount = watch('discount');
  const selectedCategory = watch('category');
  const selectedSubcategory = watch('subCategory');

  useEffect(() => {
    if (!isEditMode && productName) {
      const key = `PRD-${slugify(productName)}`;
      setValue('productKey', key);
    }
  }, [productName, isEditMode, setValue]);

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

      // Set the filtered subcategories based on the product's category
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
      // Handle variants if they exist
      if (productData.variants && productData.variants.length > 0) {
        const mappedVariants = productData.variants.map(variant => ({
          ...variant,
          attributes: variant.specifications ?
            variant.specifications.map(spec => ({
              name: spec.name,
              value: spec.value
            })) : [],
          availableStock: variant.availableStock || 0
        }));
        setVariants(mappedVariants);
      }
    }
  }, [productData, reset, setValue]);

  useEffect(() => {
    const discountValue = price * (discount / 100);
    const calculatedPrice = price - discountValue;
    setValue('discountPrice', parseFloat(calculatedPrice.toFixed(2)));
  }, [price, discount, setValue]);

  useEffect(() => {
    if (selectedCategory) {
      const found = Subcategories.find(item => item.name === selectedCategory);
      const subs = found ? found.subcategories : [];
      setFilteredSubcategories(subs);

      // Reset subCategory if the current one is not in the new list
      const currentSub = watch('subCategory');
      const subNames = subs.map(sub => (typeof sub === 'string' ? sub : sub.name));
      if (!subNames.includes(currentSub)) {
        setValue('subCategory', '');
      }
    }
  }, [selectedCategory, setValue, watch]);

  useEffect(() => {
    if (selectedSubcategory && selectedCategory) {
      const attributes = getVariantAttributesForSubcategory(selectedCategory, selectedSubcategory);

      const initializedAttributes = attributes.map(attr => ({
        ...attr,
        selected: false,
        values: ['']
      }));

      if (isEditMode && productData?.variants?.length > 0) {
        const variantAttributeNames = new Set();
        productData.variants.forEach(variant => {
          variant.specifications?.forEach(spec => {
            variantAttributeNames.add(spec.name);
          });
        });

        initializedAttributes.forEach(attr => {
          if (variantAttributeNames.has(attr.name)) {
            attr.selected = true;

            const values = new Set();
            productData.variants.forEach(variant => {
              const spec = variant.specifications?.find(s => s.name === attr.name);
              if (spec) {
                values.add(spec.value);
              }
            });

            attr.values = Array.from(values);
          }
        });
      }

      setVariantAttributes(initializedAttributes);
    }
  }, [selectedSubcategory, selectedCategory, isEditMode, productData]);

  useEffect(() => {
    setValue('variants', variants);
  }, [variants, setValue]);

  const handleVariantPriceChange = (index, value) => {
    const newVariants = [...variants];
    const priceValue = parseFloat(value) || 0;

    newVariants[index].price = priceValue;

    if (newVariants[index].discount) {
      const discountValue = priceValue * (newVariants[index].discount / 100);
      newVariants[index].discountPrice = priceValue - discountValue;
    } else {
      newVariants[index].discountPrice = priceValue;
    }

    setVariants(newVariants);
  };

  const handleVariantDiscountChange = (index, value) => {
    const newVariants = [...variants];
    const discountValue = parseFloat(value) || 0;

    newVariants[index].discount = discountValue;

    const discountAmount = newVariants[index].price * (discountValue / 100);
    newVariants[index].discountPrice = newVariants[index].price - discountAmount;

    setVariants(newVariants);
  };

  const handleVariantStockChange = (index, value) => {
    const newVariants = [...variants];
    const stockValue = parseInt(value) || 0;

    newVariants[index].availableStock = stockValue;
    newVariants[index].inStock = stockValue > 0;

    setVariants(newVariants);
  };

  const handleVariantQuantityChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].quantity = parseInt(value) || 0;
    setVariants(newVariants);
  };

  const handleVariantSkuChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].sku = value || '';
    setVariants(newVariants);
  };

  const toggleAttributeSelection = (index) => {
    const newAttributes = [...variantAttributes];
    newAttributes[index].selected = !newAttributes[index].selected;
    setVariantAttributes(newAttributes);
  };

  const addAttributeValue = (attrIndex) => {
    const newAttributes = [...variantAttributes];
    newAttributes[attrIndex].values = [...newAttributes[attrIndex].values, ''];
    setVariantAttributes(newAttributes);
  };

  const updateAttributeValue = (attrIndex, valueIndex, value) => {
    const newAttributes = [...variantAttributes];
    newAttributes[attrIndex].values[valueIndex] = value;
    setVariantAttributes(newAttributes);
  };

  const removeAttributeValue = (attrIndex, valueIndex) => {
    const newAttributes = [...variantAttributes];
    newAttributes[attrIndex].values.splice(valueIndex, 1);
    setVariantAttributes(newAttributes);
  };

  const generateVariants = () => {
    const newVariants = generateVariantCombinations(variantAttributes, price);
    setVariants(newVariants);
  };
  useEffect(() => {
    if (selectedCategory && !initializingRef.current) {
      const found = Subcategories.find(item => item.name === selectedCategory);
      setFilteredSubcategories(found ? found.subcategories : []);
      setValue('subCategory', ''); // Only reset when not initializing
    }
  }, [selectedCategory, setValue]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    if (variants.some(v => typeof v.availableStock !== 'number' || v.availableStock < 0)) {
      toast.error('Please enter valid stock quantities for all variants');
      setIsSubmitting(false);
      return;
    }

    try {
      const specifications = extraFields.map(field => ({
        name: field.name,
        value: data?.extraFields?.[field.name] || '',
        type: field.type || 'text',
      }));

      const preparedVariants = variants.map(variant => ({
        specifications: (variant.attributes || []).map(attr => ({
          name: attr.name,
          value: attr.value,
          type: 'text'
        })),
        price: variant.price || 0,
        discount: variant.discount || 0,
        discountPrice: variant.discount
          ? (variant.price || 0) - ((variant.price || 0) * (variant.discount || 0) / 100)
          : variant.price || 0,
        quantity: variant.quantity || 1,
        availableStock: variant.availableStock || 0,
        inStock: (variant.availableStock || 0) > 0,
        sku: variant.sku || ''
      }));

      const finalData = {
        ...data,
        specifications,
        variants: preparedVariants
      };

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
          quantity: 1,
          productImage: [],
          extraFields: {},
        });
        setVariantAttributes([]);
        setVariants([]);

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

  const SectionTitle = ({ icon, title, description }) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200 flex items-center gap-2">
        {icon} {title}
      </h2>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
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
          <SectionTitle
            icon={<FiInfo />}
            title="Basic Information"
            description="Enter the core details about your product"
          />

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
              label="Base Price (₹)"
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
              control={control}
              label="Base Quantity"
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
              control={control}
              label="In Stock"
            />
          </div>
        </section>

        {/* Additional Fields */}
        {extraFields.length > 0 && (
          <section className="form-section">
            <SectionTitle
              title="📦 Product Specifications"
              description="Add specific details about your product"
            />
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
                      error={errors?.extraFields?.[field.name]}
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
                    error={errors?.extraFields?.[field.name]}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Variant Attributes Section */}
        {variantAttributes.length > 0 && (
          <section className="form-section">
            <SectionTitle
              title="🔀 Variant Options"
              description="Select which attributes should create product variants"
            />

            <div className="mb-6 bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg">
              {variantAttributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => toggleAttributeSelection(attrIndex)}
                        className={`w-6 h-6 flex items-center justify-center rounded border-2 cursor-pointer transition-colors ${attr.selected
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-gray-300 dark:border-neutral-600'
                          }`}
                      >
                        {attr.selected && <FiCheck size={16} />}
                      </div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300">
                        {attr.name}
                      </h3>
                    </div>
                    {attr.selected && (
                      <button
                        type="button"
                        onClick={() => addAttributeValue(attrIndex)}
                        className="text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <FiPlus size={16} /> Add Value
                      </button>
                    )}
                  </div>

                  {attr.selected && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {attr.values.map((value, valueIndex) => (
                        <div key={valueIndex} className="flex gap-2 items-center">
                          <RHFVariantField
                            control={control}
                            name={`variantAttributes.${attrIndex}.values.${valueIndex}`}
                            value={value}
                            onChange={(e) => updateAttributeValue(attrIndex, valueIndex, e.target.value)}
                            className="flex-1"
                          />
                          {attr.values.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAttributeValue(attrIndex, valueIndex)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-border">
                <div>
                  <MotionButton
                    type="button"
                    onClick={generateVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="gap-2"
                    variant="default"
                  >
                    <FiPlus className="h-4 w-4" />
                    Generate Variants
                  </MotionButton>
                </div>

                {variants.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <span>
                      {variants.length} variant{variants.length > 1 ? 's' : ''} generated
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Generated Variants Section */}
        {variants.length > 0 && (
          <section className="form-section">
            <SectionTitle
              title="📦 Product Variants"
              description="Customize prices and details for each variant"
            />
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Variant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price (₹)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Discount (%)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Discounted Price (₹)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Available Stock
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
                  {variants.map((variant, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {variant.attributes?.map((attr, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="font-medium">{attr.name}:</span>
                            <span>{attr.value}</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RHFVariantField
                          control={control}
                          name={`variants.${index}.price`}
                          value={variant.price || 0}
                          type="number"
                          min="0"
                          step="0.01"
                          onChange={(e) => handleVariantPriceChange(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RHFVariantField
                          control={control}
                          name={`variants.${index}.discount`}
                          value={variant.discount || 0}
                          type="number"
                          min="0"
                          max="100"
                          onChange={(e) => handleVariantDiscountChange(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        ₹{Number(variant?.discountPrice ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RHFVariantField
                          control={control}
                          name={`variants.${index}.availableStock`}
                          value={variant.availableStock || 0}
                          type="number"
                          min="0"
                          required
                          onChange={(e) => handleVariantStockChange(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${(variant.availableStock || 0) > 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                          {(variant.availableStock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RHFVariantField
                          control={control}
                          name={`variants.${index}.quantity`}
                          value={variant.quantity || 0}
                          type="number"
                          min="0"
                          onChange={(e) => handleVariantQuantityChange(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RHFVariantField
                          control={control}
                          name={`variants.${index}.sku`}
                          value={variant.sku || ''}
                          type="text"
                          placeholder="SKU-123"
                          onChange={(e) => handleVariantSkuChange(index, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            const newVariants = [...variants];
                            newVariants.splice(index, 1);
                            setVariants(newVariants);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Product Image */}
        <section className="form-section">
          <SectionTitle
            icon={<FiImage />}
            title="Product Images"
            description="Upload product images (first image will be the main display image)"
          />
          <RHFDropzoneField
            key={watch('productImage')}
            name="productImage"
            control={control}
            error={errors.productImage}
          />
        </section>

        {/* Description */}
        <section className="form-section">
          <SectionTitle
            title="📝 Product Description"
            description="Describe your product in detail for customers"
          />
          <RHFContentFiled
            name="productDescription"
            control={control}
            error={errors.productDescription}
          />
        </section>

        {/* Actions */}
        <div className="flex justify-end flex-wrap gap-4 mt-1">
          {isEditMode && (
            <MotionButton
              type="button"
              onClick={handleCancel}
              whileHover={!isSubmitting ? {
                scale: 1.03,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              } : {}}
              whileTap={!isSubmitting ? {
                scale: 0.98
              } : {}}
              className="gap-2 px-6 font-medium transition-all"
              variant={isEditMode ? "secondary" : "default"}
            >
              Cancel
            </MotionButton>
          )}
          <MotionButton
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? {
              scale: 1.03,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            } : {}}
            whileTap={!isSubmitting ? {
              scale: 0.98
            } : {}}
            className="gap-2 px-6 font-medium transition-all"
            variant={isEditMode ? "secondary" : "default"}
          >
            {isSubmitting ? (
              <>
                <IoReloadOutline className="h-5 w-5 animate-spin" />
                {isEditMode ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                {isEditMode ? (
                  <UpdateIcon className="h-5 w-5" />
                ) : (
                  <FiPlus className="h-5 w-5" />
                )}
                {isEditMode ? "Update Product" : "Add Product"}
              </>
            )}
          </MotionButton>
        </div>
      </form>
    </motion.div>
  );
};