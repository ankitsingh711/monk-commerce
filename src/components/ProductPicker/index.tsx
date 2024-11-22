import React, { useState } from 'react';
import { useProductSearch } from '../../hooks/useProductSearch';
import { Product } from '../../types/product';

interface ProductPickerProps {
  onClose: () => void;
  onProductSelect: (selectedProducts: Product[]) => void;
}

const ProductPicker: React.FC<ProductPickerProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const { products, fetchNextPage, hasMore } = useProductSearch(search);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (hasMore && e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight) {
      fetchNextPage();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div onScroll={handleScroll}>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image.src} alt={product.title} />
            <h4>{product.title}</h4>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductPicker;
