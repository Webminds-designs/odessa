"use client";

import React from "react";

export default function BillPage() {
  return (
    <div className="min-h-screen text-white font-aeonikregular py-8 px-8">
      {/* Outer container with 3-column grid on md+ screens */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-20">
        
        {/* Left Column - Billing Form */}
        <div>
          <h1 className="text-2xl mb-10">Billing</h1>
          <form className="space-y-4">
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <label htmlFor="firstName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Emma"
                  className="w-full rounded-md px-4 py-2 text-white/50 bg-[#292929]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Richardson"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
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
                  placeholder="+44 7700 90123"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="emailAddress" className="block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  placeholder="emma@gmail.com"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
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
                placeholder="10/06, 7th Lane, London."
                className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
              />
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
                  placeholder="London"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="postalCode" className="block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="00100"
                  className="w-full rounded-md py-2 px-4 text-white/50 bg-[#292929]"
                />
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
                  className="mr-2"
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

        {/* Divider (visible only on md+ screens) */}
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
