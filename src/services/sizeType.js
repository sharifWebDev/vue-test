import axiosClient from '@/axiosClient';

export const fetchProductsAPI = async () => {
  try {
    const response = await axiosClient.get('/hk-prod-size-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching hk-prod-size-types:', error);
    throw error;
  }
};

export const addProductAPI = async (product) => {
  try {
    const response = await axiosClient.post('/hk-prod-size-types', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductAPI = async (product) => {
  try {
    const response = await axiosClient.put(`/hk-prod-size-types/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating hk-prod-size-types:', error);
    throw error;
  }
};

export const viewProductAPI = async (product) => {
  try {
    const response = await axiosClient.get(`/hk-prod-size-types/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating hk-prod-size-types:', error);
    throw error;
  }
};

export const deleteProductAPI = async (id) => {
  try {
    const response = await axiosClient.delete(`/hk-prod-size-types/${id}`);
    console.log(response.data)
    alert(response.data.message)
  } catch (error) {
    console.error('Error deleting hk-prod-size-types:', error);
    throw error;
  }
};

export const fetchCategoriesAPI = async () => {
  try {
    return await axiosClient.get(`/categories`)
    .then((response) => response.data);
  } catch (error) {
    console.error('Error deleting hk-prod-size-types:', error);
    throw error;
  }
};

// hk-prod-size-types