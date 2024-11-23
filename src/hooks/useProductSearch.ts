import { useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../types/product";

export const useProductSearch = (search: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNextPage = async () => {
    const newProducts = await fetchProducts(search, page);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setHasMore(newProducts.length > 0);
  };

  return { products, fetchNextPage, hasMore };
};
