// components/PayPalButton.tsx
"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from "react";

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = "GBP",
  onSuccess,
  onError,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending && <div className="text-center">Loading PayPal...</div>}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async (_, actions) => {
          try {
            const response = await fetch("/api/paypal/createOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: amount.toFixed(2) }),
            });

            if (!response.ok) throw new Error("Failed to create order");

            const { orderID } = await response.json();
            return orderID;
          } catch (error) {
            onError(error);
            throw error;
          }
        }}
        onApprove={async (data) => {
          try {
            const response = await fetch("/api/paypal/captureOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });

            if (!response.ok) throw new Error("Failed to capture order");

            const details = await response.json();
            onSuccess(details);
          } catch (error) {
            onError(error);
          }
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          onError(err);
        }}
      />
    </>
  );
};

export default PayPalButton;
