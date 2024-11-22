import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Product } from '../../types/product';
import ProductItem from '../ProductItem';
import styles from '../../styles/ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onRemoveProduct: (productId: number) => void;
  onUpdateProduct: (updatedProducts: Product[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onRemoveProduct,
  onUpdateProduct,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedProducts = Array.from(products);
    const [movedProduct] = reorderedProducts.splice(result.source.index, 1);
    reorderedProducts.splice(result.destination.index, 0, movedProduct);

    onUpdateProduct(reorderedProducts);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="product-list">
        {(provided) => (
          <div
            className={styles.productList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {products.map((product, index) => (
              <Draggable
                key={product.id.toString()}
                draggableId={product.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ProductItem
                      product={product}
                      onRemove={onRemoveProduct}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductList;
