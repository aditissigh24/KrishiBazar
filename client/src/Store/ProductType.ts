// types/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  weight?: string;
  images: { url: string; public_id: string }[];
  category?: string;
}
// Example in types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  weight?: string;
  weightUnit?: string;
}
