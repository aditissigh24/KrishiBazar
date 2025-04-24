import { useState } from "react";
import { Link } from "react-router-dom";

// Sample category data - in a real app, this would come from your data source
const categories = [
  {
    id: 1,
    name: "Fresh Fruits",
    image: "/images/C5.jpeg",
    color: "bg-red-100",
    path: "/products/fruits",
  },
  {
    id: 2,
    name: "Vegetables",
    image: "/images/C2.jpeg",
    color: "bg-green-100",
    path: "/products/vegetables",
  },
  {
    id: 3,
    name: "Herbs & Spices",
    image: "/images/C3.jpeg",
    color: "bg-lime-100",
    path: "/products/herbs-and-spices",
  },
  {
    id: 4,
    name: "Root & Exotics",
    image: "/images/C7.jpeg",
    color: "bg-green-100",
    path: "/products/roots-and-exotics",
  },
  {
    id: 5,
    name: "Honey & Preserves",
    image: "/images/C1.jpeg",
    color: "bg-orange-100",
    path: "/products/honey-and-preservatives",
  },
  {
    id: 6,
    name: "Fermented Drinks",
    image: "/images/C6.jpeg",
    color: "bg-teal-100",
    path: "/products/fermented-drinks",
  },
  {
    id: 7,
    name: "Coming Soon",
    image: "/images/C4.jpeg",
    color: "bg-teal-100",
    path: "",
  },
  {
    id: 8,
    name: "Coming Soon",
    image: "/images/C4.jpeg",
    color: "bg-teal-100",
    path: "",
  },
];

type Category = {
  id: number;
  name: string;
  image: string;
  color: string;
  path: string;
};

const CategoryCard = ({ category }: { category: Category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isComingSoon = category.name === "Coming Soon";

  return (
    <div className="flex flex-col items-center mb-8">
      <div
        className={`relative rounded-full ${category.color} overflow-hidden w-24 h-24 sm:w-40 sm:h-40 border border-gray-500 shadow-lg transition-transform hover:scale-105`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={category.image}
          alt={category.name}
          className={`w-full h-full scale-115 object-cover transition-all duration-300 ${
            isHovered && !isComingSoon ? "opacity-60" : ""
          }`}
        />

        {/* View Products Button - Only visible on hover and not for "Coming Soon" items */}
        {isHovered && !isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to={category.path}>
              <button className="bg-[#176112] cursor-pointer  text-white font-medium py-3 px-4 rounded-xl text-sm shadow-md transition-colors">
                Explore
              </button>
            </Link>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-black">{category.name}</h3>
    </div>
  );
};

export default function CategoryPage() {
  return (
    <div className="bg-[#fdf7ee] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-[#0f440b]">
              Shop by Category
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[#0f440b] italic max-w-2xl mx-auto">
            "Explore our wide range of organic farm products grown with love and
            care for nature. All products are certified organic and harvested at
            peak freshness"
          </p>
        </div>

        {/* Categories Grid - Fixed to 3 columns on medium screens, 4 on large */}
        <div className="flex justify-center">
          <div className="w-full max-w-[900px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center py-8 mt-5">
            <h1 className="text-4xl font-bold text-[#0f440b]">How It Works</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20 px-4">
            <div className="text-center">
              <div className="rounded-full bg-[#faeedd] overflow-hidden w-20 h-20 mx-auto mb-4">
                <img
                  src="/images/H4.jpeg"
                  className="object-cover -mt-2.5 h-[100px] w-[100px]"
                />
              </div>
              <h1 className="mt-2 text-lg font-semibold text-black">
                Browse Farm-Fresh <br />
                Products
              </h1>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-[#faeedd] overflow-hidden w-20 h-20 mx-auto mb-4">
                <img
                  src="/images/H3.jpeg"
                  className="object-cover h-full w-full"
                />
              </div>
              <h1 className="mt-2 text-lg font-semibold text-black">
                Place Order with <br />
                Easy Payment
              </h1>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-[#faeedd] overflow-hidden w-20 h-20 mx-auto mb-4">
                <img
                  src="/images/H1.jpeg"
                  className="object-cover h-full w-full"
                />
              </div>
              <h1 className="mt-2 text-lg font-semibold text-black">
                Get it Delivered <br />
                to Your Door
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
