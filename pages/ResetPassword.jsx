import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../src/components/Nav";
import { authAPI } from "../util/api";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch password field for confirmation validation
  const password = watch("password");

  useEffect(() => {
    // Get token from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    console.log(resetToken);
    localStorage.setItem("resetToken", resetToken);
    if (resetToken) {
      setToken(resetToken);
    } else {
      // Redirect to forgot password if no token
      window.location.href = "/forgot-password";
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form data:", data); // Debug form data
    console.log("Token:", token); // Debug token

    // Try different field name variations the backend might expect
    const resetData = {
      token: token,
      password: data.password,
      newPassword: data.password, // Include both just in case
      confirmPassword: data.confirmPassword,
      confirmNewPassword: data.confirmPassword, // Alternative field name
    };

    console.log("Sending to API:", resetData); // Debug API data

    try {
      await authAPI.resetPassword(resetData);
      reset(); // Clear form on success
      // Success toast is handled in the API
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      // Error toast is handled in the API
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-around bg-[url('./assets/bg2.png')] bg-cover bg-center bg-no-repeat px-2 py-6">
        <div className="flex flex-col items-center w-full md:w-auto mb-8 md:mb-0">
          <div className="text-center text-4xl w-full md:w-auto">
            <p className="font-bold text-blue-500">BROBERG</p>
            <span className="text-white">CONSULT LTD</span>
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
              Reset Password
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Enter your new password
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold transition"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div className="text-center space-y-2">
                <p className="text-gray-700">
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Back to Login
                  </a>
                </p>
                <p className="text-gray-700">
                  <a
                    href="/forgot-password"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Request new reset link
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
