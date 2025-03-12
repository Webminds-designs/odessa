"use client"; // for Next.js 13 app router if you need client-side form handling

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import Link from "next/link";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex w-full min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: 'url("/images/login-background.png")' }}
    >
      {/* Left side: Visible only on laptop (lg) and above */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Optionally add content or leave empty */}
      </div>

      {/* Right side: Form container */}
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <div className="flex flex-col items-center justify-center w-11/12 max-w-sm md:max-w-md lg:max-w-[500px] h-auto bg-[#252525] rounded-2xl p-8 md:p-11 shadow-2xl">
          {/* Title */}
          <div className="font-aeonikregular text-2xl mb-4">Welcome Back!</div>
          <div className="text-center font-aeonikregular text-gray-400 mb-6">
            Log in to explore stunning Diamond, manage your orders, and discover timeless beauty
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                className="bg-white text-black rounded-md px-4 py-2 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  id="password"
                  className="bg-white text-black rounded-md px-4 py-2 outline-none w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sign In button */}
          <div className="cursor-pointer mt-6 w-full bg-brown text-center rounded-lg p-2">
            Sign In
          </div>

          {/* Sign up link */}
          <div className="mt-5 text-center text-gray-300">
            Don&apos;t you have an account ?{" "}
            <Link href="/signup">
              <span className="font-bold"> Sign Up</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-3 text-gray-400">or continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Google button */}
          <div className="w-[150px] h-[50px] bg-[#202020] border border-gray-600 flex justify-center items-center rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <FcGoogle className="text-xl" />
              Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}