// types/Product.ts
export interface Product {
  _id: String;
  id: string;
  name: string;
  price: number;
  weight?: string;
  images: ProductImage[];
  category?: string;
}
export interface ProductImage {
  id: string;
  public_id: string;
  url: string;
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
