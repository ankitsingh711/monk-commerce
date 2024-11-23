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
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

  const filteredProducts = availableProducts.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
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
          width: { xs: "90%", sm: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "white",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6">Select Products</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search Field */}
        <Box sx={{ p: 2 }}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Box>

        {/* Product List */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              px: 2,
            }}
          >
            {filteredProducts.length === 0 ? (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ textAlign: "center", mt: 2 }}
              >
                No products found
              </Typography>
            ) : (
              <List>
                {filteredProducts.slice(0, 10).map((product) => (
                  <ListItem
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingY: 1,
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                    divider
                  >
                    <Checkbox
                      checked={selected.some((p) => p.id === product.id)}
                      onChange={() => toggleSelect(product)}
                      sx={{ mr: 2 }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        {product.image ? (
                          <img
                            src={product.image.src}
                            alt={product.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "4px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "grey.300",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid item xs>
                        <Typography variant="subtitle1">{product.title}</Typography>
                        {product.variants && product.variants.length > 0 && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 0.5 }}
                          >
                            Variants:{" "}
                            {product.variants.map((v) => v.title).join(", ")}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* Actions */}
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            bgcolor: "grey.100",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ marginRight: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductPickerModal;
