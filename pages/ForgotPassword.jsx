import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authAPI } from "../util/api";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.forgotPassword(data.email);
      reset(); // Clear form on success
      // Success toast is handled in the API
    } catch (error) {
      // Error toast is handled in the API
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              Forgot Password
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Enter your email to reset your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
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
                    href="/register"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Don't have an account? Register
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

export default ForgotPassword;
