import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Collapse,
  List,
  ListItem,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Product } from "../types/product";

interface ProductItemProps {
  product: Product;
  onRemove: () => void;
  onEdit: (updatedProduct: Product) => void;
  onEditPicker: () => void;
  showVariants: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onRemove,
  onEdit,
  onEditPicker,
  showVariants,
}) => {
  const [expanded, setExpanded] = useState(showVariants);

  const handleChange = (field: string, value: any) => {
    onEdit({ ...product, [field]: value });
  };

  const handleVariantVisibilityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newVisibility = event.target.value as string;
    setExpanded(newVisibility === "show");
    onEdit({ ...product, showVariants: newVisibility === "show" });
  };

  return (
    <div className="product-item">
      <ListItem
        className="product-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
        }}
      >
        <DragHandleIcon style={{ color: "#888" }} />
        <TextField
          value={product.title}
          onChange={(e) => handleChange("title", e.target.value)}
          label="Product Title"
          variant="outlined"
          size="small"
          style={{ flex: 1 }}
        />
        <FormControl style={{ width: 120 }}>
          <InputLabel>Show Variants</InputLabel>
          <Select
            value={expanded ? "show" : "hide"}
            onChange={handleVariantVisibilityChange}
          >
            <MenuItem value="show">Show</MenuItem>
            <MenuItem value="hide">Hide</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Discount"
          type="number"
          value={product.discount || ""}
          onChange={(e) => handleChange("discount", parseFloat(e.target.value))}
          size="small"
          style={{ width: 100 }}
        />

        <IconButton onClick={onEditPicker} size="small">
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={onRemove} size="small">
          <CloseIcon color="error" />
        </IconButton>
      </ListItem>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {product.variants.map((variant, index) => (
            <ListItem key={index} style={{ paddingLeft: 32 }}>
              <TextField
                value={variant.title}
                label={`Variant ${index + 1}`}
                onChange={(e) =>
                  handleChange(
                    "variants",
                    product.variants.map((v, i) =>
                      i === index ? { ...v, title: e.target.value } : v
                    )
                  )
                }
                size="small"
                style={{ flex: 1, marginRight: 16 }}
              />
              <TextField
                label="Discount"
                type="number"
                value={variant.discount || ""}
                onChange={(e) =>
                  handleChange(
                    "variants",
                    product.variants.map((v, i) =>
                      i === index
                        ? { ...v, discount: parseFloat(e.target.value) }
                        : v
                    )
                  )
                }
                size="small"
                style={{ width: 100 }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default ProductItem;
