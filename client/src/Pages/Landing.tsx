import CategoryPage from "../Components/Landing/Category.tsx";
import TestimonialPage from "../Components/Landing/Testimonial.tsx";
import Best from "../Components/Landing/Best.tsx";
import { PiPlantFill } from "react-icons/pi";
import { ImTruck } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { GiFarmer } from "react-icons/gi";
export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Main Background Image (bg2.jpeg) */}
        <div className="absolute h-full w-full">
          <img
            src="/images/bg2.jpeg"
            className="h-full w-full object-cover"
            alt="Farm background"
          />
        </div>

        {/* Top Image with Curved Bottom */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "60vh",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 100px), 50% 100%, 0 calc(100% - 100px))",
          }}
        >
          <img
            src="/images/BG.jpeg"
            className="w-full h-full object-cover"
            alt="Top background"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-6xl font-bold text-[#0f440b] mb-6">
              Fresh from Farm <br />
              Straight to Your Table
            </h1>
            <p className="text-xl font-semibold text-[#0f440b] mb-8">
              Shop fresh fruits, veggies, grains & more — directly from local
              farmers.
            </p>
            {/* Search Bar */}
            <div className="max-w-md  mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for fresh produce..."
                  className="w-full px-5 py-3 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#176112] pr-12"
                />
                <button className="absolute right-2 bg-[#176112] text-white p-2 px-4 rounded-full hover:bg-[#176112ac] cursor-pointer transition duration-300">
                  Show Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e2fb66ae] p-2 sm:p-4">
        <div className="flex justify-around items-center">
          <div className="text-center justify-items-center">
            <PiPlantFill className="w-6 h-6 sm:w-10 sm:h-10 mx-auto" />
            <h1 className="text-xs sm:text-lg">
              100%<br></br> Farm Fresh
            </h1>
          </div>
          <div className="text-center justify-items-center">
            <ImTruck className="w-6 h-6 sm:w-10 sm:h-10 mx-auto" />
            <h1 className="text-xs sm:text-lg">
              To Your Doorstep
              <br />
              Instant Delivery
            </h1>
          </div>
          <div className="text-center justify-items-center">
            <GiFarmer className="w-6 h-6 sm:w-10 sm:h-10 mx-auto" />
            <h1 className="text-xs sm:text-lg">
              Supporting<br></br> Local Farmers
            </h1>
          </div>
          <div className="text-center justify-items-center">
            <IoIosPeople className="w-6 h-6 sm:w-10 sm:h-10 mx-auto" />
            <h1 className="text-xs sm:text-lg">
              Zero<br></br> Middlemen
            </h1>
          </div>
        </div>
      </div>
      <CategoryPage />
      <TestimonialPage />
      <Best />
    </>
  );
}
