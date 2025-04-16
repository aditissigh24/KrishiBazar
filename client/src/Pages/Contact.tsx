import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import emailjs from "@emailjs/browser";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setSubmitted(true);

    try {
      const response = await emailjs.send(
        "service_ylbmmag", // Replace with your actual service ID
        "template_6xt9dyp", // Replace with your actual template ID
        { message: formData.message }, // Matches the variable in your EmailJS template
        "lPBxhReP_-AsSiDI2" // Replace with your public key
      );

      if (response.status === 200) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }, 800);
      } else {
        alert("Failed to send wish. Try again later.");
      }
    } catch (error) {
      console.error("Error sending wish:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitted(false);
    }
    // Simulate sending the wish
  };
  return (
    <div className="bg-[#fdf7ee] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#0f440b] mb-12">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Left Column - Contact Information */}
          <div className="bg-[#0e301fe9] text-white p-8 md:w-2/5">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">About Us</h3>
              <p className="text-gray-300">
                We are a leading marketplace who curate and deliver the freshest
                organic produce, artisanal foods, and natural products.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <p className="text-gray-300">team.krishibazar@gmail.com</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Phone</h3>
              <p className="text-gray-300">+91-9873937528</p>
              <p className="text-gray-300">(7 am to 6 pm, 7 days a week)</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Headquarters</h3>
              <p className="text-gray-300">Krishi-Bazar</p>
              <p className="text-gray-300">
                10, Vatika City Market, Sector 49,
              </p>
              <p className="text-gray-300">Sohna-Gurgaon Road,</p>
              <p className="text-gray-300">Gurgaon: 122018, INDIA</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#facebook"
                  className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center hover:translate-y-1 transition-transform"
                >
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a
                  href="#twitter"
                  className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center hover:translate-y-1 transition-transform"
                >
                  <BsTwitterX className="h-6 w-6" />
                </a>

                <a
                  href="#instagram"
                  className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center hover:translate-y-1 transition-transform"
                >
                  <RiInstagramFill className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-8 md:w-3/5">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Us A Message
            </h2>

            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
                Thank you for your message! We will get back to you soon.
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Your phone number"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 h-32 resize-y"
                  placeholder="What would you like to tell us?"
                  required
                />
              </div>

              <button
                type="submit"
                className="hover:bg-[#176112ac] cursor-pointer bg-[#0e301fe9] text-white px-6 py-3 rounded-md font-medium  transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
