import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Button,
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
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onRemove,
  onEdit,
  onEditPicker,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [discountType, setDiscountType] = useState<any>(
    product.discountType || "flat"
  );

  const toggleExpand = () => setExpanded(!expanded);

  const handleChange = (field: string, value: any) => {
    onEdit({ ...product, [field]: value });
  };

  const handleDiscountTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newType = event.target.value as string;
    setDiscountType(newType);
    onEdit({ ...product, discountType: newType });
  };

  return (
    <div className="product-item">
      <ListItem
        className="product-row"
        style={{ display: "flex", alignItems: "center" }}
      >
        <DragHandleIcon />
        <TextField
          value={product.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{ flex: 1, marginRight: 16 }}
        />
        <FormControl style={{ width: 120, marginRight: 16 }}>
          <InputLabel>Discount Type</InputLabel>
          <Select
            value={discountType}
            onChange={handleDiscountTypeChange}
            label="Discount Type"
          >
            <MenuItem value="flat">Flat off</MenuItem>
            <MenuItem value="percent">% off</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Discount"
          type="number"
          value={product.discount || ""}
          onChange={(e) => handleChange("discount", parseFloat(e.target.value))}
          style={{ width: 100, marginRight: 16 }}
        />
        <IconButton onClick={onEditPicker}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemove}>
          <CloseIcon />
        </IconButton>
        <Button
          onClick={toggleExpand}
          variant="text"
          style={{ marginLeft: 16 }}
        >
          {expanded ? "Hide variants" : "Show variants"}
        </Button>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {product.variants.map((variant, index) => (
            <ListItem key={index} style={{ paddingLeft: 32 }}>
              <DragHandleIcon style={{ marginRight: 8 }} />
              <TextField
                value={variant.title}
                onChange={(e) =>
                  handleChange(
                    "variants",
                    product.variants.map((v, i) =>
                      i === index ? { ...v, title: e.target.value } : v
                    )
                  )
                }
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
