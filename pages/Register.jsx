import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../src/components/Nav";
import { Link } from "react-router-dom";

import { authAPI } from "../util/api";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.register(data);
      reset();
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Registration failed");
      console.error("Registration error:", error);

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
              Welcome
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Register to continue
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">Name is required</span>
              )}
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
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  placeholder="Secret Key"
                  {...register("secretKey", { required: true })}
                  className="w-full px-4 py-2 rounded-full bg-blue-200 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600"
                  onClick={() => setShowSecret((v) => !v)}
                  tabIndex={-1}
                >
                  {showSecret ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.secretKey && (
                <span className="text-red-600 text-sm">
                  Secret Key is required
                </span>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold transition"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              {message && (
                <div
                  className={`text-center mt-2 ${
                    message.includes("successful")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}
              <p className="text-center text-gray-700">
                <Link to ="/login">Already have an account?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
