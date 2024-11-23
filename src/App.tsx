import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductPickerModal from "./components/ProductPickerModal";
import { Product } from "./types/product";
import { useProductSearch } from "./hooks/useProductSearch";
import Navbar from "./components/NavBar";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { products: availableProducts, fetchNextPage } = useProductSearch("");

  const openModal = (index: number) => {
    setEditingIndex(index);
    setModalOpen(true);
    fetchNextPage();
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const saveSelectedProducts = (selectedProducts: Product[]) => {
    if (editingIndex === null) return;
    const updatedProducts = [...products];
    updatedProducts[editingIndex].variants = selectedProducts.map(
      (product) => ({ title: product.title } as any)
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <Navbar />
      <ProductList
        products={products}
        setProducts={setProducts}
        onEdit={openModal}
      />
      {modalOpen && (
        <ProductPickerModal
          open={modalOpen}
          onClose={closeModal}
          onSave={saveSelectedProducts}
          availableProducts={availableProducts.slice(0, 10)}
        />
      )}
    </div>
  );
};

export default App;
