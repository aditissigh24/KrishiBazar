import { useState } from "react";
import { ProductCard } from "./card";
import { CartProvider } from "../../Store/CartStore";
import { Product } from "../../Store/ProductType";

export default function Drinks() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Avocado",
      price: 2.99,
      weight: "250g",
      image: "/api/placeholder/300/300",
      category: "Fruits",
    },
    {
      id: "2",
      name: "Fresh Strawberries",
      price: 4.49,
      weight: "400g",
      image: "/api/placeholder/300/300",
      category: "Fruits",
    },
    {
      id: "3",
      name: "Whole Grain Bread",
      price: 3.29,
      weight: "500g",
      image: "/api/placeholder/300/300",
      category: "Bakery",
    },
    {
      id: "4",
      name: "Premium Coffee Beans",
      price: 12.99,
      weight: "250g",
      image: "/api/placeholder/300/300",
      category: "Beverages",
    },
  ]);

  return (
    <CartProvider>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className=" justify-center gap-6 mb-5 md:mb-10 py-5 md:py-10">
          <h1 className="text-2xl sm:text-3xl text-[#0f440b] font-semibold text-center">
            Fermented Drinks
          </h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </CartProvider>
  );
}
