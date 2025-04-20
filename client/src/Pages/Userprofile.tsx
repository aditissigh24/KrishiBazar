import { useState, useEffect } from "react";
import { User, Settings, Package, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/AuthContext";
import Loader from "../Components/Loader";
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
  id: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
}
interface OrderCardProps {
  order: Order;
  formatDate: (dateString: string) => string;
  getTotalItems: (orderItems: OrderItem[]) => number;
}

const API_BASE_URL = "https://krishibazar-sgjm.onrender.com";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch user profile data and order history
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Configure axios to include credentials (cookies)
        // This will ensure the cookies are sent with the request
        const axiosConfig = {
          withCredentials: true,
        };

        // Fetch user profile data
        const userResponse = await axios.get(
          `${API_BASE_URL}/user/me`,
          axiosConfig
        );

        // Fetch order history
        const ordersResponse = await axios.get(
          `${API_BASE_URL}/order/viewOrders`,
          axiosConfig
        );

        setUserData(userResponse.data.user);

        // Update to match the API response structure
        if (ordersResponse.data.success && ordersResponse.data.orders) {
          setOrderHistory(ordersResponse.data.orders);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again later.");

        // Handle unauthorized errors (e.g., expired token)
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser, navigate, logout]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if there's an error with the API call, we still want to clear local state
      navigate("/auth");
    }
  };

  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get total number of items in an order
  const getTotalItems = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };
  const OrderCard: React.FC<OrderCardProps> = ({
    order,
    formatDate,
    getTotalItems,
  }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
      <div className="border border-[#0f440b] rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h3 className="font-medium">
              Order #{order.id.substring(order.id.length - 8)}
            </h3>
            <p className="text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold">₹{order.totalPrice.toFixed(2)}</div>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t">
          <div className="text-sm mb-1">
            Shipping to: {order.shippingInfo.city}, {order.shippingInfo.state}
          </div>
          <div className="text-sm mb-1">Payment: {order.paymentMethod}</div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm">
              {getTotalItems(order.orderItems)} items
            </div>
            <button
              className="text-[#1e6719] font-semibold cursor-pointer hover:text-[#0f440b80] text-sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Details" : "View Details"}
            </button>
          </div>

          {/* Collapsible Order Items */}
          {showDetails && (
            <div className="mt-3 pt-2 border-t">
              <p className="text-sm font-medium mb-2">Order Items:</p>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>
                      {item.name} : {item.quantity} quantity
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };
  // Show loading state
  if (loading) {
    return <Loader />;
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            className="text-red-700 font-medium underline mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold text-center text-[#0f440b] mb-12">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 md:self-start bg-white rounded-lg shadow p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center w-full p-3 rounded-md text-left ${
                    activeTab === "profile"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Personal Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center w-full p-3 rounded-md text-left ${
                    activeTab === "orders"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full p-3 rounded-md text-left ${
                    activeTab === "settings"
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
              </li>
              <li className="pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 rounded-md text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === "profile" && userData && (
            <div>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <div className="text-gray-800">{userData.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <div className="text-gray-800">{userData.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <div className="text-gray-800">{userData.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Address
                  </label>
                  <div className="text-gray-800">{userData.address}</div>
                </div>
              </div>
              <button className="hover:bg-[#176112ac] mt-8 cursor-pointer bg-[#0e301fe9] text-white px-6 py-3 rounded-md font-medium  transition-colors">
                Edit Information
              </button>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">
                Order History
              </h2>
              {orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {orderHistory
                    .slice()
                    .reverse()
                    .map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        formatDate={formatDate}
                        getTotalItems={getTotalItems}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  You haven't placed any orders yet.
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">
                Account Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Password</h3>
                  <button
                    onClick={navigateToForgotPassword}
                    className="text-[#0e301fe9] hover:text-[#176112ac]"
                  >
                    Change Password
                  </button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2">
                      Receive email notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
