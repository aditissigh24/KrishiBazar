import { useEffect, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  orderId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

const RazorpayCheckout = ({
  amount,
  onSuccess,
  onFailure,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
}: RazorpayCheckoutProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setLoading(false);
      setScriptLoaded(true);
      return;
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setLoading(false);
      setScriptLoaded(true);
    };
    script.onerror = () => {
      setLoading(false);
      setError("Failed to load Razorpay checkout. Please try again later.");
    };
    document.body.appendChild(script);

    return () => {
      // Only remove the script if we added it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      let orderData;

      // Fetch Razorpay key from backend
      const keyResponse = await axios.get(
        "http://localhost:5000/payment/get-key",
        { withCredentials: true }
      );
      const key = keyResponse.data.key;

      // If orderId is provided, use it. Otherwise, create a new order
      if (orderId) {
        orderData = { id: orderId };
      } else {
        // Create order on server - sending amount in paisa
        const orderResponse = await axios.post(
          "http://localhost:5000/payment/create-order",
          { amount: amount * 100, currency: "INR" },
          { withCredentials: true }
        );
        orderData = orderResponse.data.order;
      }

      const options = {
        key,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Krishi-Bazar",
        description: "Purchase of organic products",
        image: "/images/KB.jpg",
        order_id: orderData.id,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes: {
          address: "Krishi-Bazar Corporate Office",
        },
        theme: {
          color: "#176112",
        },
        handler: function (response: any) {
          // Verify payment signature on server
          verifyPayment(response);
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        onFailure(response.error);
      });
      razorpay.open();

      setLoading(false);
    } catch (error) {
      console.error("Payment initialization failed:", error);
      setLoading(false);
      setError("Failed to initialize payment. Please try again.");
      onFailure(error);
    }
  };

  const verifyPayment = async (response: any) => {
    try {
      // Verify payment with backend
      await axios.post(
        "http://localhost:5000/payment/verify",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        { withCredentials: true }
      );

      // If verification successful, call the onSuccess callback
      onSuccess(response);
    } catch (error) {
      console.error("Payment verification failed:", error);
      onFailure(error);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className={`w-full bg-[#176112] hover:bg-[#176112ac] text-white py-3 rounded-md font-medium ${
        loading || !scriptLoaded ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Loading..." : "Pay with Razorpay"}
    </button>
  );
};

export default RazorpayCheckout;
