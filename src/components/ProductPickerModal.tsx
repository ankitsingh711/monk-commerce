import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  List,
  ListItem,
  Checkbox,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Product } from "../types/product";

interface ProductPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (selectedProducts: Product[]) => void;
  availableProducts: Product[];
}

const ProductPickerModal: React.FC<ProductPickerModalProps> = ({
  open,
  onClose,
  onSave,
  availableProducts,
}) => {
  const [selected, setSelected] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Filter available products based on search query
  const filteredProducts = availableProducts.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate loading state (useful if data is fetched)
  useEffect(() => {
    if (open) {
      setLoading(true);
      // Simulate a delay to show the spinner (remove this in real scenarios)
      setTimeout(() => setLoading(false), 500); // adjust this delay as needed
    }
  }, [open]);

  const toggleSelect = (product: Product) => {
    setSelected((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Select Products</h2>
        {/* Search Bar */}
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
        
        {/* Show loading spinner when filtering products */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.slice(0, 10).map((product) => (
                <ListItem key={product.id} sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={selected.some((p) => p.id === product.id)}
                    onChange={() => toggleSelect(product)}
                  />
                  {product.title || "Unnamed Product"}
                </ListItem>
              ))
            )}
          </List>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "green", color: "white", marginRight: 2 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductPickerModal;
