import { useState, FormEvent, ChangeEvent } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

type LoginFormState = {
  email: string;
  password: string;
};

type SignupFormState = {
  name: string;
  email: string;
  password: string;
};

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState<SignupFormState>({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", loginForm);
    alert(`Login attempt with: ${loginForm.email}`);
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup submitted:", signupForm);
    alert(`Signup attempt for: ${signupForm.name} (${signupForm.email})`);
  };

  const updateLoginForm = (field: keyof LoginFormState, value: string) => {
    setLoginForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSignupForm = (field: keyof SignupFormState, value: string) => {
    setSignupForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="py-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full  bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0f440b]">
            {isLogin ? "Log in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {isLogin ? "New Customer? " : "Already have an account? "}
            <button
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Email address"
                    value={loginForm.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateLoginForm("email", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateLoginForm("password", e.target.value)
                    }
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

            {/* Remember and Forgot */}
            <div className="flex items-center justify-between">
              <div className="text-base">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#176112ac] cursor-pointer bg-[#176112] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        ) : (
          // Signup Form
          <form className="mt-8 space-y-6" onSubmit={handleSignupSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="signup-name" className="sr-only">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Full name"
                    value={signupForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateSignupForm("name", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Email address"
                    value={signupForm.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateSignupForm("email", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateSignupForm("password", e.target.value)
                    }
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#176112ac] cursor-pointer bg-[#176112] "
              >
                Sign up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
