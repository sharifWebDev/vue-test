// ItemService.js
import axiosClient from "@/axiosClient";

export const fetchItemAPI = async ({ page, search, length }) => {
  try {
    const response = await axiosClient.get("/answer_builders", {
      params: {
        page,
        search,
        length,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetch answer_builders:", error);
    throw error;
  }
};

export const addItemAPI = async (product) => {
  try {
    const response = await axiosClient.post("/answer_builders", product);
    return response.data;
  } catch (error) {
    console.log("Error adding product:", error);
    throw error;
  }
};

export const updateItemAPI = async (id, productData) => {
  try {
    const response = await axiosClient.put(
      `/answer_builders/update/${id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const fetchItemByIdAPI = async (product) => {
  try {
    const response = await axiosClient.get(`/answer_builders/show/${product}`);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteItemAPI = async (productId) => {
  try {
    const response = await axiosClient.delete(
      `/answer_builders/destroy/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
