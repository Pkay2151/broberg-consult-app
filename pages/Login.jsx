import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
// import Navbar from "../src/components/Nav";
import { authAPI } from "../util/api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.login(data);
      // Success toast is handled in the API
      setTimeout(() => {
        window.location.href = "/admin";
      }, 2000);
    } catch (error) {
      // Error toast is handled in the API
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <motion.div
        className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-around bg-[url('./assets/bg2.png')] bg-cover bg-center bg-no-repeat px-2 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center w-full md:w-auto mb-8 md:mb-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center text-4xl w-full md:w-auto">
            <motion.p
              className="font-bold text-blue-500"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              BROBERG
            </motion.p>
            <motion.span
              className="text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              CONSULT LTD
            </motion.span>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-auto flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-4 sm:p-8 w-500 max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h2
              className="text-3xl font-bold text-blue-700 mb-2 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 mb-6 text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              Login to your account
            </motion.p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">Email is required</span>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
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
                  Password is required
                </span>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-gray-700">
                <a href="/register">Don't have an account? Register</a>
              </p>
              <p className="text-center text-gray-700">
                <a href="/forgot-password">Forgot your password?</a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
