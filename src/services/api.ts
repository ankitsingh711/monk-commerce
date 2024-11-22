
import axios from 'axios';

const API_KEY = 'your-api-key';
const BASE_URL = 'http://stageapi.monkcommerce.app/task/products/search';

export const fetchProducts = async (search = '', page = 0, limit = 10) => {
  const response = await axios.get(BASE_URL, {
    params: { search, page, limit },
    headers: { 'x-api-key': API_KEY },
  });
  return response.data;
};
