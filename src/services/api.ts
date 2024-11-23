import axios from "axios";

const API_KEY = "72njgfa948d9aS7gs5";
const BASE_URL = "https://stageapi.monkcommerce.app/task/products/search";

export const fetchProducts = async (
  search: string,
  page: number,
  limit: number = 10
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { search, page, limit },
      headers: { "x-api-key": API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
