import React from "react";
import { Button } from "@mui/material";

interface AddProductButtonProps {
  addParent: () => void;
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ addParent }) => (
  <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
    <Button
      variant="contained"
      sx={{ backgroundColor: "green", color: "white" }}
      onClick={addParent}
    >
      Add Product
    </Button>
  </div>
);

export default AddProductButton;
