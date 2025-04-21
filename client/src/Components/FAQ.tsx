import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What does the term Organic Food and Organic Farming?",
      answer: `Organic food' refers to produce that has been grown without the use of artificial fertilizers, pesticides and other chemicals or 
      genetically modified organisms.Organic farming is the form of agriculture that relies on techniques such as crop rotation, green manure,
       compost and biological pest control. This is a method of farming that works at grass root level preserving the reproductive and 
       regenerative capacity of the soil, good plant nutrition, and sound soil management, produces nutritious food rich in vitality which has 
       resistance to diseases. Organic farming practices promote biodiversity, enhance ecological balance and keep our earth in good health.`,
    },
    {
      question: "What are the benefits of Organic Food?",
      answer: `There is no doubt that eating organic food cuts the chemical and toxic load that you take into your body, as it comes to you 
      without chemicals, growth hormones, additives, colourings and preservatives. Organic food is also usually fresher because, being 
      Chemical-free and preservative-free, it is processed in smaller lots and has to be sent to the shops faster than conventional 
      non-organic food.Scientists now know what we eaters have known all along: organic food often tastes better. It makes sense that 
      strawberries, Watermelon taste yummier when raised in harmony with nature, but researchers at Washington State University just 
      proved this as fact in lab taste trials where the organic berries were consistently judged as sweeter. Plus, new research verifies 
      that some organic produce is often lower in nitrates and higher in antioxidants than conventional food.`,
    },
    {
      question: "What are the environmental benefits of Organic agriculture?",
      answer: `Sustainability over the long term. Many changes observed in the environment are long term, occurring slowly over time. 
      Organic agriculture considers the medium- and long-term effect of agricultural interventions on the agro-ecosystem. It aims to 
      produce food while establishing an ecological balance to prevent soil fertility or pest problems. Organic agriculture takes a 
      proactive approach as opposed to treating problems after they emerge.Soil. Soil building practices such as crop rotations, 
      inter-cropping, symbiotic associations, cover crops, organic fertilizers and minimum tillage are central to organic practices. 
      These encourage soil fauna and flora, improving soil formation and structure and creating more stable systems.Water. In many 
      agriculture areas, pollution of groundwater courses with synthetic fertilizers and pesticides is a major problem. As the use of 
      these is prohibited in organic agriculture, they are replaced by organic fertilizers (e.g. compost, animal manure, green manure)
       and through the use of greater biodiversity (in terms of species cultivated and permanent vegetation), enhancing soil structure 
       and water infiltration.Air and climate change. Organic agriculture reduces non-renewable energy use by decreasing agrochemical 
       needs (these require high quantities of fossil fuel to be produced).Biodiversity. Organic farmers are both custodians and users of 
       biodiversity at all levels. At the gene level, traditional and adapted seeds and breeds are preferred for their greater resistance 
       to diseases and their resilience to climatic stress.`,
    },
    {
      question: "Does Organic food taste better?",
      answer: `Taste is definitely an individual matter, but chefs across the nation are choosing organic food to prepare because they believe 
      it has superior taste and quality.An increasing number of consumers are also of the opinion that organic food tastes better. Because organic 
      food is grown in well-balanced soil, it makes sense that these healthy plants have a great taste. Try organic food for yourself and see what
       you think!`,
    },
    {
      question: "How shall I trust it is really organic?",
      answer: `Look for certification logo on the product. for example Eco Cert, and NPOP's India Organic logo.The Government of India has 
      implemented the National Programme for Organic Production (NPOP). The national programme involves the accreditation programme for 
      certification bodies, norms for organic production, promotion of organic farming etc. In India, there are a handful of certifying 
      agencies accredited by NPOP. Farmers and producers must register with one of these agencies, who will in turn verify whether NPOP 
      standards have been met.Live Organic sources Organic products from farmers which are certified as per NPOP standards.`,
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-center text-[#0f440b] mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to the most common questions about our services
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200  last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f440b] focus:ring-inset"
              >
                <span className="text-lg font-medium text-gray-900 text-left">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-indigo-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link to="/contact">
            <button className="hover:bg-[#176112ac] mt-2 cursor-pointer bg-[#0e301fe9] text-white px-6 py-3 rounded-md font-medium  transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
