import { useState } from "react";
import { useCart } from "../Store/CartStore";
import { Link, useNavigate } from "react-router-dom";
import RazorpayCheckout from "../Components/RazorpayCheckout";
import {
    ChevronLeft,
    CreditCard,
    Building,
    Truck,
    CheckCircle,
} from "lucide-react";
import axios from "axios";

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [showRazorpay, setShowRazorpay] = useState(false);
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    // Form state
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        country: "India",
        state: "",
        postalCode: "",
        phone: "",
    });

    // Payment method state
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    // Shipping cost calculation
    const shippingPrice = 30;
    const taxRate = 0.05; // 5%
    const itemsPrice = getCartTotal();
    const taxPrice = Math.round(itemsPrice * taxRate);
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            if (paymentMethod === "UPI" || paymentMethod === "credit-card") {
                // For online payment methods, save order details and trigger Razorpay
                setShowRazorpay(true);
                setIsSubmitting(false);
            } else {
                // For COD, proceed with regular order submission
                await submitOrder();
            }
        } catch (err: any) {
            console.error("Error in checkout:", err);
            setError(
                err.response?.data?.message ||
                    "There was a problem processing your request. Please try again."
            );
            setIsSubmitting(false);
        }
    };
    const submitOrder = async (paymentDetails?: any) => {
        // Format the order items as required by the API
        const orderItems = cart.map((item) => ({
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        // Create the shipping info object
        const shippingInfo = {
            address:
                formData.address +
                (formData.apartment ? `, ${formData.apartment}` : ""),
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            phone: formData.phone,
        };
        const requestBody = {
            orderItems,
            shippingInfo,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo: paymentDetails,
        };

        // Make the API call
        const response = await axios.post(
            "http://localhost:5000/order/createOrder",
            requestBody,
            { withCredentials: true }
        );

        // Handle successful order
        console.log("Order placed successfully:", response.data);
        setOrderId(response.data.order.id);
        console.log(orderId);
        clearCart();

        // Show success animation
        setOrderSuccess(true);

        // Optionally navigate back to home page after a delay
        setTimeout(() => {
            navigate("/");
        }, 5000);
    };
    const handlePaymentSuccess = async (response: any) => {
        try {
            // Submit the order with payment details
            await submitOrder({
                id: response.razorpay_payment_id,
                status: "Completed",
            });
        } catch (error) {
            console.error("Error after payment success:", error);
            setError(
                "Payment was successful, but there was an issue creating your order."
            );
        }
    };
    const handlePaymentFailure = (error: any) => {
        console.error("Payment failed:", error);
        setError(
            "Payment failed. Please try again or choose another payment method."
        );
        setIsSubmitting(false);
        setShowRazorpay(false);
    };
    // Success animation overlay
    if (orderSuccess) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
                <div className="text-center p-8 max-w-md mx-auto">
                    <div className="mb-6 flex justify-center">
                        <CheckCircle
                            size={80}
                            className="text-green-600 animate-bounce"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        Order Placed Successfully!
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Thank you for your purchase. Your order has been
                        received and is being processed.
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                        <div
                            className="bg-green-600 h-full animate-pulse"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                        You will be redirected to the home page in a few
                        seconds...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    to="/cart"
                    className="flex items-center text-[#0f440b] hover:text-gray-500"
                >
                    <ChevronLeft size={20} />
                    <span className="ml-1">Return to cart</span>
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side - Customer Information & Payment */}
                <div className="lg:w-2/3">
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Contact Information
                            </h2>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="apartment"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Apartment, suite, etc. (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="apartment"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    >
                                        <option value="India">India</option>
                                        <option value="United States">
                                            United States
                                        </option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">
                                            United Kingdom
                                        </option>
                                        <option value="Australia">
                                            Australia
                                        </option>
                                        {/* Add more countries as needed */}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        State / Province
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        ZIP / Postal code
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit-card"
                                        checked={
                                            paymentMethod === "credit-card"
                                        }
                                        onChange={() =>
                                            setPaymentMethod("credit-card")
                                        }
                                        className="mr-3"
                                    />
                                    <CreditCard
                                        size={20}
                                        className="mr-2 text-gray-600"
                                    />
                                    <span>Credit / Debit Card</span>
                                </label>

                                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="UPI"
                                        checked={paymentMethod === "UPI"}
                                        onChange={() => setPaymentMethod("UPI")}
                                        className="mr-3"
                                    />
                                    <Building
                                        size={20}
                                        className="mr-2 text-gray-600"
                                    />
                                    <span>UPI</span>
                                </label>

                                <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={() => setPaymentMethod("COD")}
                                        className="mr-3"
                                    />
                                    <Truck
                                        size={20}
                                        className="mr-2 text-gray-600"
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>

                            {paymentMethod === "credit-card" && (
                                <div className="mt-4 p-4 border rounded-md">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="cardNumber"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="expiryDate"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                placeholder="MM/YY"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="cvv"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                placeholder="123"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {paymentMethod === "UPI" && (
                                <div className="mt-4 p-4 border rounded-md">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="upiId"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            UPI Id
                                        </label>
                                        <input
                                            type="text"
                                            id="upiId"
                                            placeholder="Enter UPI Id here"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            )}
                            {showRazorpay && (
                                <div className="mt-4">
                                    <RazorpayCheckout
                                        amount={totalPrice}
                                        onSuccess={handlePaymentSuccess}
                                        onFailure={handlePaymentFailure}
                                        customerName={`${formData.firstName} ${formData.lastName}`}
                                        customerEmail={formData.email}
                                        customerPhone={formData.phone}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Place Order Button (for smaller screens) */}
                        <div className="lg:hidden mb-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#176112] hover:bg-[#176112ac] text-white py-3 rounded-md font-medium ${
                                    isSubmitting
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side - Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="max-h-80 overflow-y-auto mb-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center py-3 border-b"
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                item.image ||
                                                "/api/placeholder/60/60"
                                            }
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <span className="absolute -top-2 -right-2 bg-[#176112] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="ml-4 flex-grow">
                                        <h3 className="font-medium">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <div className="font-medium">
                                        ₹
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 py-3 border-b">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (5%)</span>
                                <span>₹{taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shippingPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between py-3 font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Place Order Button (for larger screens) */}
                        <div className="hidden lg:block mt-6">
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className={`w-full bg-[#176112] hover:bg-[#176112ac] text-white py-3 rounded-md font-medium ${
                                    isSubmitting
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
