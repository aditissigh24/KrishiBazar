import { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "./card";
import { Product } from "../../Store/ProductType";
import Pagination from "../Collection/pagination";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
export default function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const productsPerPage = 20; // Products per page

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add limit param to match your backend's expected format
        const response = await axios.get(
          `https://krishibazar-sgjm.onrender.com/products?page=${currentPage}&limit=${productsPerPage}${
            keyword ? `&keyword=${encodeURIComponent(keyword)}` : ""
          }${category ? `&category=${encodeURIComponent(category)}` : ""}`
        );

        if (response.data && response.data.success) {
          setProducts(response.data.products || []);

          // Handle pagination data
          if (response.data.pagination) {
            // If backend sends pagination metadata
            setTotalProducts(response.data.pagination.totalItems);
            setTotalPages(response.data.pagination.totalPages);
          } else {
            // If backend doesn't send pagination data, estimate based on response
            const productsReceived = response.data.products.length;

            // If we received fewer products than requested per page,
            // we're likely on the last page
            if (productsReceived < productsPerPage && currentPage > 1) {
              setTotalPages(currentPage);
              setTotalProducts(
                productsPerPage * (currentPage - 1) + productsReceived
              );
            } else {
              // Otherwise assume there might be more pages
              setTotalPages(currentPage + 1);
              setTotalProducts(currentPage * productsPerPage + 1); // Estimate
            }
          }
        } else {
          throw new Error("Invalid data format received from server");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [currentPage, productsPerPage, keyword, category]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => handlePageChange(1)}
            className="mt-4 px-4 py-2 bg-[#0f440b] text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="justify-center gap-6 mb-5  py-5 md:py-10">
        <h1 className="text-2xl sm:text-3xl text-[#0f440b] font-semibold text-center">
          {keyword ? `Results for "${keyword}"` : "All Products"}
        </h1>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {/* Product count info */}
      <p className="text-center text-gray-600">
        Showing{" "}
        {Math.min((currentPage - 1) * productsPerPage + 1, totalProducts)} -{" "}
        {Math.min(currentPage * productsPerPage, totalProducts)} of{" "}
        {totalProducts} products
      </p>
    </div>
  );
}
