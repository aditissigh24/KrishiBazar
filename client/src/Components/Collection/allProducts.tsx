import { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "./card";
import { Product } from "../../Store/ProductType";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]); // Initial state is an empty array
  const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling
  useEffect(() => {
    // Fetch data from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://krishibazar-sgjm.onrender.com/products/"
        ); // Replace with your API endpoint
        setProducts(response.data.products); // Assuming the response data is an array of products
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner or something more stylish here
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className=" justify-center gap-6 mb-5 md:mb-10 py-5 md:py-10">
        <h1 className="text-2xl sm:text-3xl text-[#0f440b] font-semibold text-center">
          All Products
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
