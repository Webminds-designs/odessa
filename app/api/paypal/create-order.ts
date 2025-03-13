// pages/api/paypal/create-order.ts
import type { NextApiRequest, NextApiResponse } from "next";
const paypal = require("@paypal/checkout-server-sdk");
import paypalClient from "../../lib/paypal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { amount } = req.body; // amount as a string e.g. "100.00"

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "GBP",
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await paypalClient().execute(request);
    return res.status(200).json({ orderID: order.result.id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
