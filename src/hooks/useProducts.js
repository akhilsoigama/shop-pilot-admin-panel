import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_BASE = '/api/product';

const fetcher = (url) => axios.get(url).then(res => res.data);

export function useProducts() {
  const { data, error, isLoading, isValidating } = useSWR(API_BASE, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
  });

  const createProduct = async (productData) => {
    try {
      const optimisticData = data 
        ? [...data, { ...productData, _id: 'temp' }] 
        : [{ ...productData, _id: 'temp' }];
      
      mutate(API_BASE, optimisticData, false);

      const response = await axios.post(API_BASE, {
        ...productData,
        specifications: productData.specifications?.map(spec => ({
          name: spec.name,
          value: spec.value,
          type: spec.type
        })) || []
      });
      
      mutate(API_BASE);
      return response.data;
    } catch (err) {
      mutate(API_BASE);
      throw err;
    }
  };

  const getProduct = (id) => {
    const { data: productData, error: productError } = useSWR(
      id ? `${API_BASE}/${id}` : null, 
      fetcher
    );
    
    return {
      product: productData,
      isLoading: !productError && !productData,
      isError: productError
    };
  };

  const updateProduct = async (id, productData) => {
    try {
      const optimisticData = data?.map(product => 
        product._id === id ? { ...product, ...productData } : product
      );
      mutate(API_BASE, optimisticData, false);

      const response = await axios.put(`${API_BASE}/${id}`, {
        ...productData,
        specifications: productData.specifications?.map(spec => ({
          name: spec.name,
          value: spec.value,
          type: spec.type
        })) || []
      });
      
      mutate(API_BASE);
      return response.data;
    } catch (err) {
      mutate(API_BASE);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const optimisticData = data?.filter(product => product._id !== id);
      mutate(API_BASE, optimisticData, false);

      await axios.delete(`${API_BASE}/${id}`);
      mutate(API_BASE);
    } catch (err) {
      mutate(API_BASE);
      throw err;
    }
  };

  return {
    products: data || [],
    isLoading,
    isError: error,
    isValidating,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
  };
}