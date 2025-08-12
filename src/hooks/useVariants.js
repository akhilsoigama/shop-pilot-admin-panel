import { useState } from 'react';
import { toast } from 'sonner';

export default function useVariants() {
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [variants, setVariants] = useState([]);

  const generateCombinations = (price = 0) => {
    const validAttributes = variantAttributes
      .filter(attr => attr?.name?.trim() && attr?.values?.length > 0)
      .map(attr => ({
        ...attr,
        values: attr.values.filter(v => v?.trim())
      }));

    if (validAttributes.length === 0) {
      toast.error('Please add at least one valid attribute with values');
      return;
    }

    let combinations = [{}];

    validAttributes.forEach(attr => {
      const temp = [];
      combinations.forEach(comb => {
        attr.values.forEach(value => {
          temp.push({
            ...comb,
            [attr.name]: value.trim()
          });
        });
      });
      combinations = temp;
    });

    const newVariants = combinations.map(comb => ({
      attributes: Object.entries(comb)
        .filter(([name, value]) => name && value)
        .map(([name, value]) => ({ name, value })),
      price: typeof price === 'number' ? price : parseFloat(price) || 0,
      discount: 0,
      discountPrice: typeof price === 'number' ? price : parseFloat(price) || 0,
      availableStock: 0, 
      inStock: false, 
      sku: `SKU-${Math.random().toString(36).substring(2, 8)}`,
      images: []
    }));

    setVariants(newVariants);
    return newVariants;
  };

  return {
    variantAttributes,
    setVariantAttributes,
    generateCombinations,
    variants,
    setVariants
  };
}