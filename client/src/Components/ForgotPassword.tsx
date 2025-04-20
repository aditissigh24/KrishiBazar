import { useState, FormEvent, ChangeEvent } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
// Component for the forgot password request form
export function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://krishibazar-sgjm.onrender.com/user/password/forgot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setEmailSent(true);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="py-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0f440b]">
            {emailSent ? "Check your email" : "Reset your password"}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {emailSent
              ? `We've sent a password reset token to ${email}`
              : "Enter your email address and we'll send you a reset token"}
          </p>
        </div>

        {/* Error message display */}
        {formError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError}
          </div>
        )}

        {emailSent ? (
          <div className="mt-8 space-y-6">
            <p className="text-center text-gray-600">
              Please check your inbox and copy the reset token provided in the
              email.
            </p>
            <div className="space-y-4">
              <button
                onClick={goToResetPassword}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#176112] hover:bg-[#176112ac] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue to reset password
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to login
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Email address"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Back to login link */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="flex items-center text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to login
              </button>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-400" : "bg-[#176112] hover:bg-[#176112ac]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? "Sending..." : "Send reset token"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Component for the reset password form
export function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (!formData.token.trim()) {
      setFormError("Reset token is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://krishibazar-sgjm.onrender.com/user/password/reset/${formData.token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);

      // Redirect to login after successful reset
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to reset password"
      );
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0f440b]">
            {success ? "Password Reset Successful" : "Reset Your Password"}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {success
              ? "Your password has been reset successfully. You will be redirected to the login page."
              : "Enter the reset token from your email and choose a new password"}
          </p>
        </div>

        {/* Error message display */}
        {formError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Password reset successful! Redirecting to login...
          </div>
        )}

        {!success && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md  space-y-4">
              {/* Reset Token */}
              <div>
                <label
                  htmlFor="token"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reset Token
                </label>
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Paste the reset token from your email"
                  value={formData.token}
                  onChange={handleChange}
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to login link */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="flex items-center text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to login
              </button>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-400" : "bg-[#176112] hover:bg-[#176112ac]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
