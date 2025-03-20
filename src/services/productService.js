import axiosClient from '@/axiosClient';

export const fetchProductsAPI = async () => {
  try {
    const response = await axiosClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProductAPI = async (product) => {
  try {
    const response = await axiosClient.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductAPI = async (product) => {
  try {
    const response = await axiosClient.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const viewProductAPI = async (product) => {
  try {
    const response = await axiosClient.get(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductAPI = async (id) => {
  try {
    const response = await axiosClient.delete(`/products/${id}`);
    console.log(response.data)
    alert(response.data.message)
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const fetchCategoriesAPI = async () => {
  try {
    return await axiosClient.get(`/categories`)
    .then((response) => response.data);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
