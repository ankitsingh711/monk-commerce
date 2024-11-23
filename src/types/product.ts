export interface Product {
  id: number;
  title: string;
  variants: Variant[];
  image: { src: string };
  showVariants: boolean;
  discount: number;
  discountType?: String; 
}


export interface Variant {
  title: string;
  price: number;
  discount?: number;
}
