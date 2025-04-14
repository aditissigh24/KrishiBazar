import React, { useState, useEffect } from "react";

// TypeScript interface for testimonial data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialPage: React.FC = () => {
  // Sample testimonial data
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "Innovate Inc.",
      content:
        "This product transformed our business operations. The interface is intuitive and the customer support is exceptional. We've seen a 40% increase in productivity since implementation.",
      rating: 5,
      image: "/api/placeholder/64/64",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "TechForward",
      content:
        "We evaluated several solutions before choosing this one. The robust feature set and seamless integration capabilities made it stand out from competitors. Highly recommended for growing teams.",
      rating: 5,
      image: "/api/placeholder/64/64",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      company: "Artisan Crafts",
      content:
        "As a small business, finding affordable solutions that don't compromise on quality is challenging. This platform delivers exceptional value and has helped me streamline operations significantly.",
      rating: 4,
      image: "/api/placeholder/64/64",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Operations Manager",
      company: "Global Logistics",
      content:
        "The scalability of this solution is impressive. We started with a small implementation and have expanded across our entire organization. The transition was smooth thanks to the excellent onboarding process.",
      rating: 5,
      image: "/api/placeholder/64/64",
    },
    {
      id: 5,
      name: "Olivia Taylor",
      role: "Creative Director",
      company: "Design Collective",
      content:
        "The attention to detail and aesthetic considerations in this product show that the team understands both functionality and user experience. It's refreshing to use software that doesn't sacrifice beauty for utility.",
      rating: 4,
      image: "/api/placeholder/64/64",
    },
    {
      id: 6,
      name: "James Parker",
      role: "Financial Analyst",
      company: "Invest Partners",
      content:
        "The reporting features have revolutionized how we analyze data. What used to take days now takes hours, and the insights are more valuable than ever before.",
      rating: 5,
      image: "/api/placeholder/64/64",
    },
  ]);

  // State management for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % totalSlides);
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1
    );
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
  }, []);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-amber-400" : "text-gray-300"
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
      <div className="bg-[#0f440b] text-green-50 py-15">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h1>
            <p className="text-lg text-green-50 mb-8">
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
        <div className="relative px-12">
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
                        className="w-full md:w-1/2 lg:w-1/3 p-4"
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
                                {testimonial.role}, {testimonial.company}
                              </p>
                              <div className="mt-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                          </div>
                          <blockquote className="italic text-gray-700 border-l-4 border-indigo-500 pl-4 py-1">
                            "{testimonial.content}"
                          </blockquote>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center z-10 text-gray-800 hover:bg-gray-100"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center z-10 text-gray-800 hover:bg-gray-100"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-indigo-600 w-6" : "bg-gray-300 w-3"
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
