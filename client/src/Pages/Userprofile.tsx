import { useState, useEffect } from "react";
import { User, Settings, Package, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/AuthContext";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

const API_BASE_URL = "http://localhost:5000";

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
        // const ordersResponse = await axios.get(
        //   `${API_BASE_URL}/api/orders`,
        //   axiosConfig
        // );

        setUserData(userResponse.data.user);
        // setOrderHistory(ordersResponse.data);
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

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 mt-8 flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading profile data...</div>
      </div>
    );
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
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
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
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
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            Placed on {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${order.total.toFixed(2)}
                          </div>
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm">{order.items} items</div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
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
                  <button className="text-blue-600 hover:text-blue-800">
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
                <div className="pt-4">
                  <h3 className="text-red-600 font-medium mb-2">Danger Zone</h3>
                  <button className="text-red-600 hover:text-red-800">
                    Delete Account
                  </button>
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
