import React from "react";

interface AddProductButtonProps {
  onAdd: () => void;
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ onAdd }) => (
  <button onClick={onAdd}>Add Product</button>
);

export default AddProductButton;
