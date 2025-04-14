import { PiHandshake } from "react-icons/pi";
import { GrMap } from "react-icons/gr";
import { LuBadgeIndianRupee } from "react-icons/lu";

export default function Best() {
  return (
    <div className="hidden lg:block bg-amber-50 min-h-screen relative">
      <div className="w-full h-full md:h-96 lg:h-screen relative">
        <img
          src="/images/DarkBG.jpeg"
          alt="Background"
          className="h-4/5 w-full object-cover object-center" // Reduced height to 80%
        />

        {/* Text content - positioned above cards */}
        <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-center text-center px-4 h-2/5">
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-green-50 font-bold mb-4">
            We Always Provide <br /> You The Best In The Town
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-green-100 max-w-3xl">
            Fresh, locally-sourced products delivered straight from farm to
            table. Our mission is to bring health and happiness through quality
            you can taste.
          </p>
        </div>

        {/* Feature Cards Container - positioned at bottom */}
        <div className="absolute bottom-36.5 inset-x-0">
          <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 w-full max-w-6xl mx-auto px-4">
            {/* Card 1 */}
            <div className="bg-green-50 w-full md:w-80 rounded-t-full p-4 md:p-8 shadow-md text-center">
              <div className="mb-4 md:mb-6 mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full  flex items-center justify-center">
                <PiHandshake className="w-8 h-8 md:w-20 md:h-20 text-[#176112]" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-green-900 mb-2">
                Great Daily Deals
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Enjoy fresh produce and pantry staples at unbeatable prices
                every day.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 w-full md:w-80 rounded-t-full p-4 md:p-8 shadow-md text-center">
              <div className="mb-4 md:mb-6 mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full  flex items-center justify-center">
                <GrMap className="w-8 h-8 md:w-15 md:h-15 text-[#176112]" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-green-900 mb-2">
                Free Delivery
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Get your orders delivered to your doorstep without any delivery
                charges.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-green-50 w-full md:w-80 rounded-t-full p-4 md:p-8 shadow-md text-center">
              <div className="mb-4 md:mb-6 mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full  flex items-center justify-center">
                <LuBadgeIndianRupee className="w-8 h-8 md:w-15 md:h-15 text-[#176112]" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-green-900 mb-2">
                Best Prices Ever
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                High-quality, farm-fresh, locally-sourced products at the lowest
                market rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
