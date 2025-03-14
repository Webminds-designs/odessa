import { NextResponse } from "next/server";
const paypal = require("@paypal/checkout-server-sdk");
import paypalClient from "../../../lib/paypal";

export async function POST(request: Request) {
  console.log("create order");
  try {
    const { amount } = await request.json();

    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.prefer("return=representation");
    paypalRequest.requestBody({
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

    // Note: Use paypalClient.execute, not paypalClient() since it's an object.
    const response = await paypalClient.execute(paypalRequest);
    return NextResponse.json({ orderID: response.result.id });
  } catch (error: any) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create order",
        details: error.details || null,
      },
      { status: 500 }
    );
  }
}
