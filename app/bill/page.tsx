"use client";
import React, { useState, useEffect, FormEvent, use } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "./PayPalButton";
import { toast } from "react-toastify";

interface FormDataType {
  firstName: string;
  lastName: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
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
    country: "",
  });

  const [checkoutData, setCheckoutData] = useState<CheckoutItem[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // Fetch user and checkout data from localStorage?
  useEffect(() => {
    let storedUser;
    let storedCheckoutData;

    if (typeof window !== 'undefined' && window.localStorage) {      
      storedUser = JSON.parse(localStorage?.getItem("user") || "{}");
      storedCheckoutData = JSON.parse(
        localStorage?.getItem("checkoutData") || "[]"
      );
    }

    if (storedUser) {
      setFormData({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        contactNumber: storedUser.contact || "",
        emailAddress: storedUser.email || "",
        address: storedUser.address || "",
        city: storedUser.city || "",
        postalCode: storedUser.postalCode || "",
        country: storedUser.country || "",
      });
    }

    if (storedCheckoutData) {
      setCheckoutData(storedCheckoutData);
    }
  }, []);

  // Calculate order amounts
  const subtotal = checkoutData.reduce((acc, item) => acc + item.total, 0);
  const shipping = subtotal > 500 ? 0 : 20; // Free shipping for orders over 500
  const tax = subtotal * 0.05; // 5% Tax
  const total = subtotal + shipping + tax;

  // Handle PayPal success
  const handlePaymentSuccess = async (details: any) => {
    console.log("Payment Successful!", details);

    const orderData = {
      transactionId: details.id,
      payerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
      payerEmail: details.payer.email_address,
      payerContact: formData.contactNumber,
      payerCountry: details.payer.address.country_code,
      billingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      shippingAddress: {
        address: details.purchase_units[0].shipping.address.address_line_1,
        city: details.purchase_units[0].shipping.address.admin_area_2,
        postalCode: details.purchase_units[0].shipping.address.postal_code,
      },
      checkoutItems: checkoutData,
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: "PayPal",
      paymentStatus: details.status,
    };

    console.log("Order Data to be saved:", orderData);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Order stored successfully");

        if (typeof window !== 'undefined' && window.localStorage) { 
          localStorage?.removeItem("checkoutData"); // Clear cart after purchase
        }

        setSuccess(true);
        //hot toast message
        toast.success("Order placed successfully");

        //clear cart
        if (typeof window !== 'undefined' && window.localStorage) { 
          localStorage?.removeItem("checkoutData");
        }

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        console.error("Error saving order", await response.json());
      }
    } catch (error) {
      console.error("Payment storage error:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "GBP",
      }}
    >
      <div className="min-h-screen text-white font-aeonikregular py-8 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-[#292929] p-6 rounded-md">
              <h2 className="text-2xl mb-6 text-center">Order Summary</h2>
              {checkoutData.map((item) => (
                <div key={item.productId} className="mb-2 flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>{item.total.toFixed(2)} £</span>
                </div>
              ))}
              <div className="mb-2 flex justify-between">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} £</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Tax</span>
                <span>{tax.toFixed(2)} £</span>
              </div>
              <div className="flex justify-between text-lg text-brown">
                <span>Total</span>
                <span>{total.toFixed(2)} £</span>
              </div>
            </div>

            {/* PayPal Payment Button */}
            <div className="mt-6">
              <PayPalButton
                amount={total}
                onSuccess={handlePaymentSuccess}
                onError={(error: any) => console.error(error)}
              />
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
