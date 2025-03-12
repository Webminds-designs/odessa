"use client";
import React, { useState, FormEvent } from "react";

interface FormDataType {
  firstName: string;
  lastName: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  postalCode: string;
}

interface ErrorType {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  emailAddress?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export default function BillPage() {

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    emailAddress: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});

  // Update form data with typed event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //  Validation function returns an ErrorType
  const validate = (): ErrorType => {
    const newErrors: ErrorType = {};

    // First & Last Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    // Contact Number
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    } else {
      const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
      if (!phoneRegex.test(formData.contactNumber.trim())) {
        newErrors.contactNumber = "Contact Number is invalid. Format: +123456789";
      }
    }

    // Email Address
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Email Address is invalid";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Postal Code
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else {
      const postalCodeRegex = /^\d+$/;
      if (!postalCodeRegex.test(formData.postalCode.trim())) {
        newErrors.postalCode = "Postal Code must be a number";
      }
    }

    return newErrors;
  };

  //  Handle form submission with typed FormEvent
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="min-h-screen text-white font-aeonikregular py-8 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-20">
        {/* Left Column - Billing Form */}
        <div>
          <h1 className="text-2xl mb-10">Billing</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <label htmlFor="firstName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Emma"
                  className="w-full rounded-md px-4 py-2 text-white/50 bg-[#292929]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Richardson"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Number & Email */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <label htmlFor="contactNumber" className="block mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+44 7700 90123"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="emailAddress" className="block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="emma@gmail.com"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="10/06, 7th Lane, London."
                className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* City & Postal Code */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <label htmlFor="city" className="block mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="London"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="postalCode" className="block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="00100"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <span className="block mb-2 font-medium">Pay With:</span>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  defaultChecked
                  className="mr-2 accent-brown"
                />
                <label htmlFor="card">PayPal</label>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-brown text-white py-2 px-4 rounded-md"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] bg-white/20" />

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-[#292929] px-8 py-4 rounded-md">
            <h2 className="text-xl mb-4 text-center pb-6">Order summary</h2>
            <div className="mb-2 flex justify-between">
              <span>Item subtotal</span>
              <span>1,750.00 $</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Shipping fee</span>
              <span>0 $</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Tax</span>
              <span>0 $</span>
            </div>
            <div className="flex justify-between text-lg pb-10">
              <span>Total</span>
              <span>1,750.00 $</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
