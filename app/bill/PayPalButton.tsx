"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from "react";

interface PayPalButtonProps {
  amount: number;
  currencyCode?: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currencyCode = "EUR",
  onSuccess,
  onError,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paidFor, setPaidFor] = useState(false);

  return (
    <>
      {isPending && <div>Loading PayPal...</div>}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currencyCode,
                  value: amount.toFixed(2),
                },
              },
            ],
            intent: "CAPTURE"
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const order = await actions.order?.capture();
            setPaidFor(true);
            onSuccess(order);
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
