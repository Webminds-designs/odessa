// pages/api/paypal/capture-order.ts
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

  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient().execute(request);
    return res.status(200).json({ capture: capture.result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
