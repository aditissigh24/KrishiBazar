import { ShieldCheck, Activity, Truck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <img
          src="/images/farm.jpeg"
          alt="Organic farm landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Our Marketplace
            </h1>
            <p className="text-xl text-white max-w-lg">
              Bringing nature's goodness directly from farms to your family.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-6xl mx-auto">
          <div className="flex justify-center mb-4"></div>
          <h2 className="text-3xl md:text-4xl text-[#0f440b] font-bold mb-6">
            Over ten years ago we started our journey; turning our shelves over
            to sustainable, organic produce.
          </h2>
          <p className="text-gray-700 mb-8">
            We've always had a passion for real food and a desire to feed our
            children better. This passion has grown into one of the most
            sustainable organic grocers in the country, supplying fresh,
            seasonal produce from farm to fork.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className=" py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                What We Do
              </h2>
              <p className="text-gray-700 mb-4">
                We curate and deliver the freshest organic produce, artisanal
                foods, and natural products from trusted local farmers and
                producers. Our marketplace offers:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Fresh, seasonal fruits and vegetables harvested at peak
                    ripeness
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Probiotic-rich fermented drinks and foods for gut health
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Aromatic culinary herbs and unique spice blends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Medicinal herbs and plant-based wellness products</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/bg7.jpg"
                  alt="Fresh organic produce"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-green-50 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Sustainability
              </h2>
              <p className="text-gray-700 mb-4">
                Environmental stewardship is at the heart of everything we do.
                We're committed to practices that protect our planet while
                delivering exceptional products:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Supporting regenerative farming practices that build soil
                    health
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Minimizing food miles through local sourcing networks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Using eco-friendly, compostable packaging materials
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>
                    Reducing food waste through careful planning and community
                    partnerships
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0 order-first md:order-last">
              <div className="h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/bg5.jpeg"
                  alt="Sustainable farming practices"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className=" py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-700 mb-4">
                What sets us apart is our unwavering commitment to quality,
                transparency, and customer satisfaction:
              </p>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quality Guarantee</h3>
                    <p className="text-sm text-gray-600">
                      We personally vet all products and producers, ensuring you
                      receive only the best.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 text-green-600">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Freshness Promise</h3>
                    <p className="text-sm text-gray-600">
                      From farm to your table within 24-48 hours for maximum
                      nutrition and flavor.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 text-green-600">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reliable Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Convenient scheduled deliveries with eco-friendly
                      packaging to maintain freshness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/bg4.jpg"
                  alt="Organic product quality check"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-[#0f440b] font-bold text-center mb-12">
            Our Fruits Collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/300"
                  alt="Organic Mixed Berries"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                    Fruits
                  </span>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <h3 className="font-semibold mb-1">Organic Mixed Berries</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Freshly harvested seasonal berries
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">$6.99</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/300"
                  alt="Kombucha Variety Pack"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                    Fermented
                  </span>
                  <span className="text-amber-500 text-sm">★★★★☆</span>
                </div>
                <h3 className="font-semibold mb-1">Kombucha Variety Pack</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Probiotic-rich fermented tea
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">$14.99</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/300"
                  alt="Culinary Herb Collection"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                    Herbs
                  </span>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <h3 className="font-semibold mb-1">Culinary Herb Collection</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Fresh-cut cooking herbs
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">$8.49</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/300"
                  alt="Global Spice Set"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                    Spices
                  </span>
                  <span className="text-amber-500 text-sm">★★★★☆</span>
                </div>
                <h3 className="font-semibold mb-1">Global Spice Set</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Organic spice blends
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-700">$19.99</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/products"
              className="inline-block hover:bg-[#176112ac] cursor-pointer bg-[#176112] text-white font-medium py-2 px-6 rounded-lg transition"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
