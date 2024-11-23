import React from "react";
import { List } from "@material-ui/core";
import ProductItem from "../components/ProductListItem";
import AddProductButton from "./AddProductButton";
import { Product } from "../types/product";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ProductListProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onEdit: (index: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  setProducts,
  onEdit,
}) => {
  const addProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      title: "",
      variants: [],
      image: { src: "" },
      showVariants: false,
      discount: 0
    };
    setProducts([...products, newProduct]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
  
    const reordered = Array.from(products);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setProducts(reordered);
  };
  

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="product-list">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {products.map((product, index) => (
                <Draggable key={index} draggableId={product.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ProductItem
                        product={product}
                        onRemove={() =>
                          setProducts(products.filter((_, i) => i !== index))
                        }
                        onEdit={(updatedProduct) => {
                          const updatedProducts = [...products];
                          updatedProducts[index] = updatedProduct;
                          setProducts(updatedProducts);
                        }}
                        onEditPicker={() => onEdit(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <AddProductButton addParent={addProduct} />
    </div>
  );
};

export default ProductList;
