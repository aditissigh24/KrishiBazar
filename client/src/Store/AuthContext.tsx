import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useCart } from "./CartStore";
// Define the base URL for your API
const API_BASE_URL = "https://krishibazar-sgjm.onrender.com";

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();
  // Configure axios defaults for all requests
  axios.defaults.withCredentials = true;

  // Check for authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to your auth status endpoint
        const response = await axios.get(`${API_BASE_URL}/user/status`);

        if (response.data.authenticated && response.data.user) {
          setCurrentUser(response.data.user);
          // Still store the user in localStorage for app state, but not the token
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          setCurrentUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Auth status check error:", err);
        // If the request fails, assume user is not authenticated
        setCurrentUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    // Fall back to stored user if API is unreachable
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
      }
    }

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login`,
        { email, password },
        { withCredentials: true } // Ensure cookies are received
      );

      // The token is now stored in an HTTP-only cookie by the server
      // We just need to store the user info in state
      setCurrentUser(response.data.user);

      // Store user data in localStorage for app state persistence
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("An error occurred during login");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        { email, password, name },
        { withCredentials: true } // Ensure cookies are received
      );

      // The token is now stored in an HTTP-only cookie by the server
      // We just need to store the user info in state
      setCurrentUser(response.data.user);

      // Store user data in localStorage for app state persistence
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError("An error occurred during signup");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);

    try {
      // Make API call to invalidate session and clear cookies on server
      await axios.get(`${API_BASE_URL}/user/logout`, { withCredentials: true });
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      // Even if server logout fails, clear local state
      setCurrentUser(null);

      clearCart();
      localStorage.removeItem("user");
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
