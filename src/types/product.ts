export interface ProductVariant {
    id: number;
    product_id: number;
    title: string;
    price: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    image: { src: string };
    variants: ProductVariant[];
  }
  