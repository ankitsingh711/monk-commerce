import React from "react";
import { Button, Box } from "@mui/material";

interface AddProductButtonProps {
  addParent: () => void;
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ addParent }) => (
  <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "green",
        color: "white",
        textTransform: "none",
        "&:hover": { backgroundColor: "darkgreen" },
        padding: "10px 20px",
      }}
      onClick={addParent}
    >
      + Add Product
    </Button>
  </Box>
);

export default AddProductButton;
