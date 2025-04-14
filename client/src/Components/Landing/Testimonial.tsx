import React, { useState, useEffect } from "react";

// TypeScript interface for testimonial data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialPage: React.FC = () => {
  // Sample testimonial data
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Aarav Mehta",
      role: "Customer",
      content:
        "The vegetables I received from Krishi Bazar were so fresh, it felt like they were picked that morning. It's amazing to finally get farm-direct produce without the hassle.",
      rating: 5,
      image: "/images/Guy.jpeg",
    },
    {
      id: 2,
      name: "Isha Kapoor",
      role: "Customer",
      content:
        "I ordered honey and homemade pickles – both were incredibly authentic and delicious. The quality is unmatched, and I love supporting local sellers.",
      rating: 5,
      image: "/images/Female.jpeg",
    },
    {
      id: 3,
      name: "Rajiv Khanna",
      role: "Customer",
      content:
        "As someone who values healthy eating, I'm so glad I found Krishi Bazar. The fruits were juicy and sweet, and everything was neatly packed and on time.",
      rating: 4,
      image: "/images/Guy.jpeg",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Customer",
      content:
        "I bought fermented drinks and herbs, and both were of premium quality. You can actually taste the freshness, which you rarely get from supermarket shelves.",
      rating: 5,
      image: "/images/Female.jpeg",
    },
    {
      id: 5,
      name: "Karan Deshmukh",
      role: "Customer",
      content:
        "Highly impressed by the variety and quality. The root vegetables and spices were packed with flavor. It's like bringing the farmer's market to my doorstep.",
      rating: 4,
      image: "/images/Guy.jpeg",
    },
    {
      id: 6,
      name: "Divya Joshi",
      role: "Customer",
      content:
        "This platform is a hidden gem! I ordered organic produce and homemade items, and they exceeded my expectations. Everything felt honest and fresh.",
      rating: 5,
      image: "/images/Female.jpeg",
    },
    {
      id: 7,
      name: "Vikram Sharma",
      role: "Customer",
      content:
        "The quality of the herbs and spices I ordered was outstanding. Fresh, aromatic, and full of flavor. I've never had such a great experience shopping for these online.",
      rating: 5,
      image: "/images/Guy.jpeg",
    },
    {
      id: 8,
      name: "Maya Patel",
      role: "Customer",
      content:
        "My family loved the fresh fruits and organic vegetables! The packaging was excellent, and the produce was fresh and healthy. Great quality at affordable prices.",
      rating: 5,
      image: "/images/Female.jpeg",
    },
    {
      id: 9,
      name: "Ravi Verma",
      role: "Customer",
      content:
        "Ordered raw honey and spices, and they were incredible! You can tell that these products are fresh and from trusted, sustainable sources. Highly recommend!",
      rating: 5,
      image: "/images/Guy.jpeg",
    },
    {
      id: 10,
      name: "Neha Singh",
      role: "Customer",
      content:
        "The freshness of the vegetables was unmatched. They were crisp and flavorful, and I could tell they were straight from the farm. I'm definitely a regular now!",
      rating: 5,
      image: "/images/Female.jpeg",
    },
  ]);

  // State management for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  // Responsive slides configuration - 1 for mobile, 2 for tablets, 3 for desktop
  const getSlidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return 1; // Show 1 card on mobile
      } else if (window.innerWidth < 1024) {
        return 2; // Show 2 cards on tablet
      } else {
        return 3; // Show 3 cards on desktop
      }
    }
    return 3; // Default for server-side rendering
  };

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [totalSlides, setTotalSlides] = useState(
    Math.ceil(testimonials.length / slidesToShow)
  );

  // Update slidesToShow on window resize
  useEffect(() => {
    const handleResize = () => {
      const newSlidesToShow = getSlidesToShow();
      setSlidesToShow(newSlidesToShow);
      setTotalSlides(Math.ceil(testimonials.length / newSlidesToShow));
      // Ensure current slide is still valid
      if (currentSlide >= Math.ceil(testimonials.length / newSlidesToShow)) {
        setCurrentSlide(0);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [testimonials.length, currentSlide]);

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % totalSlides);
  };

  // Navigate to specific slide
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Auto rotation for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#fdf7ee] min-h-screen">
      {/* Hero section */}
      <div className="bg-[#0f440b] text-green-50 py-7 md:py-15">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">
              What Our Clients Say
            </h1>
            <p className=" text-base md:text-lg text-green-50 mb-8">
              Don't just take our word for it. See what our satisfied customers
              have to say about their experience.
            </p>
            <div className="flex justify-center items-center space-x-2">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-green-50 font-medium">
                Trusted by hundreds of clients worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials carousel */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative px-4 md:px-12">
          {/* Carousel container */}
          <div className="overflow-hidden">
            {/* Slides container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Group testimonials into slides */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex flex-wrap">
                  {testimonials
                    .slice(
                      slideIndex * slidesToShow,
                      (slideIndex + 1) * slidesToShow
                    )
                    .map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="w-full sm:w-1/2 lg:w-1/3 p-4"
                      >
                        <div className="bg-white rounded-lg shadow-lg p-6 h-full transition-all duration-300 hover:shadow-xl hover:translate-y-1">
                          <div className="flex items-start mb-4">
                            <div className="mr-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {testimonial.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {testimonial.role}
                              </p>
                              <div className="mt-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                          </div>
                          <blockquote className="italic text-gray-700 border-l-4 border-[#0f440b] pl-4 py-1">
                            "{testimonial.content}"
                          </blockquote>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - only show on larger screens */}
          <div className="hidden sm:block">
            <button
              onClick={() =>
                goToSlide((currentSlide - 1 + totalSlides) % totalSlides)
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-[#0f440b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-[#0f440b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-[#0f440b] w-6" : "bg-gray-300 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Ready to join our satisfied customers?
          </h2>
          <button className="bg-[#176112] hover:bg-[#176112ac] cursor-pointer text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
