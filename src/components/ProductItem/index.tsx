import React from 'react';
import { Product } from '../../types/product';
import styles from '../../styles/ProductItem.module.css';

interface ProductItemProps {
  product: Product;
  onRemove: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onRemove }) => (
  <div className={styles.productItem}>
    <img src={product.image.src} alt={product.title} className={styles.productImage} />
    <div className={styles.productDetails}>
      <h4>{product.title}</h4>
      <button onClick={() => onRemove(product.id)} className={styles.removeButton}>
        X
      </button>
    </div>
  </div>
);

export default ProductItem;
