"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
    setServerError("");
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch("/api/users/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("User created successfully. Redirecting to login...", {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });

          if (typeof window !== 'undefined' && window.localStorage) {

            localStorage?.setItem('user', JSON.stringify({
              email: data.user.email,
              id: data.user._id,
              role: data.user.role || 'user'
            }));
            
          }
          
          
          setServerSuccess("User created successfully. Redirecting to login...");
          
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          toast.error(data.error || "Failed to create user", {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          setServerError(data.error || "Failed to create user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("An unexpected error occurred.", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setServerError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="flex w-full min-h-screen bg-no-repeat bg-center bg-cover bg-primary text-white"
      style={{ backgroundImage: 'url("/images/login-background.png")' }}
    >
      <div className="hidden lg:block lg:w-1/2 h-[900px] bg-center bg-cover relative"></div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-auto lg:h-[900px]">
        <div className="flex flex-col items-center justify-center w-11/12 max-w-sm md:max-w-md lg:max-w-[500px] h-auto bg-[#252525] rounded-2xl p-8 md:p-11 shadow-2xl">
          <div className="font-aeonikregular text-2xl mb-4">
            Your Journey to Elegance Here!
          </div>
          <div className="text-center font-aeonikregular text-gray-400 mb-6">
            Sign up to explore stunning Diamond, manage your orders, and discover timeless beauty
          </div>

          {serverError && (
            <div className="mb-4 text-red-500 text-center">{serverError}</div>
          )}
          {serverSuccess && (
            <div className="mb-4 text-green-500 text-center">{serverSuccess}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  className="bg-white text-black rounded-md px-4 py-2 outline-none w-full"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
              )}
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
                  value={formValues.password}
                  onChange={handleChange}
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
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  id="confirmPassword"
                  className="bg-white text-black rounded-md px-4 py-2 outline-none w-full"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
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
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer mt-6 w-full bg-brown text-center rounded-lg p-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 text-center text-gray-300">
            Already have an account?{" "}
            <Link href="/login">
              <span className="font-bold"> Sign In</span>
            </Link>
          </div>

          {/* <div className="flex items-center w-full my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-3 text-gray-400">or continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div> */}

          {/* <div className="w-[150px] h-[50px] bg-[#202020] border border-gray-600 flex justify-center items-center rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <FcGoogle className="text-xl" /> Google
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}