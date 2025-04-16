import { useState, useEffect } from "react";
import { ProductCard } from "./card";
import axios from "axios";
import { Product } from "../../Store/ProductType";

export default function Fruits() {
  const [products, setProducts] = useState<Product[]>([]); // Initial state is an empty array
  const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling
  useEffect(() => {
    const fetchProductsByCategory = async (category: string) => {
      try {
        const encodedCategory = encodeURIComponent(category); // Encode the category value
        const response = await axios.get(
          `http://localhost:5000/products?category=${encodedCategory}`
        );
        setProducts(response.data.products); // Assuming the response contains a 'products' field
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProductsByCategory("Fruits"); // Example category
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className=" justify-center gap-6 mb-5 md:mb-10 py-5 md:py-10">
        <h1 className="text-2xl sm:text-3xl text-[#0f440b] font-semibold text-center">
          Fruits
        </h1>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
